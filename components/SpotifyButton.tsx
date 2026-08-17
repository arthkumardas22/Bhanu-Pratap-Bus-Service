import { SPOTIFY_PLAYLIST_URL } from "@/data/playlists";

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#1DB954]">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.59 14.4a.62.62 0 0 1-.86.21c-2.36-1.44-5.33-1.77-8.83-.97a.62.62 0 1 1-.28-1.22c3.83-.88 7.11-.5 9.76 1.12.3.18.39.56.21.86zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.7-1.66-6.82-2.14-10.02-1.17a.78.78 0 1 1-.45-1.49c3.65-1.1 8.19-.57 11.28 1.33.37.23.48.72.26 1.07zm.11-2.84C14.9 9.02 9.17 8.82 5.9 9.8a.94.94 0 1 1-.54-1.8c3.76-1.14 10.05-.9 14.02 1.44a.94.94 0 0 1-.96 1.6z" />
    </svg>
  );
}

export default function SpotifyButton() {
  return (
    <a
      href={SPOTIFY_PLAYLIST_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Spotify playlist in a new tab"
      className="glass glass-edge flex min-h-[44px] items-center gap-2 rounded-full px-4 text-[12.5px] font-medium text-cream/90 transition hover:text-white hover:bg-white/10 hover:border-[#1DB954]/50 shadow-md"
    >
      <SpotifyIcon />
      <span>Listen on Spotify</span>
    </a>
  );
}

