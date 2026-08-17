export interface Track {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  duration: string; // display fallback, e.g. "4:12" — actual duration comes from the YouTube player
  /**
   * YouTube video ID only. Only use IDs for videos you have the right to use,
   * or that are uploaded by the rights holder with embedding enabled.
   */
  videoId: string;
}

export type PlaylistKey = "nightDrive" | "oldMemories" | "lateNight";

export type Playlists = Record<PlaylistKey, Track[]>;

export interface PlaylistMeta {
  key: PlaylistKey;
  label: string;
  icon: string;
  tagline: string;
  description: string;
}

