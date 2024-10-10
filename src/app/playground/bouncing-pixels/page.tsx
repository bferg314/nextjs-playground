// src/app/playground/bouncing-pixels/page.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar"; // Import Navbar

interface Pixel {
  x: number;
  y: number;
  dx: number;
  dy: number;
  originalDx: number;
  originalDy: number;
}

export default function BouncingPixels() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const PIXEL_SIZE = 10; // Pixel size is 2x2

  // Generate initial pixels
  useEffect(() => {
    const initialPixels = Array.from({ length: 20 }).map(() => {
      const dx = (Math.random() - 0.5) * 5;
      const dy = (Math.random() - 0.5) * 5;
      return {
        x: Math.random() * 400, // Random x position
        y: Math.random() * 400, // Random y position
        dx, // Random x velocity
        dy, // Random y velocity
        originalDx: dx, // Store the original x velocity for slow down
        originalDy: dy, // Store the original y velocity for slow down
      };
    });
    setPixels(initialPixels);
  }, []);

  // Handle pixels bouncing inside the box and slowing down over time
  useEffect(() => {
    const interval = setInterval(() => {
      setPixels((prevPixels) =>
        prevPixels.map((pixel) => {
          const { x, y, dx, dy, originalDx, originalDy } = pixel;

          // Gradually slow down the velocity to return to the original speed
          const slowdownFactor = 0.98;
          let newDx = dx * slowdownFactor + originalDx * (1 - slowdownFactor);
          let newDy = dy * slowdownFactor + originalDy * (1 - slowdownFactor);

          // Set a minimum speed so the pixels never stop
          const MIN_SPEED = 0.5; // Minimum speed threshold
          if (Math.abs(newDx) < MIN_SPEED) newDx = MIN_SPEED * Math.sign(newDx);
          if (Math.abs(newDy) < MIN_SPEED) newDy = MIN_SPEED * Math.sign(newDy);

          // Bounce off walls (considering pixel size)
          if (x + newDx > 400 - PIXEL_SIZE || x + newDx < 0) newDx = -newDx;
          if (y + newDy > 400 - PIXEL_SIZE || y + newDy < 0) newDy = -newDy;

          return {
            ...pixel,
            x: x + newDx,
            y: y + newDy,
            dx: newDx,
            dy: newDy,
          };
        })
      );
    }, 16); // 60 FPS

    return () => clearInterval(interval);
  }, []);

  // Explode pixels when clicking
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const box = boxRef.current?.getBoundingClientRect();
    if (!box) return;

    const clickX = e.clientX - box.left;
    const clickY = e.clientY - box.top;

    setPixels((prevPixels) =>
      prevPixels.map((pixel) => {
        const angle = Math.atan2(pixel.y - clickY, pixel.x - clickX);
        const speed = Math.random() * 10 + 5;
        return {
          ...pixel,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
        };
      })
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Navbar /> {/* Add Navbar */}
      <div className="mb-6 mt-16">
        <h1 className="text-3xl font-bold text-blue-600">Bouncing Pixels</h1>
        <p className="text-gray-800">
          Click anywhere to explode the pixels! They will slow down afterward.
        </p>
      </div>
      <div
        ref={boxRef}
        onClick={handleClick}
        className="relative w-[400px] h-[400px] bg-white border border-gray-400 overflow-hidden"
      >
        {pixels.map((pixel, index) => (
          <div
            key={index}
            className="absolute w-2 h-2 bg-blue-600"
            style={{
              transform: `translate(${pixel.x}px, ${pixel.y}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
