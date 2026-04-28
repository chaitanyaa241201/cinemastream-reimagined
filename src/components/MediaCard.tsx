import { Link } from "react-router-dom";
import { Play, Plus, ThumbsUp } from "lucide-react";
import type { MediaItem } from "@/types/content";
import { cn } from "@/lib/utils";

interface MediaCardProps {
  item: MediaItem;
  className?: string;
}

export default function MediaCard({ item, className }: MediaCardProps) {
  return (
    <div
      className={cn(
        "group relative shrink-0 w-40 sm:w-48 md:w-56 transition-transform duration-300 ease-out hover:scale-[1.08] hover:z-20",
        className
      )}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-card shadow-card">
        <img
          src={item.poster}
          alt={item.title}
          loading="lazy"
          width={640}
          height={896}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.badge && (
          <span className="absolute top-2 left-2 rounded-sm bg-gradient-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {item.badge}
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
          <h3 className="text-sm font-semibold line-clamp-1">{item.title}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span>{item.year}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/60" />
            <span>{item.rating}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/60" />
            <span className="line-clamp-1">{item.genres[0]}</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Link
              to={`/watch/${item.id}`}
              aria-label={`Play ${item.title}`}
              className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background hover:bg-foreground/90 transition shadow-glow"
            >
              <Play className="h-4 w-4 fill-current" />
            </Link>
            <button
              aria-label="Add to watchlist"
              className="grid h-9 w-9 place-items-center rounded-full bg-background/70 backdrop-blur ring-1 ring-border hover:ring-foreground hover:bg-background transition"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              aria-label="Like"
              className="grid h-9 w-9 place-items-center rounded-full bg-background/70 backdrop-blur ring-1 ring-border hover:ring-foreground hover:bg-background transition"
            >
              <ThumbsUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
