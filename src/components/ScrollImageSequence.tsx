"use client";

import { useEffect, useRef, useState } from "react";
import {
  buildFramePath,
  drawImageCover,
  preloadFrames,
} from "@/lib/imageSequence";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

export interface ScrollImageSequenceProps {
  /** Total number of frames in the sequence. */
  frameCount: number;
  /** Folder path under /public, e.g. "/frames". */
  imagePath: string;
  /** File extension without dot, e.g. "webp". */
  fileExtension: string;
  /** First frame index (1 for frame_0001, 0 for frame_0000). */
  startFrame?: number;
  /** Filename prefix before the padded index. Defaults to "frame_". */
  filePrefix?: string;
  /** Zero-pad width of the frame index. Defaults to 4. */
  pad?: number;
  /**
   * Pin / scroll distance for the sequence, expressed as a CSS length or
   * multiplier of viewport height. Default: "+=300%".
   */
  scrollLength?: string;
  /** Extra classes on the outer pinned wrapper. */
  className?: string;
  /** Children rendered above the canvas (text, CTAs, etc). */
  children?: React.ReactNode;
  /** Called when frames are ready. */
  onReady?: () => void;
}

/**
 * Scroll-driven canvas image sequence.
 * - Preloads all frames.
 * - Pins itself across `scrollLength` and scrubs through frames.
 * - Resizes responsively, draws with cover semantics, clamps DPR to 2.
 * - Respects prefers-reduced-motion (shows a static frame).
 */
export default function ScrollImageSequence({
  frameCount,
  imagePath,
  fileExtension,
  startFrame = 1,
  filePrefix = "frame_",
  pad = 4,
  scrollLength = "+=300%",
  className = "",
  children,
  onReady,
}: ScrollImageSequenceProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameStateRef = useRef({ index: 0 });

  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Preload frames once on mount.
  useEffect(() => {
    let cancelled = false;
    const urls: string[] = [];
    for (let i = 0; i < frameCount; i++) {
      urls.push(
        buildFramePath(imagePath, filePrefix, pad, fileExtension, startFrame + i)
      );
    }

    let progressCount = 0;
    const tick = () => {
      progressCount += 1;
      if (!cancelled) setProgress(progressCount / urls.length);
    };

    // Manual preload that updates progress per-image.
    const loaders = urls.map(
      (url) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            tick();
            resolve(img);
          };
          img.onerror = () => {
            tick();
            resolve(img);
          };
          img.src = url;
        })
    );

    Promise.all(loaders).then((imgs) => {
      if (cancelled) return;
      imagesRef.current = imgs;
      setLoaded(true);
      onReady?.();
    });

    // Fallback in case nothing resolves (e.g. all 404s on dev): use preloadFrames
    // result silently as a safety net.
    preloadFrames(urls).catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [frameCount, imagePath, fileExtension, startFrame, filePrefix, pad, onReady]);

  // Canvas sizing + drawing + ScrollTrigger setup.
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !wrapper || !sticky) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const gsap = registerGsap();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = sticky.clientWidth;
      const h = sticky.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint();
    };

    const paint = () => {
      const w = sticky.clientWidth;
      const h = sticky.clientHeight;
      const i = Math.max(
        0,
        Math.min(frameCount - 1, Math.round(frameStateRef.current.index))
      );
      const img = imagesRef.current[i];
      if (img && img.naturalWidth) {
        drawImageCover(ctx, img, w, h);
      } else {
        // Frame missing -> fall back to gradient fill rather than crashing.
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, "#0a0b10");
        grad.addColorStop(1, "#1a1d26");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
    };

    const ctxScope = gsap.context(() => {
      if (reduceMotion) {
        // Static: show middle frame, no scrub.
        frameStateRef.current.index = Math.floor(frameCount / 2);
        paint();
        return;
      }

      const tween = gsap.to(frameStateRef.current, {
        index: frameCount - 1,
        ease: "none",
        snap: "index",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: scrollLength,
          scrub: true,
          pin: sticky,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: paint,
      });

      // First paint so we don't show a blank canvas before the user scrolls.
      paint();

      // After mount, refresh to recalc pin distances against actual layout.
      ScrollTrigger.refresh();

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, wrapper);

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      ctxScope.revert();
    };
  }, [loaded, frameCount, scrollLength]);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        ref={stickyRef}
        className="relative h-screen w-full overflow-hidden bg-ink-950"
      >
        {/* Fallback gradient while loading */}
        <div
          aria-hidden
          className={[
            "absolute inset-0 transition-opacity duration-700 ease-apple",
            "bg-[radial-gradient(ellipse_at_center,_#1a1d26_0%,_#05060a_70%)]",
            loaded ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full select-none"
          aria-hidden
        />

        {/* Subtle vignette to anchor foreground text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950/70"
        />

        {/* Loading indicator */}
        {!loaded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/40">
            <span>Loading sequence</span>
            <div className="h-px w-40 overflow-hidden bg-white/10">
              <div
                className="h-full bg-white/60 transition-[width] duration-150 ease-linear"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
