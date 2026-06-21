"use client";

import { useEffect, useRef } from "react";
import ScrollImageSequence from "./ScrollImageSequence";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

export default function HeroSection() {
  const foregroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const gsap = registerGsap();
    const el = foregroundRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Entry reveal
      gsap.from("[data-hero-line]", {
        yPercent: 110,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.2,
      });

      // Scroll-driven fade + parallax
      gsap.to(el, {
        yPercent: -20,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top top",
          end: "+=80%",
          scrub: true,
        },
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <ScrollImageSequence
      frameCount={120}
      imagePath="/frames"
      fileExtension="webp"
      startFrame={1}
      pad={4}
      scrollLength="+=350%"
      className="text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <div ref={foregroundRef} className="max-w-4xl">
          <p
            data-hero-line
            className="mb-6 text-xs uppercase tracking-[0.45em] text-white/50"
          >
            <span className="inline-block">A portfolio in motion</span>
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-tightest text-white sm:text-7xl md:text-[9rem]">
            <span data-hero-line className="block overflow-hidden">
              <span className="block">Built for</span>
            </span>
            <span data-hero-line className="block overflow-hidden">
              <span className="block bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
                motion.
              </span>
            </span>
          </h1>
          <p
            data-hero-line
            className="mx-auto mt-8 max-w-xl text-base text-white/60 sm:text-lg"
          >
            Every frame, intentional. Scroll into a portfolio engineered like a
            product launch.
          </p>
        </div>

        {/* Scroll cue */}
        <div
          data-hero-line
          className="absolute bottom-10 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40"
        >
          <span>Scroll</span>
          <span className="block h-8 w-px animate-floaty bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>
    </ScrollImageSequence>
  );
}
