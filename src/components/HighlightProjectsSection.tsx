"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";
import { HIGHLIGHT_PROJECTS, type HighlightProject } from "@/data/content";
import { ArcanumVisual } from "@/components/ProjectVisuals";

function RingsVisual({ accent }: { accent: string }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 55%, color-mix(in srgb, ${accent} 14%, transparent), transparent 65%)`,
      }}
    >
      {/* Ambient expanding pulse rings — kept dim so the mandala stays the hero */}
      <div className="absolute left-1/2 top-1/2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute left-0 top-0 h-44 w-44 rounded-full border"
            style={{
              borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
              animation: `ringExpand 5s ease-out ${i * 1.6}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Slowly rotating mandala (the same SVG used on /projects) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px]"
        style={{
          animation: "mandalaSpin 90s linear infinite",
          transformOrigin: "center",
        }}
      >
        <div
          className="h-full w-full"
          style={{ animation: "mandalaBreathe 6s ease-in-out infinite" }}
        >
          <ArcanumVisual className="h-full w-full" />
        </div>
      </div>

      {/* Soft glow behind the center */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ background: `color-mix(in srgb, ${accent} 35%, transparent)` }}
      />
    </div>
  );
}

function TilesVisual({ accent }: { accent: string }) {
  const tiles = [
    { label: "lex.", x: "12%", y: "22%", rot: -6, delay: 0, dur: 4.2 },
    { label: "vivid", x: "62%", y: "18%", rot: 4, delay: 1.1, dur: 5.0 },
    { label: "echo", x: "30%", y: "55%", rot: -3, delay: 2.0, dur: 4.6 },
    { label: "atlas", x: "70%", y: "62%", rot: 7, delay: 0.6, dur: 5.4 },
    { label: "spark", x: "20%", y: "78%", rot: -8, delay: 1.6, dur: 4.4 },
  ];
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 40% 50%, color-mix(in srgb, ${accent} 14%, transparent), transparent 65%)`,
      }}
    >
      {tiles.map((t) => (
        <div
          key={t.label}
          className="absolute rounded-md border px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm"
          style={
            {
              left: t.x,
              top: t.y,
              color: accent,
              borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
              background: `color-mix(in srgb, ${accent} 10%, transparent)`,
              animation: `tileFloat ${t.dur}s ease-in-out ${t.delay}s infinite`,
              "--rot": `${t.rot}deg`,
              transform: `rotate(${t.rot}deg)`,
            } as React.CSSProperties
          }
        >
          {t.label}
        </div>
      ))}
    </div>
  );
}

function WaveformVisual({ accent }: { accent: string }) {
  const bars = Array.from({ length: 22 });
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 75%, color-mix(in srgb, ${accent} 14%, transparent), transparent 60%)`,
      }}
    >
      {/* faux chat bubble */}
      <div
        className="absolute left-6 top-7 rounded-2xl rounded-bl-sm border px-3.5 py-2 text-[11px] backdrop-blur-sm"
        style={{
          color: accent,
          borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
          background: `color-mix(in srgb, ${accent} 8%, transparent)`,
        }}
      >
        what was the lecture about?
      </div>
      <div
        className="absolute right-6 top-[68px] rounded-2xl rounded-br-sm border px-3.5 py-2 text-[11px] text-white/70 backdrop-blur-sm"
        style={{
          borderColor: "rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.04)",
        }}
      >
        the back-prop derivation…
      </div>

      {/* waveform */}
      <div className="absolute inset-x-0 bottom-6 flex h-12 items-end justify-center gap-[3px] px-8">
        {bars.map((_, i) => {
          const dur = 0.9 + (i % 5) * 0.18;
          const delay = (i * 0.07) % 1.6;
          const h = 18 + (i % 7) * 4;
          return (
            <span
              key={i}
              className="w-[3px] origin-bottom rounded-sm"
              style={{
                height: `${h}px`,
                background: accent,
                opacity: 0.6,
                animation: `waveformBar ${dur}s ease-in-out ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function ClustersVisual({ accent }: { accent: string }) {
  // Three urgency clusters — stable (green), deteriorating (amber), critical (accent/rose)
  // Drifting points + a soft sweep line evoke a streaming triage feed.
  const clusters = [
    {
      color: "rgba(16,185,129,0.85)",
      cx: 26,
      cy: 60,
      points: [
        { dx: -10, dy: 4, d: 0 },
        { dx: 6, dy: -8, d: 1.1 },
        { dx: 12, dy: 8, d: 2.2 },
        { dx: -4, dy: -10, d: 1.6 },
      ],
    },
    {
      color: "rgba(251,191,36,0.85)",
      cx: 56,
      cy: 50,
      points: [
        { dx: 0, dy: 0, d: 0.4 },
        { dx: -8, dy: 8, d: 1.4 },
        { dx: 8, dy: -6, d: 2.4 },
      ],
    },
    {
      color: accent,
      cx: 80,
      cy: 38,
      points: [
        { dx: 0, dy: 0, d: 0.2 },
        { dx: 6, dy: 6, d: 1.2 },
      ],
    },
  ];
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 55%, color-mix(in srgb, ${accent} 14%, transparent), transparent 65%)`,
      }}
    >
      {/* soft cluster halos */}
      {clusters.map((c, i) => (
        <span
          key={`halo-${i}`}
          aria-hidden
          className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            left: `${c.cx}%`,
            top: `${c.cy}%`,
            background: c.color.replace("0.85", "0.18"),
          }}
        />
      ))}
      {/* points */}
      {clusters.map((c, ci) =>
        c.points.map((pt, pi) => (
          <span
            key={`p-${ci}-${pi}`}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: `calc(${c.cx}% + ${pt.dx}px)`,
              top: `calc(${c.cy}% + ${pt.dy}px)`,
              background: c.color,
              animation: `nodeBlink ${3 + ((ci + pi) % 3)}s ease-in-out ${pt.d}s infinite`,
            }}
          />
        ))
      )}
      {/* sweep line — scanning triage feed */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          animation: "scanSweep 4s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function CardVisual({ p }: { p: HighlightProject }) {
  if (p.visual === "rings") return <RingsVisual accent={p.accentColor} />;
  if (p.visual === "tiles") return <TilesVisual accent={p.accentColor} />;
  if (p.visual === "clusters") return <ClustersVisual accent={p.accentColor} />;
  return <WaveformVisual accent={p.accentColor} />;
}

export default function HighlightProjectsSection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const gsap = registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-highlight]", {
        y: 40,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          once: true,
        },
      });
      gsap.from("[data-highlight-eyebrow]", {
        y: 24,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root,
          start: "top 90%",
          once: true,
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
      id="highlights"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              data-highlight-eyebrow
              className="mb-6 text-xs uppercase tracking-[0.45em] text-white/40"
            >
              Highlight projects
            </p>
            <h2
              data-highlight-eyebrow
              className="max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl"
            >
              Things I&rsquo;m building right now.
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-white sm:self-end"
          >
            View all projects
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHT_PROJECTS.map((p, idx) => {
            const hasGithub = p.githubUrl && p.githubUrl !== "#";
            const hideOnLarge = idx >= 3;
            return (
              <article
                key={p.id}
                data-highlight
                style={
                  {
                    "--accent": p.accentColor,
                  } as React.CSSProperties
                }
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.015] transition-all duration-500 ease-apple hover:-translate-y-1 hover:border-[color:color-mix(in_srgb,var(--accent)_40%,transparent)] hover:shadow-[0_30px_80px_-20px_color-mix(in_srgb,var(--accent)_45%,transparent)]${
                  hideOnLarge ? " lg:hidden" : ""
                }`}
              >
                {/* Visual hero */}
                <div className="relative h-[220px] overflow-hidden">
                  <CardVisual p={p} />
                  {/* fade-out to card body */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-ink-950"
                  />
                  {/* accent rail */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, var(--accent), transparent)",
                    }}
                  />

                  {/* Hover overlay — buttons */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink-950/75 px-6 opacity-0 backdrop-blur-md transition-opacity duration-300 ease-apple group-hover:opacity-100 group-focus-within:opacity-100"
                  >
                    <Link
                      href={p.href}
                      className="inline-flex w-full max-w-[200px] items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 ease-apple hover:translate-y-[-1px]"
                      style={{
                        background: "var(--accent)",
                        color: "#0a0b10",
                        boxShadow:
                          "0 12px 30px -8px color-mix(in srgb, var(--accent) 60%, transparent)",
                      }}
                    >
                      View project
                      <span aria-hidden>→</span>
                    </Link>
                    {hasGithub ? (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full max-w-[200px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white backdrop-blur transition-all duration-300 ease-apple hover:border-white/40 hover:bg-white/10"
                      >
                        GitHub
                        <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <span
                        title="GitHub link coming soon"
                        className="inline-flex w-full max-w-[200px] cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white/40"
                      >
                        GitHub · soon
                      </span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                    <span
                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    {p.category}
                  </div>

                  <h3 className="text-balance text-2xl font-medium tracking-tight text-white">
                    {p.name}
                  </h3>

                  <p className="text-sm leading-relaxed text-white/55">
                    {p.blurb}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {p.techTags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 text-[10px] text-white/55"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
