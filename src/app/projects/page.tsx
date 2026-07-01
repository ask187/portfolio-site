import Link from "next/link";
import { PROJECTS } from "@/data/content";
import { getProjectVisual } from "@/components/ProjectVisuals";
import { GithubIcon } from "@/components/ui/brand-icons";

export const metadata = {
  title: "Projects — Aravind Santhosh Kumar",
  description:
    "Personal, college, and side projects spanning distributed VR, ML pipelines, vector search, and full-stack platforms.",
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-ink-950 px-6 pt-32 pb-40">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/40">
          Personal · College · Side
        </p>
        <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-tightest text-white sm:text-7xl">
          Projects worth shipping.
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/55">
          Distributed real-time architecture, ML classification on imbalanced
          data, vector retrieval, and full-stack competition platforms. Each
          prioritizes reliability and measurable impact over surface polish.
        </p>

        <div className="mt-20 divide-y divide-white/5 border-t border-white/5">
          {PROJECTS.map((p) => {
            const Visual = getProjectVisual(p.id);
            const hasGithub = Boolean(p.githubUrl && p.githubUrl.startsWith("http"));
            const hasLive = Boolean(p.liveUrl && p.liveUrl.startsWith("http"));
            return (
            <article
              key={p.id}
              id={p.id}
              style={
                {
                  "--accent": p.accentColor,
                } as React.CSSProperties
              }
              className="group relative grid grid-cols-12 items-baseline gap-x-6 gap-y-3 overflow-hidden py-12 transition-colors hover:bg-white/[0.02]"
            >
              {/* Subtle right-bleed visual watermark */}
              {Visual && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-[-6%] top-1/2 hidden h-[360px] w-[460px] -translate-y-1/2 opacity-55 transition-opacity duration-700 ease-apple group-hover:opacity-90 lg:block"
                >
                  <Visual className="h-full w-full" />
                </div>
              )}

              <div className="relative col-span-12 flex items-center gap-3 text-xs tabular-nums text-white/30 sm:col-span-2">
                <span>{p.year}</span>
              </div>
              <div className="relative col-span-12 sm:col-span-10 lg:col-span-8 xl:col-span-7">
                <div
                  className="mb-2 text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: "var(--accent)" }}
                >
                  {p.category}
                </div>
                <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                  {p.name}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">
                  {p.problem}
                </p>

                <dl className="mt-6 grid grid-cols-3 gap-4 sm:max-w-md">
                  {p.impacts.map((s) => (
                    <div key={s.label}>
                      <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">
                        {s.label}
                      </dt>
                      <dd
                        className="mt-1 text-lg font-semibold tracking-tight"
                        style={{ color: "var(--accent)" }}
                      >
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/45">
                  {p.architecture}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.techTags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/55"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {(hasLive || hasGithub) && (
                  <div className="mt-6 flex flex-wrap justify-end gap-2">
                    {hasLive && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${p.name}`}
                        title={`Visit ${p.name}`}
                        className="group/live inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-ink-950 transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                          background: "var(--accent)",
                          boxShadow:
                            "0 10px 24px -10px color-mix(in srgb, var(--accent) 55%, transparent)",
                        }}
                      >
                        <span>Visit project</span>
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover/live:translate-x-0.5"
                        >
                          ↗
                        </span>
                      </a>
                    )}
                    {hasGithub && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.name} on GitHub`}
                        title={`${p.name} on GitHub`}
                        className="group/gh relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-950 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-white/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:color-mix(in_srgb,var(--accent)_55%,transparent)] hover:text-[color:var(--accent)]"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover/gh:translate-x-0.5"
                        >
                          ↗
                        </span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
            );
          })}
        </div>

        <div className="mt-24">
          <Link
            href="/"
            className="text-sm text-white/50 transition-colors hover:text-white"
          >
            ← Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
