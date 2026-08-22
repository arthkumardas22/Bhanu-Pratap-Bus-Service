"use client";

import Image from "next/image";

interface VinylProps {
  videoId: string;
  title: string;
  isPlaying: boolean;
  size: number;
}

export default function Vinyl({ videoId, title, isPlaying, size }: VinylProps) {
  const spindleSize = Math.max(10, Math.round(size * 0.18));

  return (
    <div
      className="relative shrink-0 select-none self-start"
      style={{ width: size, height: size }}
    >
      <div
        className="vinyl-spin relative h-full w-full overflow-hidden rounded-full ring-1 ring-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.55)]"
        data-playing={isPlaying}
      >
        <Image
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt=""
          fill
          sizes={`${size}px`}
          className="object-cover pointer-events-none"
          unoptimized
          priority
        />
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_38%,rgba(0,0,0,0.15)_39%,rgba(0,0,0,0.55)_46%,transparent_47%)]" />
      </div>
      <div
        className="pointer-events-none absolute rounded-full bg-black/70 ring-2 ring-white/40"
        style={{
          width: spindleSize,
          height: spindleSize,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden
      />
      <span className="sr-only">Album art for {title}</span>
    </div>
  );
}
