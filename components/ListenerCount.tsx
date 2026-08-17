"use client";

import { useEffect, useState } from "react";

function getBaseCountForCurrentHour(): number {
  const hour = new Date().getHours();
  // Peak Indian late night radio listening between 9 PM (21) and 3 AM (3)
  if (hour >= 21 || hour < 3) {
    return 1380 + (hour === 23 || hour === 0 ? 140 : 80);
  } else if (hour >= 18 && hour < 21) {
    return 1120;
  } else if (hour >= 6 && hour < 12) {
    return 740;
  } else {
    return 950;
  }
}

export default function ListenerCount() {
  const [count, setCount] = useState<number>(1280);
  const [tripNumber, setTripNumber] = useState<number>(4829);

  useEffect(() => {
    // Initial calculation based on actual time
    const base = getBaseCountForCurrentHour();
    const variance = Math.floor(Math.random() * 30);
    setCount(base + variance);

    // Persistent trip counter in localStorage
    try {
      const stored = localStorage.getItem("nostalgia_truck_trips");
      const currentTrips = stored ? parseInt(stored, 10) : 4820;
      const nextTrips = currentTrips + 1;
      localStorage.setItem("nostalgia_truck_trips", nextTrips.toString());
      setTripNumber(nextTrips);
    } catch {
      // ignore
    }

    // Natural minor fluctuation every 6-8 seconds
    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        return prev + delta;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="glass glass-edge flex items-center gap-2 rounded-full px-3 py-1 text-[11.5px] text-cream/75 shadow-sm"
      title={`Trip #${tripNumber.toLocaleString("en-IN")} • Real-time highway radio stream`}
    >
      <div className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
      </div>
      <span className="tabular-nums font-semibold text-cream">
        {count.toLocaleString("en-IN")}
      </span>
      <span className="text-white/60">listening</span>
    </div>
  );
}

