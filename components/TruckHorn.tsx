"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { hornSounds } from "@/data/playlists";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0">
      <path d="M2 16V7a1 1 0 0 1 1-1h10v10H2z" />
      <path d="M13 10h4l3 3v3h-7z" />
      <circle cx="6" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}

export default function TruckHorn() {
  const bagRef = useRef<string[]>(shuffle(hornSounds));
  const lastPlayedRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [pressed, setPressed] = useState(false);
  const [showHonk, setShowHonk] = useState(false);

  // Pre-initialize audio element for low-latency mobile playback
  useEffect(() => {
    try {
      audioRef.current = new Audio();
    } catch {
      // ignore
    }
  }, []);

  const drawNext = useCallback(() => {
    if (bagRef.current.length === 0) {
      let next = shuffle(hornSounds);
      if (next[0] === lastPlayedRef.current && next.length > 1) {
        [next[0], next[1]] = [next[1], next[0]];
      }
      bagRef.current = next;
    }
    const sound = bagRef.current.shift()!;
    lastPlayedRef.current = sound;
    return sound;
  }, []);

  const handlePress = useCallback(() => {
    const sound = drawNext();

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    audioRef.current.src = sound;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      // Autoplay / touch interaction fallback
    });

    setPressed(true);
    setShowHonk(true);
    window.setTimeout(() => setPressed(false), 220);
    window.setTimeout(() => setShowHonk(false), 650);
  }, [drawNext]);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Play truck horn"
        onClick={handlePress}
        className={`glass glass-edge flex min-h-[40px] sm:min-h-[44px] items-center justify-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-4 text-[11.5px] sm:text-[12.5px] font-medium text-cream/85 transition-all hover:text-cream active:scale-95 touch-manipulation select-none ${
          pressed ? "brightness-125 ring-1.5 ring-accent/60" : ""
        }`}
      >
        <TruckIcon />
        <span>Truck Horn</span>
      </button>

      {showHonk && (
        <span
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 text-[10.5px] sm:text-[11px] font-bold tracking-wide text-accent-glow select-none"
          style={{ animation: "honk-pop 0.6s ease-out forwards" }}
          aria-hidden
        >
          HONK!
        </span>
      )}
    </div>
  );
}
