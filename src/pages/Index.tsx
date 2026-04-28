import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import MediaRow from "@/components/MediaRow";
import { fetchFeatured, fetchRows } from "@/lib/api";
import type { MediaItem, MediaRow as MediaRowType } from "@/types/content";

export default function Index() {
  const [featured, setFeatured] = useState<MediaItem[]>([]);
  const [rows, setRows] = useState<MediaRowType[]>([]);

  useEffect(() => {
    document.title = "Hotstream — Movies, TV, Sports, Disney+ Originals";
    Promise.all([fetchFeatured(), fetchRows()]).then(([f, r]) => {
      setFeatured(f);
      setRows(r);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <h1 className="sr-only">Hotstream — Stream movies, TV shows, live sports and Disney+ Originals</h1>
        <HeroSlider items={featured} />
        <div className="relative -mt-16 md:-mt-24 space-y-2 pb-20">
          {rows.map((row) => (
            <MediaRow key={row.id} row={row} />
          ))}
        </div>
      </main>
      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Hotstream. All streams are demo content.
      </footer>
    </div>
  );
}
