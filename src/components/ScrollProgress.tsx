"use client";

import { useEffect, useRef } from "react";

/**
 * Thin top-of-page progress bar driven directly by scroll position.
 * Uses a ref + transform so React never re-renders on scroll.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      frame.current = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
      }
    };

    const onScroll = () => {
      if (frame.current != null) return;
      frame.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-px bg-white/5"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-white/80 via-white/60 to-white/0"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
