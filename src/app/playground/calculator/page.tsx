"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Moon, Sun } from "lucide-react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("calculatorDarkMode");
    setIsDarkMode(savedMode === "true");
  }, []);

  const inputNumber = (num: string) => {
    if (waitingForSecondValue) {
      setDisplay(num);
      setWaitingForSecondValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperator = (op: string) => {
    const inputValue = parseFloat(display);

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const result = performCalculation(firstValue, inputValue, operator);
      setFirstValue(result);
      setDisplay(String(result));
    }

    setOperator(op);
    setWaitingForSecondValue(true);
  };

  const performCalculation = (first: number, second: number, op: string) => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        return first / second;
      case "%":
        return first % second;
      default:
        return second;
    }
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);

    if (operator && firstValue !== null) {
      const result = performCalculation(firstValue, inputValue, operator);
      const calculation = `${firstValue} ${operator} ${inputValue} = ${result}`;
      setDisplay(String(result));
      setFirstValue(null);
      setOperator(null);
      setWaitingForSecondValue(false);
      setHistory((prev) => [calculation, ...prev.slice(0, 4)]);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  };

  const handleBackspace = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const handleSquareRoot = () => {
    const value = Math.sqrt(parseFloat(display));
    setDisplay(String(value));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("calculatorDarkMode", String(newMode));
      return newMode;
    });
  };

  const buttonClass = `py-2 rounded transition-colors ${
    isDarkMode ? "text-white hover:bg-gray-600" : "text-black hover:bg-gray-200"
  }`;

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 ${
        isDarkMode ? "bg-gray-800" : "bg-gray-200"
      }`}
    >
      <div
        className={`rounded-lg shadow-lg p-6 w-80 ${
          isDarkMode ? "bg-gray-700" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Calculator
          </h2>
          <button onClick={toggleDarkMode} className="p-2 rounded-full">
            {isDarkMode ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-gray-600" />
            )}
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            readOnly
            value={display}
            className={`w-full text-right text-4xl p-2 border rounded ${
              isDarkMode
                ? "bg-gray-600 text-white border-gray-500"
                : "bg-white text-black border-gray-300"
            }`}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={handleClear}
            className={`${buttonClass} bg-red-500 text-white`}
          >
            AC
          </button>
          <button
            onClick={handleBackspace}
            className={`${buttonClass} ${
              isDarkMode ? "bg-gray-600" : "bg-gray-300"
            }`}
          >
            ←
          </button>
          <button
            onClick={() => inputOperator("%")}
            className={`${buttonClass} ${
              isDarkMode ? "bg-gray-600" : "bg-gray-300"
            }`}
          >
            %
          </button>
          <button
            onClick={() => inputOperator("/")}
            className={`${buttonClass} bg-blue-500 text-white`}
          >
            ÷
          </button>
          {[7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => inputNumber(String(num))}
              className={`${buttonClass} ${
                isDarkMode ? "bg-gray-600" : "bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => inputOperator("*")}
            className={`${buttonClass} bg-blue-500 text-white`}
          >
            ×
          </button>
          {[4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => inputNumber(String(num))}
              className={`${buttonClass} ${
                isDarkMode ? "bg-gray-600" : "bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => inputOperator("-")}
            className={`${buttonClass} bg-blue-500 text-white`}
          >
            −
          </button>
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => inputNumber(String(num))}
              className={`${buttonClass} ${
                isDarkMode ? "bg-gray-600" : "bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => inputOperator("+")}
            className={`${buttonClass} bg-blue-500 text-white`}
          >
            +
          </button>
          <button
            onClick={handleSquareRoot}
            className={`${buttonClass} ${
              isDarkMode ? "bg-gray-600" : "bg-gray-100"
            }`}
          >
            √
          </button>
          <button
            onClick={() => inputNumber("0")}
            className={`${buttonClass} ${
              isDarkMode ? "bg-gray-600" : "bg-gray-100"
            }`}
          >
            0
          </button>
          <button
            onClick={() => inputNumber(".")}
            className={`${buttonClass} ${
              isDarkMode ? "bg-gray-600" : "bg-gray-100"
            }`}
          >
            .
          </button>
          <button
            onClick={handleEqual}
            className={`${buttonClass} bg-green-500 text-white`}
          >
            =
          </button>
        </div>
        {history.length > 0 && (
          <div
            className={`mt-4 p-2 rounded ${
              isDarkMode ? "bg-gray-600" : "bg-gray-100"
            }`}
          >
            <h3
              className={`text-sm font-bold mb-1 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              History
            </h3>
            <ul
              className={`text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {history.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
