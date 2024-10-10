// src/app/playground/calculator/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar"; // Use absolute import with @

export default function Calculator() {
  // State variables
  const [display, setDisplay] = useState("0");
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  // Handle number input
  const inputNumber = (num: string) => {
    if (waitingForSecondValue) {
      setDisplay(num);
      setWaitingForSecondValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  // Handle operator input
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

  // Perform calculation based on operator
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
      default:
        return second;
    }
  };

  // Handle equal sign
  const handleEqual = () => {
    const inputValue = parseFloat(display);

    if (operator && firstValue !== null) {
      const result = performCalculation(firstValue, inputValue, operator);
      setDisplay(String(result));
      setFirstValue(null);
      setOperator(null);
      setWaitingForSecondValue(false);
    }
  };

  // Handle clear
  const handleClear = () => {
    setDisplay("0");
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <Navbar /> {/* Add Navbar */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <div className="mb-4">
          <input
            type="text"
            readOnly
            value={display}
            className="w-full text-right text-4xl p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <button
            onClick={handleClear}
            className="col-span-2 bg-red-500 text-white py-2 rounded"
          >
            AC
          </button>
          <button
            onClick={() => inputOperator("/")}
            className="bg-blue-500 text-white py-2 rounded"
          >
            ÷
          </button>
          <button
            onClick={() => inputOperator("*")}
            className="bg-blue-500 text-white py-2 rounded"
          >
            ×
          </button>
          {/* Row 2 */}
          <button
            onClick={() => inputNumber("7")}
            className="bg-gray-100 text-black py-2 rounded"
          >
            7
          </button>
          <button
            onClick={() => inputNumber("8")}
            className="bg-gray-100 text-black py-2 rounded"
          >
            8
          </button>
          <button
            onClick={() => inputNumber("9")}
            className="bg-gray-100 text-black py-2 rounded"
          >
            9
          </button>
          <button
            onClick={() => inputOperator("-")}
            className="bg-blue-500 text-white py-2 rounded"
          >
            −
          </button>
          {/* Row 3 */}
          <button
            onClick={() => inputNumber("4")}
            className="bg-gray-100 text-black py-2 rounded"
          >
            4
          </button>
          <button
            onClick={() => inputNumber("5")}
            className="bg-gray-100 text-black py-2 rounded"
          >
            5
          </button>
          <button
            onClick={() => inputNumber("6")}
            className="bg-gray-100 text-black py-2 rounded"
          >
            6
          </button>
          <button
            onClick={() => inputOperator("+")}
            className="bg-blue-500 text-white py-2 rounded"
          >
            +
          </button>
          {/* Row 4 */}
          <button
            onClick={() => inputNumber("1")}
            className="bg-gray-100 text-black py-2 rounded"
          >
            1
          </button>
          <button
            onClick={() => inputNumber("2")}
            className="bg-gray-100 text-black py-2 rounded"
          >
            2
          </button>
          <button
            onClick={() => inputNumber("3")}
            className="bg-gray-100 text-black py-2 rounded"
          >
            3
          </button>
          <button
            onClick={handleEqual}
            className="row-span-2 bg-green-500 text-white py-2 rounded"
            style={{ gridRow: "span 2" }}
          >
            =
          </button>
          {/* Row 5 */}
          <button
            onClick={() => inputNumber("0")}
            className="col-span-2 bg-gray-100 text-black py-2 rounded"
          >
            0
          </button>
          <button
            onClick={() => inputNumber(".")}
            className="bg-gray-100 text-black py-2 rounded"
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
}
