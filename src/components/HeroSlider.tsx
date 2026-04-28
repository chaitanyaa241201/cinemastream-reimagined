import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Info, Play } from "lucide-react";
import type { MediaItem } from "@/types/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSliderProps {
  items: MediaItem[];
}

export default function HeroSlider({ items }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const count = items.length;

  useEffect(() => {
    if (count < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6500);
    return () => clearInterval(t);
  }, [count]);

  if (!count) return null;

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <section className="relative h-[62vh] min-h-[420px] md:h-[78vh] md:min-h-[560px] w-full overflow-hidden">
      {items.map((item, i) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-out",
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-hidden={i !== index}
        >
          <img
            src={item.backdrop || item.poster}
            alt={item.title}
            className={cn("h-full w-full object-cover", i === index && "animate-hero-zoom")}
            loading={i === 0 ? "eager" : "lazy"}
            width={1920}
            height={900}
          />
          <div className="absolute inset-0 gradient-hero-side" />
          <div className="absolute inset-0 gradient-hero" />

          <div className="absolute inset-0 flex items-end md:items-center">
            <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 pb-16 md:pb-0">
              <div className="max-w-xl md:max-w-2xl animate-fade-in">
                {item.badge && (
                  <span className="inline-flex items-center rounded-sm bg-gradient-primary px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                    {item.badge}
                  </span>
                )}
                <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight text-balance drop-shadow-lg">
                  {item.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <span>{item.year}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                  <span>{item.rating}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                  <span>{item.genres.join(" • ")}</span>
                </div>
                <p className="mt-4 text-sm md:text-base text-foreground/80 line-clamp-3 max-w-lg">
                  {item.description}
                </p>
                <div className="mt-6 flex gap-3">
                  <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-semibold">
                    <Link to={`/watch/${item.id}`}>
                      <Play className="h-5 w-5 fill-current" /> Watch Now
                    </Link>
                  </Button>
                  <Button size="lg" variant="secondary" className="bg-secondary/80 backdrop-blur hover:bg-secondary">
                    <Info className="h-5 w-5" /> More Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      {count > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            className="hidden md:grid absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 place-items-center rounded-full bg-background/50 hover:bg-background/80 backdrop-blur transition"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => go(1)}
            className="hidden md:grid absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 place-items-center rounded-full bg-background/50 hover:bg-background/80 backdrop-blur transition"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-8 bg-primary" : "w-4 bg-foreground/40 hover:bg-foreground/70"
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
