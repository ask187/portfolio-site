"use client";

import { useEffect, useRef } from "react";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";
import { PHILOSOPHY_CARDS } from "@/data/content";

const accents = [
  { rgb: "167, 139, 250", hex: "#a78bfa" }, // violet  — Authority
  { rgb: "251, 113, 133", hex: "#fb7185" }, // rose    — Failure
  { rgb: "52, 211, 153", hex: "#34d399" }, // emerald — Measure
  { rgb: "251, 191, 36", hex: "#fbbf24" }, // amber   — Infrastructure
];

const features = PHILOSOPHY_CARDS.map((p, i) => ({
  title: p.title,
  body: p.description,
  accent: accents[i % accents.length],
}));

export default function FeatureSection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const gsap = registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-feature]", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-feature-eyebrow]", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
        },
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-ink-950 px-6 py-32 sm:py-44"
      id="features"
    >
      <div className="mx-auto max-w-6xl">
        <p
          data-feature-eyebrow
          className="mb-8 text-xs uppercase tracking-[0.45em] text-white/40"
        >
          Engineering principles
        </p>
        <h2
          data-feature-eyebrow
          className="max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl"
        >
          How I think about building systems.
        </h2>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <article
              data-feature
              key={f.title}
              style={
                {
                  "--accent": f.accent.hex,
                  "--accent-rgb": f.accent.rgb,
                } as React.CSSProperties
              }
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-colors duration-500 ease-apple hover:border-[rgba(var(--accent-rgb),0.35)]"
            >
              {/* accent rail along the top edge */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(var(--accent-rgb),0.55),transparent)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* ambient corner wash, always faintly visible */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.18),transparent_65%)] opacity-50 transition-opacity duration-700 ease-apple group-hover:opacity-100"
              />

              {/* hover glow, opposite corner */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.22),transparent_60%)] opacity-0 transition-opacity duration-700 ease-apple group-hover:opacity-100"
              />

              <div className="relative">
                <div
                  className="mb-10 flex items-center gap-3 text-xs font-mono tabular-nums"
                  style={{ color: f.accent.hex }}
                >
                  <span>0{i + 1}</span>
                  <span
                    aria-hidden
                    className="h-px w-8 bg-[rgba(var(--accent-rgb),0.45)]"
                  />
                </div>
                <h3 className="text-balance text-2xl font-medium tracking-tight text-white sm:text-3xl">
                  {f.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
                  {f.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
