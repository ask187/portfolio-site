import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Signal lost",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-ink-950 px-6 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 35%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="mb-8 text-[10px] uppercase tracking-[0.45em] text-white/40">
          Error · 404
        </p>

        <h1 className="text-balance text-7xl font-semibold leading-[0.95] tracking-tightest sm:text-8xl md:text-[9rem]">
          <span className="block bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent">
            Signal
          </span>
          <span className="block bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent">
            lost.
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-md text-base text-white/60 sm:text-lg">
          The route you requested isn&apos;t on the map. It may have been moved,
          renamed, or never existed.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-ink-950 transition-colors hover:bg-white/90"
          >
            Back to home
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            View projects
          </Link>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/30">
          <span>404 · route not found</span>
          <span className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </main>
  );
}
