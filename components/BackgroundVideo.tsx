"use client";

import { useEffect, useRef } from "react";
import type { PlaylistKey } from "@/lib/types";

interface BackgroundVideoProps {
  vibe?: PlaylistKey;
}

export default function BackgroundVideo({ vibe = "nightDrive" }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch((err) => {
        console.warn("Background video autoplay prevented:", err);
      });
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="hero-bg-video z-0"
        poster="/bg/scene-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src="/bg/scene-wide.webm" type="video/webm" />
        <source src="/bg/scene-wide.mp4" type="video/mp4" />
      </video>

      {/* Primary base vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/85 transition-opacity duration-700"
        aria-hidden
      />

      {/* Dynamic Vibe Ambient Color Glow Overlay */}
      <div
        className={`pointer-events-none fixed inset-0 z-[1] transition-all duration-1000 ${
          vibe === "nightDrive"
            ? "bg-[radial-gradient(ellipse_at_50%_90%,rgba(224,164,88,0.18),transparent_65%)]"
            : vibe === "oldMemories"
            ? "bg-[radial-gradient(ellipse_at_50%_75%,rgba(245,158,11,0.22),transparent_70%)] mix-blend-color"
            : "bg-[radial-gradient(ellipse_at_50%_80%,rgba(96,165,250,0.24),transparent_65%)]"
        }`}
        aria-hidden
      />
    </>
  );
}


