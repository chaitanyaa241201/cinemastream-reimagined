import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  onReady?: (player: Player) => void;
}

/**
 * Modular Video.js wrapper. Handles HLS (.m3u8) and MP4 automatically.
 * Replace `src` with signed URLs from your backend when wiring up real playback.
 */
export default function VideoPlayer({ src, poster, autoplay = true, onReady }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create element imperatively so StrictMode double-mount is safe.
    const videoEl = document.createElement("video-js");
    videoEl.classList.add("vjs-big-play-centered", "vjs-fluid");
    containerRef.current.appendChild(videoEl);

    const type = src.endsWith(".m3u8") ? "application/x-mpegURL" : "video/mp4";

    const player = (playerRef.current = videojs(
      videoEl,
      {
        controls: true,
        autoplay,
        preload: "auto",
        responsive: true,
        fluid: true,
        poster,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        sources: [{ src, type }],
      },
      () => onReady?.(player)
    ));

    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <div data-vjs-player className="w-full">
      <div ref={containerRef} className="w-full" />
    </div>
  );
}
