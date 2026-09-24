"use client";

import { useEffect, useState, memo } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function splitParts(date: Date) {
  const formatted = formatter.format(date); // e.g. "11:47 PM"
  const [time, period] = formatted.split(" ");
  const [hour, minute] = time.split(":");
  return { hour, minute, period };
}

function ClockWidget() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    // Checking every 10 seconds keeps minute precision while avoiding 1s wakeups
    const id = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return <div className="text-[13px] tabular-nums text-cream/80" aria-hidden />;
  }

  const { hour, minute, period } = splitParts(now);

  return (
    <div
      className="flex items-baseline gap-0.5 sm:gap-1 text-[11.5px] sm:text-[13px] tabular-nums text-cream/85 select-none"
      aria-label={`Current time in India: ${hour}:${minute} ${period}`}
    >
      <span>{hour}</span>
      <span className="blink-colon">:</span>
      <span>{minute}</span>
      <span className="ml-0.5 text-[8.5px] sm:text-[10px] text-cream/55 font-medium">{period} IST</span>
    </div>
  );
}

export default memo(ClockWidget);
