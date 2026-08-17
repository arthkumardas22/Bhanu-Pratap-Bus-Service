"use client";

import { useEffect, useState } from "react";

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

export default function ClockWidget() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return <div className="text-[13px] tabular-nums text-cream/80" aria-hidden />;
  }

  const { hour, minute, period } = splitParts(now);

  return (
    <div
      className="flex items-baseline gap-1 text-[13px] tabular-nums text-cream/85"
      aria-label={`Current time in India: ${hour}:${minute} ${period}`}
    >
      <span>{hour}</span>
      <span className="blink-colon">:</span>
      <span>{minute}</span>
      <span className="ml-0.5 text-[10px] text-cream/55">{period} IST</span>
    </div>
  );
}
