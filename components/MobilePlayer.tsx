import type { PlaylistKey, PlaylistMeta, Track } from "@/lib/types";
import Vinyl from "./Vinyl";
import TrackInfo from "./TrackInfo";
import SeekBar from "./SeekBar";
import TimeDisplay from "./TimeDisplay";
import TransportControls from "./TransportControls";
import PlaylistSwitcher from "./PlaylistSwitcher";

interface MobilePlayerProps {
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

export default function MobilePlayer({
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
}: MobilePlayerProps) {
  return (
    <div className="sm:hidden flex w-full flex-col gap-2">
      <div className="flex items-center justify-between gap-1 px-1">
        <PlaylistSwitcher
          meta={playlistMeta}
          active={activePlaylist}
          onSelect={onSelectPlaylist}
          className="flex-1 justify-center"
        />
        <button
          type="button"
          onClick={onOpenQueue}
          className="glass glass-edge flex h-8 items-center gap-1 rounded-full px-2.5 text-[11px] font-medium text-white/70 hover:text-accent-glow"
          title="Track queue"
        >
          <span>🎵</span>
          <span>{trackIndex + 1}/{totalTracks}</span>
        </button>
      </div>

      <div className="glass glass-edge flex flex-col gap-2.5 rounded-[26px] p-4 shadow-xl ring-1 ring-white/10">
        <div className="flex items-center gap-3">
          <Vinyl videoId={track.videoId} title={track.title} isPlaying={isPlaying} size={64} />
          <TrackInfo
            title={track.title}
            artist={track.artist}
            film={track.film}
            year={track.year}
            className="flex-1"
          />
        </div>

        <SeekBar currentTime={currentTime} duration={duration} onSeek={onSeek} />

        <div className="flex items-center justify-between">
          <TimeDisplay currentTime={currentTime} duration={duration} />
          <TransportControls
            isPlaying={isPlaying}
            onPrev={onPrev}
            onToggle={onToggle}
            onNext={onNext}
            size="lg"
          />
          <div className="w-[52px]" aria-hidden />
        </div>
      </div>
    </div>
  );
}

