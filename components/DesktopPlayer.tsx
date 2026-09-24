import { memo } from "react";
import type { PlaylistKey, PlaylistMeta, Track } from "@/lib/types";
import Vinyl from "./Vinyl";
import TrackInfo from "./TrackInfo";
import SeekBar from "./SeekBar";
import TimeDisplay from "./TimeDisplay";
import TransportControls from "./TransportControls";
import PlaylistSwitcher from "./PlaylistSwitcher";

interface DesktopPlayerProps {
  track: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playlistMeta: PlaylistMeta[];
  activePlaylist: PlaylistKey;
  trackIndex: number;
  totalTracks: number;
  onSelectPlaylist: (key: PlaylistKey) => void;
  onSeek: (seconds: number) => void;
  onPrev: () => void;
  onToggle: () => void;
  onNext: () => void;
  onOpenQueue: () => void;
}

function DesktopPlayer({
  track,
  isPlaying,
  currentTime,
  duration,
  playlistMeta,
  activePlaylist,
  trackIndex,
  totalTracks,
  onSelectPlaylist,
  onSeek,
  onPrev,
  onToggle,
  onNext,
  onOpenQueue,
}: DesktopPlayerProps) {
  const currentMeta = playlistMeta.find((p) => p.key === activePlaylist);

  return (
    <div
      className="hidden sm:flex w-full max-w-xl flex-col gap-2.5"
      style={{ contain: "layout style" }}
    >
      <div className="flex items-center justify-between px-1">
        <PlaylistSwitcher
          meta={playlistMeta}
          active={activePlaylist}
          onSelect={onSelectPlaylist}
        />

        {/* Queue button */}
        <button
          type="button"
          onClick={onOpenQueue}
          className="glass glass-edge flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-medium text-white/70 hover:text-accent-glow hover:bg-white/10 transition"
          title="View all songs in playlist"
        >
          <span>🎵</span>
          <span>{trackIndex + 1}/{totalTracks} Songs</span>
        </button>
      </div>

      <div className="glass glass-edge flex items-center gap-4 rounded-full p-3 pr-5 shadow-xl ring-1 ring-white/10">
        <Vinyl videoId={track.videoId} title={track.title} isPlaying={isPlaying} size={80} />

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center justify-between gap-3">
            <TrackInfo
              title={track.title}
              artist={track.artist}
              film={track.film}
              year={track.year}
            />
            <TimeDisplay currentTime={currentTime} duration={duration} className="shrink-0" />
          </div>
          <SeekBar currentTime={currentTime} duration={duration} onSeek={onSeek} />
        </div>

        <TransportControls
          isPlaying={isPlaying}
          onPrev={onPrev}
          onToggle={onToggle}
          onNext={onNext}
        />
      </div>
    </div>
  );
}

export default memo(DesktopPlayer);

