"use client";

import { useEffect, useRef } from "react";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

const panels = [
  {
    eyebrow: "01 — Backend",
    title: "Six years behind the interface.",
    body:
      "API architectures serving hundreds of thousands of requests. BullMQ pipelines that compressed 30-minute ETL jobs into 2-minute runs. Production infra on bare-metal VPS when managed services weren't an option.",
  },
  {
    eyebrow: "02 — ML & Real-Time",
    title: "Then I turned the same lens on harder problems.",
    body:
      "At Northeastern: NLP classifiers for clinical urgency on imbalanced EHR data. Server-authoritative VR with frame-level terrain sync across Meta Quest headsets. A cross-chain analytics platform indexing 17,000+ dApps through concurrent Redis-backed pipelines.",
  },
  {
    eyebrow: "03 — Thread",
    title: "Complexity at the infra layer so the product can be simple.",
    body:
      "BullMQ with dead-letter recovery. Netcode authority preventing state drift. Vector similarity returning semantic results in under 50ms. Invisible when it works, load-bearing when it doesn't.",
  },
];

function BackendBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(16,185,129,0.10),_transparent_55%)]"
      />
      {[15, 32, 50, 68, 85].map((top, i) => (
        <div
          key={top}
          className="absolute left-0 right-0 h-px"
          style={{ top: `${top}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/15 to-transparent" />
          <div
            className="absolute -top-[3px] h-[7px] w-28 rounded-full bg-emerald-300/80 blur-[2px]"
            style={{
              animation: `pipelineFlow ${5.5 + i * 0.8}s linear ${i * 0.5}s infinite`,
            }}
          />
          <div
            className="absolute -top-[1px] h-[3px] w-3 rounded-full bg-emerald-200"
            style={{
              animation: `pipelineFlow ${5.5 + i * 0.8}s linear ${i * 0.5}s infinite`,
            }}
          />
        </div>
      ))}
      {/* node grid */}
      <div className="absolute right-12 top-1/2 hidden -translate-y-1/2 grid-cols-4 gap-3 md:grid">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-emerald-200"
            style={{
              animation: `nodeBlink ${2 + (i % 5) * 0.4}s ease-in-out ${i * 0.1}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MLRealtimeBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,_rgba(139,92,246,0.14),_transparent_55%)]"
      />
      {/* primary pulse anchor — center-left */}
      <div className="absolute left-[28%] top-1/2">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute left-0 top-0 h-44 w-44 rounded-full border border-violet-300/30"
            style={{
              animation: `pulseRingCenter 5.2s ease-out ${i * 1.3}s infinite`,
            }}
          />
        ))}
      </div>
      {/* secondary pulse — top-right */}
      <div className="absolute right-[18%] top-[24%]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute left-0 top-0 h-28 w-28 rounded-full border border-amber-300/25"
            style={{
              animation: `pulseRingCenter 6s ease-out ${i * 2}s infinite`,
            }}
          />
        ))}
      </div>
      {/* drifting scan */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-20 h-40 -skew-y-6 bg-gradient-to-b from-transparent via-violet-300/[0.07] to-transparent"
        style={{ animation: "scanSweep 7s ease-in-out infinite" }}
      />
      {/* subtle scanlines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 4px)",
        }}
      />
    </div>
  );
}

function ThreadBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,_rgba(251,191,36,0.10),_transparent_55%)]"
      />
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        aria-hidden
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="threadGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0" />
            <stop offset="50%" stopColor="#fde68a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="threadGrad2" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0" />
            <stop offset="50%" stopColor="#fef3c7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          { d: "M0,120 C300,300 700,-60 1200,280", w: 1.4, dur: 14, delay: 0 },
          { d: "M0,460 C400,260 800,640 1200,380", w: 1.1, dur: 18, delay: 2 },
          { d: "M0,700 C300,520 800,820 1200,580", w: 1.3, dur: 15, delay: 1 },
          { d: "M0,280 C400,460 700,140 1200,500", w: 0.9, dur: 20, delay: 3 },
          { d: "M0,580 C400,380 800,720 1200,260", w: 1.2, dur: 16, delay: 0.5 },
        ].map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={i % 2 === 0 ? "url(#threadGrad)" : "url(#threadGrad2)"}
            strokeWidth={p.w}
            style={{
              animation: `threadDrift ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
              transformOrigin: "center",
            }}
          />
        ))}
        {/* nodes at intersections */}
        {[
          { cx: 320, cy: 240 },
          { cx: 580, cy: 420 },
          { cx: 880, cy: 320 },
          { cx: 200, cy: 560 },
          { cx: 1000, cy: 540 },
        ].map((n, i) => (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r="3"
            fill="#fef3c7"
            style={{
              animation: `nodeBlink ${3 + (i % 3) * 0.6}s ease-in-out ${i * 0.4}s infinite`,
              transformOrigin: "center",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const backgrounds = [BackendBg, MLRealtimeBg, ThreadBg];

export default function PinnedStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelsWrapRef = useRef<HTMLDivElement | null>(null);
  const bgWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const gsap = registerGsap();
    const section = sectionRef.current;
    const wrap = panelsWrapRef.current;
    const bgWrap = bgWrapRef.current;
    if (!section || !wrap || !bgWrap) return;

    const ctx = gsap.context(() => {
      const items = wrap.querySelectorAll<HTMLDivElement>("[data-panel]");
      const bgs = bgWrap.querySelectorAll<HTMLDivElement>("[data-bg]");

      items.forEach((el, i) => {
        gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
      });
      bgs.forEach((el, i) => {
        gsap.set(el, { opacity: i === 0 ? 1 : 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${items.length * 80}%`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      items.forEach((el, i) => {
        if (i === 0) return;
        const prev = items[i - 1];
        const prevBg = bgs[i - 1];
        const currBg = bgs[i];

        tl.to(prev, { opacity: 0, y: -30, duration: 1, ease: "power2.inOut" }, "+=0.4");
        tl.to(el, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "<");
        if (prevBg) {
          tl.to(prevBg, { opacity: 0, duration: 1, ease: "power2.inOut" }, "<");
        }
        if (currBg) {
          tl.to(currBg, { opacity: 1, duration: 1, ease: "power2.out" }, "<");
        }
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-ink-900"
    >
      {/* per-panel animated backgrounds (crossfade with text) */}
      <div ref={bgWrapRef} className="absolute inset-0">
        {backgrounds.map((Bg, i) => (
          <div key={i} data-bg className="absolute inset-0">
            <Bg />
          </div>
        ))}
      </div>

      {/* ambient veil over backgrounds for text legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/10 to-ink-900/50"
      />

      <div className="relative mx-auto flex h-full max-w-6xl items-center px-6">
        <div ref={panelsWrapRef} className="relative w-full">
          {panels.map((p) => (
            <div
              key={p.title}
              data-panel
              className="absolute inset-0 flex flex-col justify-center"
            >
              <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/40">
                {p.eyebrow}
              </p>
              <h3 className="max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
                {p.title}
              </h3>
              <p className="mt-6 max-w-xl text-base text-white/55 sm:text-lg">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
