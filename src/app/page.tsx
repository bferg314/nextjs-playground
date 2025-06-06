"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalculator, FaBolt, FaHandRock, FaClock } from "react-icons/fa";

interface FeatureCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  href,
  title,
  description,
  icon: Icon,
}) => (
  <Link href={href} className="block h-full">
    <motion.div
      className="rounded-lg overflow-hidden shadow-lg bg-white flex flex-col h-full hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 flex items-center">
        <Icon className="w-8 h-8 mr-4" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between">
        <p className="text-gray-600 text-lg mb-4">{description}</p>
        <motion.div
          className="text-blue-600 font-semibold"
          whileHover={{ x: 5 }}
        >
          Try it out →
        </motion.div>
      </div>
    </motion.div>
  </Link>
);

export default function Home(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <motion.div
        className="text-center mt-10 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 py-10">
          Next.js Playground
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Dive into a world of interactive experiments and mini-apps. Explore,
          learn, and have fun!
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FeatureCard
          href="/playground/calculator"
          title="Calculator"
          description="Crunch numbers effortlessly with our sleek, intuitive calculator. Perfect for quick calculations on the go!"
          icon={FaCalculator}
        />
        <FeatureCard
          href="/playground/bouncing-pixels"
          title="Bouncing Pixels"
          description="Watch in awe as pixels come to life! Click to create mesmerizing bounces and explosions of digital confetti."
          icon={FaBolt}
        />
        <FeatureCard
          href="/playground/rock-paper-scissors"
          title="Rock, Paper, Scissors"
          description="Challenge the computer to the classic game of Rock, Paper, Scissors. Can you outsmart the algorithm?"
          icon={FaHandRock}
        />
        <FeatureCard
          href="/playground/discord-clone"
          title="A cheap discord clone"
          description="Does not work..."
          icon={FaHandRock}
        />
        <FeatureCard
          href="/playground/lights-out"
          title="Lights out game"
          description="traditional lights out game"
          icon={FaHandRock}
        />
        <FeatureCard
          href="/playground/sound-circle"
          title="Sound circle"
          description="makes noise"
          icon={FaHandRock}
        />
        <FeatureCard
          href="/playground/animated-clock"
          title="Animated Clock"
          description="An elegant analog and digital clock with smooth animations to track time with style."
          icon={FaClock}
        />
      </motion.div>
    </main>
  );
}
