import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Share2, ThumbsUp } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { fetchMediaById } from "@/lib/api";
import type { MediaItem } from "@/types/content";

export default function Watch() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchMediaById(id || "").then((m) => {
      if (!active) return;
      setItem(m);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <main className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border/60">
        <div className="mx-auto max-w-[1600px] flex items-center gap-3 px-4 md:px-8 h-14">
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground truncate">
            {item ? item.title : "Loading…"}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-6">
        <div className="overflow-hidden rounded-lg bg-black shadow-hero ring-1 ring-border">
          {loading || !item ? (
            <div className="aspect-video animate-pulse bg-secondary/60" />
          ) : (
            <VideoPlayer src={item.videoUrl} poster={item.backdrop || item.poster} />
          )}
        </div>

        {item && (
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_280px]">
            <div className="animate-fade-in">
              <h1 className="text-2xl md:text-4xl font-black tracking-tight">{item.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <span>{item.year}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                <span>{item.rating}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                <span>{item.duration}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                <span>{item.genres.join(" • ")}</span>
              </div>
              <p className="mt-4 text-sm md:text-base text-foreground/80 max-w-2xl">
                {item.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button variant="secondary" className="gap-2"><Plus className="h-4 w-4" /> Watchlist</Button>
                <Button variant="secondary" className="gap-2"><ThumbsUp className="h-4 w-4" /> Like</Button>
                <Button variant="secondary" className="gap-2"><Share2 className="h-4 w-4" /> Share</Button>
              </div>
            </div>

            <aside className="rounded-lg bg-card p-5 ring-1 ring-border">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Details</h2>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Genres</dt>
                  <dd className="text-right">{item.genres.join(", ")}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Rated</dt>
                  <dd>{item.rating}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Duration</dt>
                  <dd>{item.duration}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Release</dt>
                  <dd>{item.year}</dd>
                </div>
              </dl>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
