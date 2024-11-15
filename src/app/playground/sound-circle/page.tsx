"use client";

import React, { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
type Scale = {
  name: string;
  intervals: number[];
};

type Note = {
  name: string;
  frequency: number;
};

type Point = {
  x: number;
  y: number;
  color: string;
  active: boolean;
};

const AudioVisualizer = () => {
  const [rootNote, setRootNote] = useState("A");
  const [selectedScale, setSelectedScale] = useState("Major Pentatonic");
  const [delayTime, setDelayTime] = useState(0.3);
  const [reverbLevel, setReverbLevel] = useState(0.3);
  const [activePoint, setActivePoint] = useState<Point | null>(null);
  const [debug, setDebug] = useState<{
    x: number;
    y: number;
    angle: number;
  } | null>(null);

  const circleRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const delayNodeRef = useRef<DelayNode | null>(null);
  const convolverRef = useRef<ConvolverNode | null>(null);

  const notes: Note[] = [
    { name: "A", frequency: 440.0 },
    { name: "A#", frequency: 466.16 },
    { name: "B", frequency: 493.88 },
    { name: "C", frequency: 523.25 },
    { name: "C#", frequency: 554.37 },
    { name: "D", frequency: 587.33 },
    { name: "D#", frequency: 622.25 },
    { name: "E", frequency: 659.25 },
    { name: "F", frequency: 698.46 },
    { name: "F#", frequency: 739.99 },
    { name: "G", frequency: 783.99 },
    { name: "G#", frequency: 830.61 },
  ];

  const scales: Scale[] = [
    { name: "Major Pentatonic", intervals: [0, 2, 4, 7, 9] },
    { name: "Minor Pentatonic", intervals: [0, 3, 5, 7, 10] },
    { name: "Aeolian", intervals: [0, 2, 3, 5, 7, 8, 10] },
    { name: "Phrygian", intervals: [0, 1, 3, 5, 7, 8, 10] },
    { name: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10] },
  ];

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 156 + 100);
    const g = Math.floor(Math.random() * 156 + 100);
    const b = Math.floor(Math.random() * 156 + 100);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getNoteFromAngle = (angle: number) => {
    const normalizedAngle = (angle + 360) % 360;
    const noteIndex = Math.floor((normalizedAngle / 360) * 12);
    const scale = scales.find((s) => s.name === selectedScale);
    if (!scale) return notes[0].frequency;

    const rootNoteIndex = notes.findIndex((n) => n.name === rootNote);
    const scaleNoteIndexes = scale.intervals.map(
      (interval) => (rootNoteIndex + interval) % 12
    );

    const closestScaleNoteIndex = scaleNoteIndexes.reduce((prev, curr) =>
      Math.abs(curr - noteIndex) < Math.abs(prev - noteIndex) ? curr : prev
    );

    return notes[closestScaleNoteIndex].frequency;
  };

  const setupAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      gainNodeRef.current = audioContextRef.current.createGain();
      delayNodeRef.current = audioContextRef.current.createDelay();
      convolverRef.current = audioContextRef.current.createConvolver();

      gainNodeRef.current.connect(delayNodeRef.current);
      delayNodeRef.current.connect(convolverRef.current);
      convolverRef.current.connect(audioContextRef.current.destination);

      if (delayNodeRef.current)
        delayNodeRef.current.delayTime.value = delayTime;
      if (gainNodeRef.current) gainNodeRef.current.gain.value = 0;
    }
  };

  const handlePanic = () => {
    if (audioContextRef.current) {
      oscillatorRef.current?.stop();
      oscillatorRef.current?.disconnect();
      audioContextRef.current.close();
      audioContextRef.current = null;
      oscillatorRef.current = null;
      gainNodeRef.current = null;
      delayNodeRef.current = null;
      convolverRef.current = null;
      setActivePoint(null);
      setDebug(null);
    }
  };

  const handleMouseUp = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(
        0,
        audioContextRef.current.currentTime,
        0.1
      );
      setTimeout(() => {
        oscillatorRef.current?.stop();
        oscillatorRef.current?.disconnect();
        setActivePoint(null);
        setDebug(null);
      }, 100);
    }
  };

  const handleInteraction = (clientX: number, clientY: number) => {
    if (!circleRef.current) return;

    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    const distance = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    );

    const radius = rect.width / 2;
    const tolerance = 20;

    if (Math.abs(distance - radius) <= tolerance) {
      const color = generateRandomColor();

      setActivePoint({
        x,
        y,
        color,
        active: true,
      });

      setDebug({ x, y, angle });

      setupAudioContext();

      if (audioContextRef.current && gainNodeRef.current) {
        oscillatorRef.current?.disconnect();
        oscillatorRef.current?.stop();

        const osc = audioContextRef.current.createOscillator();
        oscillatorRef.current = osc;
        osc.type = "sine";
        osc.frequency.value = getNoteFromAngle(angle);

        osc.connect(gainNodeRef.current);
        gainNodeRef.current.gain.value = 0.5;

        osc.start();
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleInteraction(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleInteraction(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
      handlePanic();
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900">
      <div className="flex-1 relative p-4 flex items-center justify-center">
        <div
          ref={circleRef}
          className="relative w-[600px] h-[600px] cursor-pointer"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute inset-0 border-4 border-gray-300 rounded-full" />

          {activePoint && (
            <div
              className="absolute w-8 h-8 -translate-x-4 -translate-y-4 transform transition-all duration-100"
              style={{
                left: `${activePoint.x}px`,
                top: `${activePoint.y}px`,
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: activePoint.color,
                  opacity: 0.7,
                }}
              />
              <div
                className="absolute inset-[-8px] rounded-full"
                style={{
                  backgroundColor: activePoint.color,
                  opacity: 0.3,
                  filter: "blur(8px)",
                }}
              />
            </div>
          )}

          {debug && (
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2 text-xs">
              x: {debug.x.toFixed(0)}, y: {debug.y.toFixed(0)}, angle:{" "}
              {debug.angle.toFixed(0)}°
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-gray-800 space-y-4">
        <div className="flex gap-4">
          <Select value={rootNote} onValueChange={setRootNote}>
            <SelectTrigger>
              <SelectValue placeholder="Root Note" />
            </SelectTrigger>
            <SelectContent>
              {notes.map((note) => (
                <SelectItem key={note.name} value={note.name}>
                  {note.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedScale} onValueChange={setSelectedScale}>
            <SelectTrigger>
              <SelectValue placeholder="Scale" />
            </SelectTrigger>
            <SelectContent>
              {scales.map((scale) => (
                <SelectItem key={scale.name} value={scale.name}>
                  {scale.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Delay Time</label>
          <Slider
            value={[delayTime]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={([value]) => {
              setDelayTime(value);
              if (delayNodeRef.current)
                delayNodeRef.current.delayTime.value = value;
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Reverb Level</label>
          <Slider
            value={[reverbLevel]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={([value]) => {
              setReverbLevel(value);
              if (convolverRef.current) {
                // Update reverb level
              }
            }}
          />
        </div>

        <Button variant="destructive" onClick={handlePanic} className="w-full">
          PANIC
        </Button>
      </div>
    </div>
  );
};

export default AudioVisualizer;
