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
  const audioPoolRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const [pressed, setPressed] = useState(false);
  const [showHonk, setShowHonk] = useState(false);
  const honkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pre-instantiate and buffer all 5 horns for instant 0ms response
  useEffect(() => {
    try {
      hornSounds.forEach((src) => {
        const audio = new Audio(src);
        audio.preload = "auto";
        audioPoolRef.current.set(src, audio);
      });
    } catch {
      // Audio element not supported in current environment
    }

    return () => {
      audioPoolRef.current.forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      audioPoolRef.current.clear();
      if (honkTimeoutRef.current) clearTimeout(honkTimeoutRef.current);
    };
  }, []);

  const drawNext = useCallback(() => {
    if (bagRef.current.length === 0) {
      const next = shuffle(hornSounds);
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
    // Instant visual feedback without waiting for audio thread
    setPressed(true);
    setShowHonk(true);

    if (honkTimeoutRef.current) clearTimeout(honkTimeoutRef.current);
    honkTimeoutRef.current = setTimeout(() => {
      setShowHonk(false);
    }, 650);

    // Haptic feedback if available on mobile
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(40);
      } catch {
        // ignore
      }
    }

    // Schedule audio playback non-blockingly so visual paint happens in <8ms
    setTimeout(() => {
      const sound = drawNext();
      let audio = audioPoolRef.current.get(sound);

      if (!audio) {
        audio = new Audio(sound);
        audioPoolRef.current.set(sound, audio);
      }

      try {
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } catch {
        // ignore
      }
    }, 0);

    setTimeout(() => setPressed(false), 200);
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
