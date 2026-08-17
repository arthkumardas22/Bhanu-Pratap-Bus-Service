# Late Night Drive — Nostalgia Radio

A single-page Next.js music site styled like a late-night ride in an old
Indian truck: transparent iOS-style glass player floating over a looping
cinematic background video, YouTube-powered playback, a nostalgic truck
horn, and a Spotify playlist link.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's already in place

- `public/bg/scene-wide.mp4` + `scene-wide.webm` — your supplied truck-cabin
  video, with the small watermark in the bottom-right corner removed, and
  encoded as both WebM (primary) and MP4 (fallback) for broad browser
  compatibility. It's used as a looping, muted, full-bleed background.
- `public/bg/scene-poster.jpg` — a poster frame shown before the video
  loads.

## What you still need to add

1. **Songs** — open `data/playlists.ts`. Every track is a placeholder
   (`REPLACE_WITH_YOUTUBE_ID`). Replace `videoId` with the 11-character ID
   from a YouTube URL for a video you have the right to use, or one
   uploaded by the actual rights holder with embedding enabled. Adding a
   song is a one-line change — copy a row, edit the fields.

2. **Truck horn audio** — drop five MP3s into `public/horns/` named:
   ```
   horn-01.mp3
   horn-02.mp3
   horn-03.mp3
   horn-04.mp3
   horn-05.mp3
   ```
   (Filenames can be changed — just update the list in `data/playlists.ts`.)
   Pressing the horn button plays a random clip from a shuffled bag with no
   immediate repeats.

3. **Portrait background (optional)** — only a landscape video was
   supplied, so it's used at every screen size/orientation right now. If
   you compose a separate portrait video later, swap `BackgroundVideo.tsx`
   for two `<video>` elements toggled by an `(orientation: portrait)` media
   query, mirroring how the original spec toggled `scene-wide.png` /
   `scene-tall.png`.

## Project structure

```
app/
  globals.css       Tailwind v4 @theme tokens, glass/grain/keyframes
  layout.tsx         Root layout, safe-area viewport, Analytics/SpeedInsights
  page.tsx            Assembles the page
components/          All UI pieces, defined at module scope (never nested)
data/playlists.ts    Track data, Spotify URL, horn file list
lib/youtube.ts       YouTube IFrame API loader + types
lib/types.ts         Track/Playlist types
public/bg/            Background video + poster
public/horns/         Truck horn audio (add your files here)
```

## Notes

- The YouTube IFrame player renders in a small always-visible "dashboard
  screen" panel (`YouTubeStage`) near the vinyl, in compliance with YouTube's
  policy against hiding the player. The vinyl itself uses YouTube's own
  hotlinked thumbnail — nothing is downloaded or re-hosted.
- Progress polls ~2.5×/second; all player sub-components are declared at
  module scope so the vinyl never remounts/resets its spin mid-playback.
- Seeking uses `onPointerDown`/`onPointerMove` with `touch-none` so dragging
  never scrolls the page.
- `youtube_playback_error` is fired via `@vercel/analytics`'s `track()`
  whenever a video errors out (deleted/embedding disabled), and the player
  auto-advances to the next track.
