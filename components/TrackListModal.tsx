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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="glass glass-edge relative flex max-h-[80vh] w-full max-w-lg flex-col rounded-3xl p-5 shadow-2xl ring-1 ring-white/20 animate-press"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{activePlaylistMeta.icon}</span>
            <div>
              <h3 className="text-base font-bold text-cream">
                {activePlaylistMeta.label}
              </h3>
              <p className="text-[11.5px] text-accent-glow font-medium">
                {activePlaylistMeta.tagline}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close track list"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        {/* Track List */}
        <div className="mt-3 flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-[55vh]">
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
                className={`group flex w-full items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 text-left transition-all ${
                  isCurrent
                    ? "bg-accent/25 ring-1 ring-accent/50 text-accent-glow shadow-[0_0_12px_var(--color-vibe-glow)]"
                    : "hover:bg-white/10 text-cream/80 hover:text-cream"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/40 text-[11px] font-semibold text-white/70 group-hover:bg-accent/30 group-hover:text-cream transition">
                    {isCurrent && isPlaying ? (
                      <span className="inline-block animate-pulse text-accent">▶</span>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className={`truncate text-[13.5px] font-medium leading-snug ${isCurrent ? "text-accent-glow font-semibold" : "text-cream"}`}>
                      {track.title}
                    </p>
                    <p className="truncate text-[11.5px] text-white/55">
                      {track.artist} • <span className="text-white/40">{track.film} ({track.year})</span>
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right text-[11.5px] text-white/45 group-hover:text-accent-glow">
                  {track.duration}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-3 border-t border-white/10 pt-2.5 text-center text-[11px] text-white/45">
          Click any song to play • Sorted for {activePlaylistMeta.label}
        </div>
      </div>
    </div>
  );
}
