"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

interface Props {
  children: React.ReactNode;
}

/**
 * Mounts Lenis once at the root, bridges it to GSAP's ticker, and forwards
 * every scroll event to ScrollTrigger. Respects prefers-reduced-motion.
 */
export default function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const gsap = registerGsap();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: reduceMotion ? 0 : 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduceMotion,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
