interface TrackInfoProps {
  title: string;
  artist: string;
  film?: string;
  year?: number;
  className?: string;
}

export default function TrackInfo({
  title,
  artist,
  film,
  year,
  className = "",
}: TrackInfoProps) {
  return (
    <div className={`min-w-0 ${className}`}>
      <p className="truncate text-[14.5px] font-semibold leading-tight text-cream">
        {title}
      </p>
      <p className="truncate text-[12px] leading-tight text-white/70">
        {artist}
        {film && (
          <span className="text-accent/90">
            {" "}
            • {film}
            {year ? ` (${year})` : ""}
          </span>
        )}
      </p>
    </div>
  );
}

