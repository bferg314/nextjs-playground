"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Trophy } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const choices = ["rock", "paper", "scissors"] as const;
type Choice = (typeof choices)[number];

const ChoiceIcon: React.FC<{ choice: Choice }> = ({ choice }) => {
  const icons: Record<Choice, string> = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️",
  };
  return <span className="text-4xl">{icons[choice]}</span>;
};

export default function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameHistory, setGameHistory] = useState<
    Array<{ userChoice: Choice; computerChoice: Choice; result: string }>
  >([]);
  const [winStreak, setWinStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  useEffect(() => {
    const storedUserScore = localStorage.getItem("userScore");
    const storedComputerScore = localStorage.getItem("computerScore");
    const storedBestStreak = localStorage.getItem("bestStreak");
    if (storedUserScore) setUserScore(parseInt(storedUserScore, 10));
    if (storedComputerScore)
      setComputerScore(parseInt(storedComputerScore, 10));
    if (storedBestStreak) setBestStreak(parseInt(storedBestStreak, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem("userScore", userScore.toString());
    localStorage.setItem("computerScore", computerScore.toString());
    localStorage.setItem("bestStreak", bestStreak.toString());
  }, [userScore, computerScore, bestStreak]);

  const determineWinner = useCallback(
    (user: Choice, computer: Choice): string => {
      if (user === computer) return "It's a tie!";
      if (
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
      ) {
        return "You win!";
      }
      return "Computer wins!";
    },
    []
  );

  const updateScores = useCallback((result: string) => {
    if (result === "You win!") {
      setUserScore((prev) => prev + 1);
    } else if (result === "Computer wins!") {
      setComputerScore((prev) => prev + 1);
    }
  }, []);

  const updateWinStreak = useCallback((result: string) => {
    if (result === "You win!") {
      setWinStreak((prev) => {
        const newStreak = prev + 1;
        setBestStreak((bestPrev) => Math.max(bestPrev, newStreak));
        return newStreak;
      });
    } else {
      setWinStreak(0);
    }
  }, []);

  const addToHistory = useCallback(
    (userChoice: Choice, computerChoice: Choice, result: string) => {
      setGameHistory((prev) => [
        { userChoice, computerChoice, result },
        ...prev.slice(0, 4),
      ]);
    },
    []
  );

  const playGame = useCallback(
    (choice: Choice) => {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      setUserChoice(choice);
      setComputerChoice(randomChoice);
      const gameResult = determineWinner(choice, randomChoice);
      setResult(gameResult);
      updateScores(gameResult);
      addToHistory(choice, randomChoice, gameResult);
      updateWinStreak(gameResult);
    },
    [determineWinner, updateScores, addToHistory, updateWinStreak]
  );

  const resetScores = useCallback(() => {
    setUserScore(0);
    setComputerScore(0);
    setWinStreak(0);
    setBestStreak(0);
    localStorage.removeItem("userScore");
    localStorage.removeItem("computerScore");
    localStorage.removeItem("bestStreak");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Rock, Paper, Scissors
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg py-3">
              <CardTitle className="flex justify-between items-center">
                <span>Game</span>
                <div className="flex items-center">
                  <Trophy className="mr-2" />
                  <span>Best Streak: {bestStreak}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-center space-x-4 mb-6">
                {choices.map((choice) => (
                  <motion.button
                    key={choice}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => playGame(choice)}
                    className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300"
                  >
                    <ChoiceIcon choice={choice} />
                  </motion.button>
                ))}
              </div>

              {result && userChoice && computerChoice && (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Game Result</AlertTitle>
                  <AlertDescription>
                    You chose <strong>{userChoice}</strong>, Computer chose{" "}
                    <strong>{computerChoice}</strong>
                    <p className="font-bold mt-2">{result}</p>
                  </AlertDescription>
                </Alert>
              )}

              <div className="text-center">
                <p className="text-xl mb-2">Score</p>
                <p className="font-bold">
                  You: {userScore} | Computer: {computerScore}
                </p>
                <p className="text-lg mt-2">Current Win Streak: {winStreak}</p>
                <Button
                  onClick={resetScores}
                  variant="outline"
                  className="mt-4"
                >
                  Reset Scores
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg py-3">
              <CardTitle>Game History</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {gameHistory.map((game, index) => (
                  <li key={index} className="bg-gray-100 p-2 rounded">
                    <span className="mr-2">
                      <ChoiceIcon choice={game.userChoice} />
                    </span>
                    vs
                    <span className="mx-2">
                      <ChoiceIcon choice={game.computerChoice} />
                    </span>
                    - {game.result}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
