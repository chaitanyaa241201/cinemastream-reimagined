// Thin API layer. Today returns mock data; later, swap to real fetch() calls.
import type { MediaItem, MediaRow } from "@/types/content";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import poster1 from "@/assets/poster-1.jpg";
import poster2 from "@/assets/poster-2.jpg";
import poster3 from "@/assets/poster-3.jpg";
import poster4 from "@/assets/poster-4.jpg";
import poster5 from "@/assets/poster-5.jpg";
import poster6 from "@/assets/poster-6.jpg";
import poster7 from "@/assets/poster-7.jpg";
import poster8 from "@/assets/poster-8.jpg";

// Public demo HLS streams — replace with your own playback URLs.
const DEMO_HLS =
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
const DEMO_HLS_2 =
  "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";

const posters = [poster1, poster2, poster3, poster4, poster5, poster6, poster7, poster8];

const titles = [
  "Shadow Protocol", "Beyond the Stars", "The Enchanted Realm", "Midnight Agent",
  "The Haunting Hour", "Paris in Love", "Final Whistle", "Guardians Reborn",
  "Empire of Glass", "Nightfall", "Monsoon Memories", "Crown of Ashes",
];

function makeItem(i: number, overrides: Partial<MediaItem> = {}): MediaItem {
  const poster = posters[i % posters.length];
  const title = titles[i % titles.length];
  return {
    id: `m-${i}`,
    title,
    description:
      "A gripping tale of courage, betrayal and redemption that pushes our hero to the edge of everything they believe.",
    poster,
    backdrop: poster,
    year: 2021 + (i % 5),
    rating: ["U", "U/A 7+", "U/A 13+", "U/A 16+", "A"][i % 5],
    duration: i % 3 === 0 ? `${2 + (i % 2)}h ${10 + i}m` : `${1 + (i % 4)} Seasons`,
    genres: [["Action", "Thriller"], ["Sci-Fi", "Adventure"], ["Fantasy", "Family"], ["Drama", "Romance"], ["Sports", "Documentary"]][i % 5],
    videoUrl: i % 2 === 0 ? DEMO_HLS : DEMO_HLS_2,
    badge: (["Premium", "New", "Free"] as const)[i % 3],
    ...overrides,
  };
}

const featured: MediaItem[] = [
  {
    ...makeItem(0),
    id: "hero-1",
    title: "Shadow Protocol",
    description:
      "When a rogue operative uncovers a conspiracy reaching the highest ranks, the only way out is through. An electrifying new original.",
    backdrop: hero1,
    poster: hero1,
    badge: "Premium",
  },
  {
    ...makeItem(2),
    id: "hero-2",
    title: "Crown of Ashes",
    description:
      "Kingdoms fall, dragons rise. A sweeping epic fantasy from the makers of your favorite legends — now streaming.",
    backdrop: hero2,
    poster: hero2,
    badge: "New",
  },
  {
    ...makeItem(6),
    id: "hero-3",
    title: "Final Whistle: Live",
    description:
      "Every six, every wicket. Catch the biggest cricket showdown of the season — live and uninterrupted.",
    backdrop: hero3,
    poster: hero3,
    badge: "Free",
  },
];

function row(id: string, title: string, offset: number, count = 10): MediaRow {
  return {
    id,
    title,
    items: Array.from({ length: count }, (_, i) => makeItem(offset + i, { id: `${id}-${i}` })),
  };
}

// ---- Public API (swap internals with fetch later) ----

export async function fetchFeatured(): Promise<MediaItem[]> {
  return featured;
}

export async function fetchRows(): Promise<MediaRow[]> {
  return [
    row("trending", "Trending Now", 0),
    row("sports", "Sports", 6),
    row("disney", "Disney+ Originals", 2),
    row("movies", "Blockbuster Movies", 3),
    row("kids", "Kids & Family", 4),
  ];
}

export async function fetchMediaById(id: string): Promise<MediaItem | null> {
  const rows = await fetchRows();
  const feats = await fetchFeatured();
  return (
    feats.find((f) => f.id === id) ||
    rows.flatMap((r) => r.items).find((i) => i.id === id) ||
    null
  );
}
