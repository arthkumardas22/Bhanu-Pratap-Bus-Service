"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track as trackAnalyticsEvent } from "@vercel/analytics";
import { playlists, playlistMeta } from "@/data/playlists";
import type { PlaylistKey } from "@/lib/types";
import { loadYouTubeApi, type YTPlayer, type YTPlayerEvent, type YTErrorEvent } from "@/lib/youtube";
import DesktopPlayer from "./DesktopPlayer";
import MobilePlayer from "./MobilePlayer";
import YouTubeStage from "./YouTubeStage";
import TrackListModal from "./TrackListModal";

const PROGRESS_INTERVAL_MS = 400; // ~2.5 updates per second

export default function MusicPlayer() {
  const [activePlaylist, setActivePlaylist] = useState<PlaylistKey>("nightDrive");
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isQueueOpen, setIsQueueOpen] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Synchronize dynamic vibe on HTML element for whole-page CSS atmosphere
  useEffect(() => {
    document.documentElement.setAttribute("data-vibe", activePlaylist);
  }, [activePlaylist]);

  // Broadcast player playing state to live listener count widget
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("bhanu:player_state", {
          detail: { isPlaying },
        })
      );
    }
  }, [isPlaying]);

  // Keep latest playlist/index/isPlaying in refs so YT event callbacks (bound once)
  // always act on current state without being recreated per render.
  const activePlaylistRef = useRef(activePlaylist);
  const trackIndexRef = useRef(trackIndex);
  const isPlayingRef = useRef(isPlaying);
  activePlaylistRef.current = activePlaylist;
  trackIndexRef.current = trackIndex;
  isPlayingRef.current = isPlaying;

  const currentTrack = playlists[activePlaylist][trackIndex];
  const currentMeta = playlistMeta.find((p) => p.key === activePlaylist) || playlistMeta[0];

  const startProgressLoop = useCallback(() => {
    if (progressTimerRef.current) return;
    progressTimerRef.current = setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      setCurrentTime(p.getCurrentTime());
      const d = p.getDuration();
      if (d && Number.isFinite(d)) setDuration(d);
    }, PROGRESS_INTERVAL_MS);
  }, []);

  const stopProgressLoop = useCallback(() => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);

  const goToTrack = useCallback((index: number, autoplay: boolean) => {
    const list = playlists[activePlaylistRef.current];
    const wrapped = ((index % list.length) + list.length) % list.length;
    setTrackIndex(wrapped);
    setCurrentTime(0);
    setDuration(0);
    const p = playerRef.current;
    if (!p || !readyRef.current) return;
    const videoId = list[wrapped].videoId;
    if (autoplay) {
      p.loadVideoById(videoId);
    } else {
      p.cueVideoById(videoId);
    }
  }, []);

  const handleNext = useCallback(() => {
    goToTrack(trackIndexRef.current + 1, isPlaying);
  }, [goToTrack, isPlaying]);

  const handlePrev = useCallback(() => {
    goToTrack(trackIndexRef.current - 1, isPlaying);
  }, [goToTrack, isPlaying]);

  const handleToggle = useCallback(() => {
    const p = playerRef.current;
    if (!p || !readyRef.current) {
      pendingPlayRef.current = true;
      return;
    }
    if (isPlaying) {
      p.pauseVideo();
    } else {
      p.playVideo();
    }
  }, [isPlaying]);

  const handleSeek = useCallback((seconds: number) => {
    const p = playerRef.current;
    if (!p || !readyRef.current) return;
    p.seekTo(seconds, true);
    setCurrentTime(seconds);
  }, []);

  const handleSelectPlaylist = useCallback(
    (key: PlaylistKey) => {
      if (key === activePlaylistRef.current) return;
      setActivePlaylist(key);
      setTrackIndex(0);
      setCurrentTime(0);
      setDuration(0);
      const p = playerRef.current;
      if (p && readyRef.current) {
        const videoId = playlists[key][0].videoId;
        if (isPlaying) {
          p.loadVideoById(videoId);
        } else {
          p.cueVideoById(videoId);
        }
      }
    },
    [isPlaying]
  );

  const handleSelectTrackFromQueue = useCallback(
    (index: number) => {
      goToTrack(index, true);
    },
    [goToTrack]
  );

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;

      const initialVideoId = playlists[activePlaylistRef.current][trackIndexRef.current].videoId;

      playerRef.current = new YT.Player("yt-stage-player", {
        videoId: initialVideoId,
        playerVars: {
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              playerRef.current?.playVideo();
            }
          },
          onStateChange: (e: YTPlayerEvent) => {
            if (e.data === YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              startProgressLoop();
            } else if (e.data === YT.PlayerState.PAUSED) {
              setIsPlaying(false);
              stopProgressLoop();
            } else if (e.data === YT.PlayerState.ENDED) {
              stopProgressLoop();
              // Only advance to next track if music was actually playing
              if (isPlayingRef.current) {
                goToTrack(trackIndexRef.current + 1, true);
              }
            }
          },
          onError: (e: YTErrorEvent) => {
            const list = playlists[activePlaylistRef.current];
            const videoId = list[trackIndexRef.current]?.videoId ?? "unknown";
            trackAnalyticsEvent("youtube_playback_error", {
              errorCode: e.data,
              videoId,
            });
            console.warn("YouTube player error:", e.data, "videoId:", videoId);
            // CRITICAL: NEVER automatically change the song if user is not actively playing
            if (!isPlayingRef.current) {
              return;
            }
            // If actively playing, try advancing once
            goToTrack(trackIndexRef.current + 1, true);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      stopProgressLoop();
      playerRef.current?.destroy();
      playerRef.current = null;
      readyRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-2 px-4">
      <div className="flex w-full max-w-xl justify-center items-center px-1">
        {/* Active vibe tagline */}
        <div className="text-[12px] font-medium text-white/75 flex items-center gap-1.5 animate-pulse glass glass-edge px-3.5 py-1 rounded-full shadow-sm">
          <span>{currentMeta.icon}</span>
          <span className="text-accent-glow">{currentMeta.tagline}</span>
        </div>
      </div>

      <YouTubeStage />


      <DesktopPlayer
        track={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        playlistMeta={playlistMeta}
        activePlaylist={activePlaylist}
        trackIndex={trackIndex}
        totalTracks={playlists[activePlaylist].length}
        onSelectPlaylist={handleSelectPlaylist}
        onSeek={handleSeek}
        onPrev={handlePrev}
        onToggle={handleToggle}
        onNext={handleNext}
        onOpenQueue={() => setIsQueueOpen(true)}
      />

      <MobilePlayer
        track={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        playlistMeta={playlistMeta}
        activePlaylist={activePlaylist}
        trackIndex={trackIndex}
        totalTracks={playlists[activePlaylist].length}
        onSelectPlaylist={handleSelectPlaylist}
        onSeek={handleSeek}
        onPrev={handlePrev}
        onToggle={handleToggle}
        onNext={handleNext}
        onOpenQueue={() => setIsQueueOpen(true)}
      />

      {/* Track List Modal */}
      <TrackListModal
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        tracks={playlists[activePlaylist]}
        currentTrackIndex={trackIndex}
        activePlaylistMeta={currentMeta}
        isPlaying={isPlaying}
        onSelectTrack={handleSelectTrackFromQueue}
      />
    </div>
  );
}

