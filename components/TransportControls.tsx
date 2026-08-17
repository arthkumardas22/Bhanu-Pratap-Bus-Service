"use client";

interface TransportControlsProps {
  isPlaying: boolean;
  onPrev: () => void;
  onToggle: () => void;
  onNext: () => void;
  size?: "sm" | "lg";
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M6 6h2v12H6zm3.5 6 9-6v12z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M16 6h2v12h-2zM5.5 6l9 6-9 6z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M7 5.5v13l11-6.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6.5 5h4v14h-4zm7 0h4v14h-4z" />
    </svg>
  );
}

export default function TransportControls({
  isPlaying,
  onPrev,
  onToggle,
  onNext,
  size = "sm",
}: TransportControlsProps) {
  const btn =
    "flex items-center justify-center rounded-full text-cream/85 transition hover:text-cream hover:bg-white/10 active:scale-90";
  const smallBtn = `${btn} h-11 w-11`;

  const playSize = size === "lg" ? "h-13 w-13" : "h-11 w-11";

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Previous track"
        onClick={onPrev}
        className={smallBtn}
      >
        <PrevIcon />
      </button>

      <button
        type="button"
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={onToggle}
        className={`${playSize} flex items-center justify-center rounded-full bg-gradient-to-b from-accent-glow to-accent-dim text-ink shadow-[0_6px_18px_-4px_rgba(224,164,88,0.65)] ring-1 ring-white/25 transition active:scale-90`}
        style={size === "lg" ? { width: 52, height: 52 } : undefined}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <button
        type="button"
        aria-label="Next track"
        onClick={onNext}
        className={smallBtn}
      >
        <NextIcon />
      </button>
    </div>
  );
}
