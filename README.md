# 🚌 Bhanu Pratap Bus Service (भानु प्रताप बस सर्विस)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-bhanu--pratap--bus--service.vercel.app-emerald?style=for-the-badge&logo=vercel)](https://bhanu-pratap-bus-service.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

> **A nostalgic late-night Indian highway journey set inside the cabin of Bhanu Pratap Bus Service — featuring vintage 90s & 2000s Bollywood classics, aesthetic frosted-glass controls, looping cinematic cabin visuals, authentic truck horn soundboard, and spinning vinyl player.**

🌐 **Live Website:** [https://bhanu-pratap-bus-service.vercel.app/](https://bhanu-pratap-bus-service.vercel.app/)

---

## 🌟 Overview

**Bhanu Pratap Bus Service** is an ambient, aesthetic web music player inspired by long late-night highway drives through India. It captures the charm of nostalgic cassette tapes, ambient cabin lighting, illuminated windshield lettering (*"★ ऑल इण्डिया टूरिस्ट परमिट ★"*), and the golden era of 90s/2000s Bollywood melodies.

Built with **Next.js 15**, **React 19**, and modern **Tailwind CSS v4**, the interface floats a glassmorphic music player over a continuous, high-definition cabin drive loop.

---

## ✨ Features

- 🛣️ **Cinematic Highway Ambience**: Full-bleed looping driver's cabin video with subtle retro film grain and warm ambient glow.
- 📯 **Authentic Truck Horns**: Interactive highway horn button loaded with 5 genuine pressure horn sounds, played randomly without immediate repeats.
- 💿 **Spinning Vinyl Disc**: Realistic spinning vinyl record that rotates in sync with playback state and displays YouTube video album art.
- 🎶 **Curated Nostalgic Playlists**: 3 distinct mood-based vibes loaded with 30 iconic 90s and 2000s Hindi songs:
  - 🛣️ **Night Drive**: Upbeat highway romantic anthems.
  - 📻 **Old Memories**: Soulful cassette-era golden classics.
  - 🌙 **Late Night**: 2 AM solitude & melancholic highway melodies.
- 🎵 **Interactive Music Controls**:
  - Smooth seek bar with drag-to-seek support (touch & mouse friendly).
  - Track queue modal with full song listings and metadata.
  - Play, Pause, Next, Previous, and seamless playlist switching.
  - YouTube IFrame integration in full compliance with embed policies.
- 👥 **Simulated Live Highway Radio**: Real-time simulated active listener count and live highway trip clock.
- 📱 **Responsive Glassmorphism Design**: Frosted glass dashboard with adaptive mobile and desktop layouts, safe-area viewport support, and micro-animations.
- 🟢 **Spotify & Social Links**: Quick one-click links to the official Spotify playlist and creator's Instagram profile.

---

## 🎵 Playlist Catalog

| Vibe | Tagline | Featured Artists & Hits | Total Tracks |
| :--- | :--- | :--- | :---: |
| 🛣️ **Night Drive** | *Highway Cruising • Romantic Beats* | Kumar Sanu, Alka Yagnik, Udit Narayan (*Sirf Tum, Dilwale, Mohra, Barsaat*) | 10 Tracks |
| 📻 **Old Memories** | *Cassette Nostalgia • Golden Classics* | Anuradha Paudwal, Mohammed Aziz (*Aashiqui, Saajan, Phool Aur Kaante*) | 10 Tracks |
| 🌙 **Late Night** | *2 AM Solitude • Deep Melodies* | Kumar Sanu, Sadhana Sargam, Kavita K. (*Deewana, Sainik, Qayamat, Saathi*) | 10 Tracks |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + CSS Glassmorphism
- **Audio & Video**: YouTube IFrame API + HTML5 Audio / Video
- **Typography**: Google Fonts (*Inter, Kalam, Rozha One, Yatra One*)
- **Analytics & Insights**: `@vercel/analytics` & `@vercel/speed-insights`
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.18 or later) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arthkumardas22/nostalgia-truck-nextjs.git
   cd nostalgia-truck-nextjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to experience the site locally.

### Production Build

```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
├── app/
│   ├── globals.css              # Tailwind v4 tokens, glass/grain styling & keyframes
│   ├── layout.tsx               # Root layout, Google Fonts, metadata & Vercel analytics
│   └── page.tsx                 # Main application page layout
├── components/
│   ├── BackgroundVideo.tsx      # Looping cinematic cabin background video
│   ├── BusServiceLogo.tsx       # Bhanu Pratap Bus Service windshield typography
│   ├── ClockWidget.tsx          # Real-time clock widget
│   ├── DesktopPlayer.tsx        # Glassmorphic desktop audio player
│   ├── MobilePlayer.tsx         # Responsive mobile player layout
│   ├── MusicPlayer.tsx          # Core audio player orchestration & YouTube sync
│   ├── ListenerCount.tsx        # Simulated live highway listener counter
│   ├── PlaylistSwitcher.tsx     # Tabbed vibe switcher (Night Drive, Old Memories, Late Night)
│   ├── SeekBar.tsx              # Interactive drag-to-seek progress bar
│   ├── SpotifyButton.tsx        # Link to curated Spotify playlist
│   ├── TrackListModal.tsx       # Modal popup showing full playlist songs
│   ├── TransportControls.tsx    # Play, Pause, Next, Previous buttons
│   ├── TruckHorn.tsx            # Multi-sample interactive truck horn player
│   ├── Vinyl.tsx                # Spinning vinyl disc animation component
│   └── YouTubeStage.tsx         # YouTube IFrame player integration
├── data/
│   └── playlists.ts             # 30 curated song metadata, video IDs & horn paths
├── lib/
│   ├── types.ts                 # TypeScript interfaces for tracks and playlists
│   └── youtube.ts               # YouTube IFrame API loader utility
└── public/
    ├── bg/                      # Cabin video (MP4/WebM) and poster frame
    ├── horns/                   # 5 authentic truck horn audio files (MP3)
    └── bhanu-pratap-manthan-white.png # Bus service windshield branding logo
```

---

## 🎛️ Customization

### Adding / Modifying Tracks
Open [`data/playlists.ts`](data/playlists.ts) to edit or add new songs under `nightDrive`, `oldMemories`, or `lateNight`:

```typescript
{
  id: "custom-id",
  title: "Song Title",
  artist: "Artist Name",
  film: "Movie Name",
  year: 1995,
  duration: "5:30",
  videoId: "YOUTUBE_VIDEO_ID", // 11-character YouTube video ID
}
```

### Adding New Horn Sounds
Place audio files in `public/horns/` and update the `hornSounds` array in [`data/playlists.ts`](data/playlists.ts).

---

## 👨‍💻 Creator & Credits

- **Created by:** [Arth Kumar Das](https://github.com/arthkumardas22)
- **Instagram:** [@arth_kumar_das](https://www.instagram.com/arth_kumar_das)
- **Live Link:** [bhanu-pratap-bus-service.vercel.app](https://bhanu-pratap-bus-service.vercel.app/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
