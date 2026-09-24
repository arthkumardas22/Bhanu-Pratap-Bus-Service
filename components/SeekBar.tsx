"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  className?: string;
}

function SeekBar({
  currentTime,
  duration,
  onSeek,
  className = "",
}: SeekBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragRatio, setDragRatio] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRatioRef = useRef<number | null>(null);

  const ratioFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return 0;
    const raw = (clientX - rect.left) / rect.width;
    return Math.min(1, Math.max(0, raw));
  }, []);

  const commit = useCallback(
    (ratio: number) => {
      if (duration > 0) {
        onSeek(ratio * duration);
      }
    },
    [duration, onSeek]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      try {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // Fallback for non-supporting browsers
      }
      setDragging(true);
      const ratio = ratioFromClientX(e.clientX);
      setDragRatio(ratio);
      pendingRatioRef.current = ratio;
    },
    [ratioFromClientX]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      const ratio = ratioFromClientX(e.clientX);
      pendingRatioRef.current = ratio;

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          if (pendingRatioRef.current !== null) {
            setDragRatio(pendingRatioRef.current);
          }
          rafRef.current = null;
        });
      }
    },
    [dragging, ratioFromClientX]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      const ratio = ratioFromClientX(e.clientX);
      setDragging(false);
      setDragRatio(null);
      pendingRatioRef.current = null;
      commit(ratio);
    },
    [dragging, ratioFromClientX, commit]
  );

  const handlePointerCancel = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setDragging(false);
    setDragRatio(null);
    pendingRatioRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

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
      aria-label="Seek track position"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(currentTime)}
      tabIndex={0}
      data-dragging={dragging}
      className={`seek-hit touch-none relative flex h-7 sm:h-6 w-full cursor-pointer items-center select-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onKeyDown={(e) => {
        if (!duration) return;
        if (e.key === "ArrowRight") commit(Math.min(1, playedRatio + 0.02));
        if (e.key === "ArrowLeft") commit(Math.max(0, playedRatio - 0.02));
      }}
    >
      <div className="relative h-[3.5px] sm:h-[3px] w-full overflow-visible rounded-full bg-white/15 pointer-events-none">
        {/* Progress Fill */}
        <div
          className={`absolute inset-y-0 left-0 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(224,164,88,0.55)] ${
            dragging ? "" : "transition-[width] duration-100 ease-out"
          }`}
          style={{ width: playedPct }}
        />
        {/* Knob Indicator */}
        <div
          className={`seek-knob absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-accent-glow shadow-[0_0_8px_rgba(242,192,122,0.95)] ${
            dragging
              ? "h-4 w-4 scale-110 opacity-100 ring-2 ring-white/60"
              : "h-3.5 w-3.5 sm:h-3 sm:w-3"
          }`}
          style={{ left: playedPct }}
        />
      </div>
    </div>
  );
}

export default memo(SeekBar);
