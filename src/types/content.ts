// Shared content models. Swap mock data for API responses later.

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  poster: string;
  backdrop?: string;
  year: number;
  rating: string; // e.g. "U/A 13+"
  duration: string; // e.g. "2h 14m" or "5 Seasons"
  genres: string[];
  videoUrl: string; // HLS or MP4
  badge?: "Premium" | "Free" | "New";
}

export interface MediaRow {
  id: string;
  title: string;
  items: MediaItem[];
}
