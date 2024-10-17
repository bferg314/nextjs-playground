"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Zap } from "lucide-react";

interface Pixel {
  x: number;
  y: number;
  dx: number;
  dy: number;
  baseSpeed: number;
  color: string;
  size: number;
}

export default function BouncingPixels() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [pixelCount, setPixelCount] = useState(80);
  const [explosionForce, setExplosionForce] = useState(10);
  const [recoveryRate, setRecoveryRate] = useState(0.05);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [minSpeed, setMinSpeed] = useState(0.5);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);

  const BOX_SIZE = 400;
  const HIGH_PIXEL_THRESHOLD = 500;
  const FPS = performanceMode ? 60 : 30;

  const generateRandomColor = () => {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
  };

  const generatePixels = useCallback(
    (count: number) => {
      return Array.from({ length: count }).map(() => {
        const baseSpeed = Math.max(
          (Math.random() * 1.5 + 0.5) * (performanceMode ? 0.5 : 1),
          minSpeed
        );
        const angle = Math.random() * 2 * Math.PI;
        const size = Math.random() * 8 + 2;
        return {
          x: Math.random() * (BOX_SIZE - size),
          y: Math.random() * (BOX_SIZE - size),
          dx: Math.cos(angle) * baseSpeed,
          dy: Math.sin(angle) * baseSpeed,
          baseSpeed,
          color: generateRandomColor(),
          size,
        };
      });
    },
    [performanceMode, minSpeed]
  );

  useEffect(() => {
    setPixels(generatePixels(pixelCount));
  }, [pixelCount, generatePixels]);

  const updatePixels = useCallback(
    (time: number) => {
      if (time - lastUpdateTimeRef.current < 1000 / FPS) {
        animationRef.current = requestAnimationFrame(updatePixels);
        return;
      }

      lastUpdateTimeRef.current = time;

      setPixels((prevPixels) =>
        prevPixels.map((pixel) => {
          const { x, y, dx, dy, baseSpeed, size } = pixel;

          const currentSpeed = Math.sqrt(dx * dx + dy * dy);
          const speedDiff = Math.max(baseSpeed, minSpeed) - currentSpeed;
          const adjustedDx =
            dx + (dx / currentSpeed) * speedDiff * recoveryRate;
          const adjustedDy =
            dy + (dy / currentSpeed) * speedDiff * recoveryRate;

          const newDx =
            x + adjustedDx > BOX_SIZE - size || x + adjustedDx < 0
              ? -adjustedDx
              : adjustedDx;
          const newDy =
            y + adjustedDy > BOX_SIZE - size || y + adjustedDy < 0
              ? -adjustedDy
              : adjustedDy;

          const finalSpeed = Math.sqrt(newDx * newDx + newDy * newDy);
          const scaleFactor = finalSpeed < minSpeed ? minSpeed / finalSpeed : 1;

          return {
            ...pixel,
            x: x + newDx * scaleFactor,
            y: y + newDy * scaleFactor,
            dx: newDx * scaleFactor,
            dy: newDy * scaleFactor,
          };
        })
      );

      animationRef.current = requestAnimationFrame(updatePixels);
    },
    [recoveryRate, FPS, minSpeed]
  );

  useEffect(() => {
    animationRef.current = requestAnimationFrame(updatePixels);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updatePixels]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const box = boxRef.current?.getBoundingClientRect();
    if (!box) return;

    const clickX = e.clientX - box.left;
    const clickY = e.clientY - box.top;

    setPixels((prevPixels) =>
      prevPixels.map((pixel) => {
        const angle = Math.atan2(pixel.y - clickY, pixel.x - clickX);
        const speed = Math.max(
          (Math.random() * explosionForce + pixel.baseSpeed) *
            (performanceMode ? 0.5 : 1),
          minSpeed
        );
        return {
          ...pixel,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          color: generateRandomColor(),
        };
      })
    );
  };

  const handleResetPixels = () => {
    setPixelCount(80);
    setExplosionForce(10);
    setRecoveryRate(0.05);
    setMinSpeed(0.7);
    setPixels(generatePixels(80));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="mb-6 mt-16 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Bouncing Pixels
        </h1>
        <p className="text-gray-700">
          Click anywhere to explode the pixels! They will gradually return to
          their original speed.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center">
          <label
            htmlFor="pixelCount"
            className="mr-2 text-sm font-medium text-gray-700"
          >
            Pixel Count:
          </label>
          <Input
            id="pixelCount"
            type="number"
            min="1"
            max="2000"
            value={pixelCount}
            onChange={(e) => setPixelCount(Number(e.target.value))}
            className="w-20"
          />
          {pixelCount > HIGH_PIXEL_THRESHOLD && (
            <span className="ml-2 text-yellow-600">
              <AlertCircle className="inline mr-1" size={16} />
              High pixel count may affect performance
            </span>
          )}
        </div>
        <div className="flex items-center">
          <label
            htmlFor="explosionForce"
            className="mr-2 text-sm font-medium text-gray-700"
          >
            Explosion Force:
          </label>
          <Slider
            id="explosionForce"
            min={1}
            max={20}
            step={1}
            value={[explosionForce]}
            onValueChange={(value) => setExplosionForce(value[0])}
            className="w-32"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="recoveryRate"
            className="mr-2 text-sm font-medium text-gray-700"
          >
            Recovery Rate:
          </label>
          <Slider
            id="recoveryRate"
            min={0.01}
            max={0.1}
            step={0.01}
            value={[recoveryRate]}
            onValueChange={(value) => setRecoveryRate(value[0])}
            className="w-32"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="minSpeed"
            className="mr-2 text-sm font-medium text-gray-700"
          >
            Min Speed:
          </label>
          <Slider
            id="minSpeed"
            min={0.1}
            max={2}
            step={0.1}
            value={[minSpeed]}
            onValueChange={(value) => setMinSpeed(value[0])}
            className="w-32"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="performanceMode"
            className="mr-2 text-sm font-medium text-gray-700"
          >
            Performance Mode:
          </label>
          <Switch
            id="performanceMode"
            checked={performanceMode}
            onCheckedChange={setPerformanceMode}
          />
          <Zap className="ml-2" size={16} />
        </div>
        <Button onClick={handleResetPixels}>Reset Pixels</Button>
      </div>
      <div
        ref={boxRef}
        onClick={handleClick}
        className="relative w-[400px] h-[400px] bg-white border-4 border-blue-500 rounded-lg shadow-lg overflow-hidden cursor-pointer"
      >
        {pixels.map((pixel, index) => (
          <div
            key={index}
            className={`absolute rounded-full ${
              performanceMode ? "" : "transition-transform duration-100"
            }`}
            style={{
              width: `${pixel.size}px`,
              height: `${pixel.size}px`,
              backgroundColor: pixel.color,
              transform: `translate(${pixel.x}px, ${pixel.y}px)`,
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center text-gray-600">
        <AlertCircle className="mr-2" size={16} />
        <span className="text-sm">
          Tip: Adjust the minimum speed to control how slow pixels can go!
        </span>
      </div>
    </div>
  );
}
