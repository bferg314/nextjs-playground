// src/app/page.tsx

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Navbar />
      <div className="text-center mt-10">
        <h1 className="text-5xl font-bold text-blue-600 mb-8">
          Next.js Playground
        </h1>
        <p className="text-lg text-gray-500">
          Experiment with cool features and fun mini apps!
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Calculator Card */}
        <Link href="/playground/calculator">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            {/* Card Header */}
            <div className="bg-blue-600 text-white text-xl font-bold p-4">
              Calculator
            </div>
            {/* Card Body */}
            <div className="p-6 flex-grow">
              <p className="text-gray-700">
                A simple, intuitive calculator to perform basic operations.
              </p>
            </div>
          </div>
        </Link>

        {/* Bouncing Pixels Card */}
        <Link href="/playground/bouncing-pixels">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            {/* Card Header */}
            <div className="bg-blue-600 text-white text-xl font-bold p-4">
              Bouncing Pixels
            </div>
            {/* Card Body */}
            <div className="p-6 flex-grow">
              <p className="text-gray-700">
                Click to watch pixels bounce and explode!
              </p>
            </div>
          </div>
        </Link>

        {/* Rock Paper Scissors Card */}
        <Link href="/playground/rock-paper-scissors">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            {/* Card Header */}
            <div className="bg-blue-600 text-white text-xl font-bold p-4">
              Rock, Paper, Scissors
            </div>
            {/* Card Body */}
            <div className="p-6 flex-grow">
              <p className="text-gray-700">
                Play a quick game of Rock, Paper, Scissors against the computer!
              </p>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
