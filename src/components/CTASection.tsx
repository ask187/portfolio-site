"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";
import { PROFILE, FOOTER_LINKS } from "@/data/content";

export default function CTASection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const gsap = registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-cta]", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.1,
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
      className="relative overflow-hidden bg-ink-950 px-6 py-40 sm:py-56"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[40rem] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08),_transparent_60%)]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <p
          data-cta
          className="mb-6 text-xs uppercase tracking-[0.45em] text-white/40"
        >
          Let&rsquo;s build
        </p>
        <h2
          data-cta
          className="text-balance text-5xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-7xl"
        >
          Have a system worth building?
        </h2>
        <p
          data-cta
          className="mt-6 max-w-xl text-base text-white/55 sm:text-lg"
        >
          Open to roles in applied ML, distributed systems, and real-time
          backend engineering. Internships, full-time, or research collaborations.
        </p>
        <div data-cta className="mt-12">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white px-7 py-3 text-sm font-medium text-ink-950 transition-all duration-500 ease-apple hover:gap-5 hover:border-white/0 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.35)]"
          >
            <span className="relative z-10">Start a conversation</span>
            <span className="relative z-10 transition-transform duration-500 ease-apple group-hover:translate-x-1">
              →
            </span>
            <span
              aria-hidden
              className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-b from-white to-white/80 transition-transform duration-500 ease-apple group-hover:translate-y-0"
            />
          </Link>
        </div>
      </div>

      <footer className="relative mx-auto mt-32 flex max-w-6xl flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 text-xs text-white/30 sm:flex-row">
        <span>
          © {new Date().getFullYear()} — {PROFILE.fullName}
        </span>
        <ul className="flex items-center gap-6">
          {FOOTER_LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="transition-colors hover:text-white/80"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <span>{PROFILE.location}</span>
      </footer>
    </section>
  );
}
