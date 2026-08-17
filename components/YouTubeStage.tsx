interface YouTubeStageProps {
  className?: string;
}

export default function YouTubeStage({ className = "" }: YouTubeStageProps) {
  return (
    <div
      className={`pointer-events-none fixed bottom-1 right-1 w-60 h-36 opacity-[0.001] z-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div id="yt-stage-player" className="h-full w-full" />
    </div>
  );
}


