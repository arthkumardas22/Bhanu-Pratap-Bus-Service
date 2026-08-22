"use client";

import type { Track, PlaylistMeta } from "@/lib/types";

interface TrackListModalProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: Track[];
  currentTrackIndex: number;
  activePlaylistMeta: PlaylistMeta;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
}

export default function TrackListModal({
  isOpen,
  onClose,
  tracks,
  currentTrackIndex,
  activePlaylistMeta,
  isPlaying,
  onSelectTrack,
}: TrackListModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity select-none"
      onClick={onClose}
    >
      <div
        className="glass glass-edge relative flex max-h-[85dvh] sm:max-h-[80vh] w-full max-w-lg flex-col rounded-t-[28px] sm:rounded-3xl p-4 sm:p-5 shadow-2xl ring-1 ring-white/20 animate-press pb-6 sm:pb-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile top pill indicator */}
        <div className="w-10 h-1 rounded-full bg-white/25 mx-auto mb-2 sm:hidden shrink-0" aria-hidden />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="text-xl sm:text-2xl shrink-0">{activePlaylistMeta.icon}</span>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-cream truncate">
                {activePlaylistMeta.label}
              </h3>
              <p className="text-[10.5px] sm:text-[11.5px] text-accent-glow font-medium truncate">
                {activePlaylistMeta.tagline}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close track list"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 active:scale-90 transition touch-manipulation"
          >
            ✕
          </button>
        </div>

        {/* Track List */}
        <div className="mt-2.5 sm:mt-3 flex-1 overflow-y-auto space-y-1 sm:space-y-1.5 pr-0.5 max-h-[58dvh] sm:max-h-[55vh] overscroll-contain">
          {tracks.map((track, idx) => {
            const isCurrent = idx === currentTrackIndex;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => {
                  onSelectTrack(idx);
                  onClose();
                }}
                className={`group flex w-full items-center justify-between gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-left transition-all active:scale-[0.98] touch-manipulation ${
                  isCurrent
                    ? "bg-accent/25 ring-1 ring-accent/50 text-accent-glow shadow-[0_0_12px_var(--color-vibe-glow)]"
                    : "hover:bg-white/10 text-cream/80 hover:text-cream"
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-black/40 text-[10.5px] sm:text-[11px] font-semibold text-white/70 group-hover:bg-accent/30 group-hover:text-cream transition">
                    {isCurrent && isPlaying ? (
                      <span className="inline-block animate-pulse text-accent text-[10px]">▶</span>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className={`truncate text-[12.5px] sm:text-[13.5px] font-medium leading-snug ${isCurrent ? "text-accent-glow font-semibold" : "text-cream"}`}>
                      {track.title}
                    </p>
                    <p className="truncate text-[10.5px] sm:text-[11.5px] text-white/55">
                      {track.artist} • <span className="text-white/40">{track.film} ({track.year})</span>
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right text-[10.5px] sm:text-[11.5px] text-white/45 group-hover:text-accent-glow tabular-nums">
                  {track.duration}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-2.5 sm:mt-3 border-t border-white/10 pt-2 sm:pt-2.5 text-center text-[10px] sm:text-[11px] text-white/45">
          Click any song to play • Sorted for {activePlaylistMeta.label}
        </div>
      </div>
    </div>
  );
}
