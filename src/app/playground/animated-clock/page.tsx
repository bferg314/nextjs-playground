"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate rotation degrees - fixed calculations
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6 + seconds * 0.1;
  const secondDegrees = seconds * 6;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pt-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Animated Clock</h1>
      
      <div className="relative w-64 h-64 rounded-full bg-white shadow-xl border-2 border-gray-200 flex items-center justify-center">
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-4 bg-gray-800"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-106px)`,
              transformOrigin: "50% 106px",
              left: "calc(50% - 0.75px)",
            }}
          />
        ))}

        {/* Minute markers */}
        {[...Array(60)].map((_, i) => (
          i % 5 !== 0 && (
            <div
              key={i}
              className="absolute w-[1px] h-2 bg-gray-400"
              style={{
                transform: `rotate(${i * 6}deg) translateY(-106px)`,
                transformOrigin: "50% 106px",
                left: "calc(50% - 0.5px)",
              }}
            />
          )
        ))}

        {/* Hour hand */}
        <motion.div
          className="absolute w-1.5 h-16 bg-gray-800 rounded-full"
          style={{ 
            rotate: hourDegrees,
            transformOrigin: "50% 90%",
            bottom: "50%"
          }}
          animate={{ rotate: hourDegrees }}
          transition={{ type: "tween", ease: "linear" }}
        />

        {/* Minute hand */}
        <motion.div
          className="absolute w-1 h-20 bg-gray-600 rounded-full"
          style={{ 
            rotate: minuteDegrees,
            transformOrigin: "50% 90%",
            bottom: "50%"
          }}
          animate={{ rotate: minuteDegrees }}
          transition={{ type: "tween", ease: "linear" }}
        />

        {/* Second hand */}
        <motion.div
          className="absolute w-0.5 h-24 bg-red-500 rounded-full"
          style={{ 
            rotate: secondDegrees,
            transformOrigin: "50% 90%",
            bottom: "50%"
          }}
          animate={{ rotate: secondDegrees }}
          transition={{ type: "tween", ease: "linear" }}
        />

        {/* Center circle */}
        <div className="absolute w-3 h-3 bg-gray-900 rounded-full z-10" />
      </div>

      {/* Digital display */}
      <div className="mt-8 p-3 bg-white rounded-lg shadow-md text-center w-64">
        <h2 className="text-2xl font-mono">
          {hours.toString().padStart(2, "0")}:
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </h2>
      </div>
    </div>
  );
}