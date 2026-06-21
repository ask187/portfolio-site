"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-ink-950 px-6 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 35%, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0) 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="mb-8 text-[10px] uppercase tracking-[0.45em] text-white/40">
          Error · runtime
        </p>

        <h1 className="text-balance text-7xl font-semibold leading-[0.95] tracking-tightest sm:text-8xl md:text-[9rem]">
          <span className="block bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent">
            Something
          </span>
          <span className="block bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent">
            broke.
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-md text-base text-white/60 sm:text-lg">
          An unexpected error interrupted the render. You can retry, or head
          back to safer ground.
        </p>

        {error?.digest && (
          <p className="mt-4 font-mono text-xs text-white/30">
            ref: {error.digest}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-ink-950 transition-colors hover:bg-white/90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            Back to home
          </Link>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/30">
          <span>500 · render interrupted</span>
          <span className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </main>
  );
}
