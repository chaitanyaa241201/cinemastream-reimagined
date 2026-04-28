import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaRow as MediaRowType } from "@/types/content";
import MediaCard from "./MediaCard";
import { cn } from "@/lib/utils";

interface MediaRowProps {
  row: MediaRowType;
}

export default function MediaRow({ row }: MediaRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="relative group/row py-4 md:py-6">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <h2 className="mb-3 md:mb-4 text-lg md:text-xl font-bold tracking-tight">{row.title}</h2>
      </div>

      <div className="relative">
        <button
          aria-label="Scroll left"
          onClick={() => scrollBy(-1)}
          className={cn(
            "hidden md:grid absolute left-0 top-0 bottom-0 z-10 w-12 place-items-center bg-background/70 backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity",
            !canLeft && "pointer-events-none !opacity-0"
          )}
        >
          <ChevronLeft className="h-7 w-7" />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-4 md:px-8 py-8 -my-8"
        >
          {row.items.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>

        <button
          aria-label="Scroll right"
          onClick={() => scrollBy(1)}
          className={cn(
            "hidden md:grid absolute right-0 top-0 bottom-0 z-10 w-12 place-items-center bg-background/70 backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity",
            !canRight && "pointer-events-none !opacity-0"
          )}
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      </div>
    </section>
  );
}
