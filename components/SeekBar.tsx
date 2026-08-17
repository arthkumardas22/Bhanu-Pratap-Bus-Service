"use client";

import { useCallback, useRef, useState } from "react";

interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  className?: string;
}

export default function SeekBar({
  currentTime,
  duration,
  onSeek,
  className = "",
}: SeekBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragRatio, setDragRatio] = useState<number | null>(null);

  const ratioFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const raw = (clientX - rect.left) / rect.width;
    return Math.min(1, Math.max(0, raw));
  }, []);

  const commit = useCallback(
    (ratio: number) => {
      if (duration > 0) onSeek(ratio * duration);
    },
    [duration, onSeek]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setDragging(true);
      const ratio = ratioFromClientX(e.clientX);
      setDragRatio(ratio);
    },
    [ratioFromClientX]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      setDragRatio(ratioFromClientX(e.clientX));
    },
    [dragging, ratioFromClientX]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      const ratio = ratioFromClientX(e.clientX);
      setDragging(false);
      setDragRatio(null);
      commit(ratio);
    },
    [dragging, ratioFromClientX, commit]
  );

  const playedRatio =
    dragging && dragRatio !== null
      ? dragRatio
      : duration > 0
      ? currentTime / duration
      : 0;
  const playedPct = `${Math.min(100, Math.max(0, playedRatio * 100))}%`;

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(currentTime)}
      tabIndex={0}
      data-dragging={dragging}
      className={`seek-hit touch-none relative flex h-6 w-full cursor-pointer items-center ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={(e) => {
        if (!duration) return;
        if (e.key === "ArrowRight") commit(Math.min(1, playedRatio + 0.02));
        if (e.key === "ArrowLeft") commit(Math.max(0, playedRatio - 0.02));
      }}
    >
      <div className="relative h-[3px] w-full overflow-visible rounded-full bg-white/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(224,164,88,0.55)]"
          style={{ width: playedPct }}
        />
        <div
          className="seek-knob absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-accent-glow shadow-[0_0_6px_rgba(242,192,122,0.9)]"
          style={{ left: playedPct }}
        />
      </div>
    </div>
  );
}
