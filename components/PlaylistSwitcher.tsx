import type { PlaylistKey, PlaylistMeta } from "@/lib/types";

interface PlaylistSwitcherProps {
  meta: PlaylistMeta[];
  active: PlaylistKey;
  onSelect: (key: PlaylistKey) => void;
  className?: string;
}

export default function PlaylistSwitcher({
  meta,
  active,
  onSelect,
  className = "",
}: PlaylistSwitcherProps) {
  return (
    <div
      className={`glass glass-edge flex items-center gap-1.5 rounded-full p-1 shadow-lg ${className}`}
      role="tablist"
      aria-label="Vibe Playlists"
    >
      {meta.map((p) => {
        const isActive = p.key === active;
        return (
          <button
            key={p.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(p.key)}
            title={p.tagline}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium tracking-wide transition-all duration-300 ${
              isActive
                ? "bg-accent/25 text-accent-glow ring-1.5 ring-accent/60 shadow-[0_0_16px_var(--color-vibe-glow)] scale-[1.02]"
                : "text-white/60 hover:text-white/95 hover:bg-white/5"
            }`}
          >
            <span className="text-sm">{p.icon}</span>
            <span>{p.label}</span>
          </button>
        );
      })}
    </div>
  );
}

