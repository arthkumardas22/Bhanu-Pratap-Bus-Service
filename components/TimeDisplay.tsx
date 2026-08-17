function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface TimeDisplayProps {
  currentTime: number;
  duration: number;
  className?: string;
}

export default function TimeDisplay({
  currentTime,
  duration,
  className = "",
}: TimeDisplayProps) {
  return (
    <div className={`flex gap-1 text-[10.5px] tabular-nums text-white/60 ${className}`}>
      <span>{formatTime(currentTime)}</span>
      <span>/</span>
      <span>{formatTime(duration)}</span>
    </div>
  );
}
