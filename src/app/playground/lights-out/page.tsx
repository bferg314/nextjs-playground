"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800 ${className}`}
  >
    {children}
  </span>
);

const DEFAULT_GRID_SIZE = 5;
const MAX_BOX_SIZE = 60; // Maximum size of a box in pixels
const MIN_BOX_SIZE = 30; // Minimum size of a box in pixels

function generateInitialGrid(size: number) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => Math.random() > 0.5)
  );
}

export default function LightsOut() {
  const [gridSize, setGridSize] = useState<number>(DEFAULT_GRID_SIZE);
  const [grid, setGrid] = useState<boolean[][]>(
    generateInitialGrid(DEFAULT_GRID_SIZE)
  );
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);

  const boxSize = useMemo(() => {
    const size = Math.max(MIN_BOX_SIZE, MAX_BOX_SIZE - (gridSize - 3) * 5);
    return Math.min(size, MAX_BOX_SIZE);
  }, [gridSize]);

  const containerSize = useMemo(() => {
    return boxSize * gridSize + (gridSize - 1) * 4; // 4px gap
  }, [boxSize, gridSize]);

  useEffect(() => {
    checkWinCondition();
  }, [grid]);

  const handleGridSizeChange = (newSize: number[]) => {
    setGridSize(newSize[0]);
    setGrid(generateInitialGrid(newSize[0]));
    setMoves(0);
    setIsWon(false);
  };

  const toggleLight = (row: number, col: number) => {
    if (isWon) return;

    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (
          (rowIndex === row && colIndex === col) ||
          (rowIndex === row && Math.abs(colIndex - col) === 1) ||
          (colIndex === col && Math.abs(rowIndex - row) === 1)
        ) {
          return !cell;
        }
        return cell;
      })
    );
    setGrid(newGrid);
    setMoves(moves + 1);
  };

  const checkWinCondition = () => {
    setIsWon(grid.every((row) => row.every((cell) => !cell)));
  };

  const resetGame = () => {
    setGrid(generateInitialGrid(gridSize));
    setMoves(0);
    setIsWon(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Lights Out</h1>
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-lg">
        <div className="mb-6">
          <label htmlFor="gridSize" className="block text-sm font-medium mb-2">
            Grid Size: {gridSize}x{gridSize}
          </label>
          <Slider
            id="gridSize"
            min={3}
            max={10}
            step={1}
            value={[gridSize]}
            onValueChange={handleGridSizeChange}
            className="w-64"
          />
        </div>
        <div className="mb-4">
          <Badge className="text-xl font-semibold">Moves: {moves}</Badge>
        </div>
        <div className="flex justify-center">
          <motion.div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              width: `${containerSize}px`,
              height: `${containerSize}px`,
            }}
            layout
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <motion.div
                  key={`${rowIndex}-${colIndex}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  layout
                >
                  <Button
                    className={`rounded-md transition-colors duration-200 ${
                      cell
                        ? "bg-yellow-400 hover:bg-yellow-300"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                    style={{
                      width: `${boxSize}px`,
                      height: `${boxSize}px`,
                    }}
                    onClick={() => toggleLight(rowIndex, colIndex)}
                    aria-label={`Toggle light at row ${rowIndex + 1}, column ${
                      colIndex + 1
                    }`}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
        {isWon && (
          <div className="mt-6 text-2xl font-bold text-green-400">
            Congratulations! You won in {moves} moves!
          </div>
        )}
        <Button
          onClick={resetGame}
          className="mt-6 bg-blue-600 hover:bg-blue-700"
        >
          Reset Game
        </Button>
      </div>
    </div>
  );
}
