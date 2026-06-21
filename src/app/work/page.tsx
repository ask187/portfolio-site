import Link from "next/link";
import { EXPERIENCES } from "@/data/content";

export const metadata = {
  title: "Work — Aravind Santhosh Kumar",
  description:
    "6+ years of production engineering across backend, infrastructure, and ML systems — Geode, KPMG, Blume Global, Dsquare Solutions.",
};

const logoMark = (company: string): string => {
  const overrides: Record<string, string> = {
    KPMG: "KPMG",
    "Blume Global": "BG",
    "Dsquare Solutions": "DS",
    Geode: "GEO",
  };
  return overrides[company] ?? company.slice(0, 3).toUpperCase();
};

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-ink-950 px-6 pt-32 pb-40">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/40">
          Work history
        </p>
        <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-tightest text-white sm:text-7xl">
          Where I&rsquo;ve <span className="italic font-light text-white/40">built things.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/55">
          6+ years of production engineering across backend, infrastructure,
          and ML systems — from React micro-frontends and supply-chain
          platforms to BullMQ-based orchestration and CI/CD redesigns.
        </p>

        {/* Timeline */}
        <div className="mt-20">
          {EXPERIENCES.map((exp, i) => {
            const isLast = i === EXPERIENCES.length - 1;
            return (
              <article
                key={`${exp.company}-${i}`}
                style={
                  {
                    "--accent": exp.accentColor,
                  } as React.CSSProperties
                }
                className="relative flex gap-6"
              >
                {/* Timeline spine */}
                <div className="hidden flex-shrink-0 flex-col items-center pt-8 md:flex">
                  <span
                    className="h-2.5 w-2.5 flex-shrink-0 rounded-full ring-4 ring-ink-950"
                    style={{ background: "var(--accent)" }}
                  />
                  {!isLast && (
                    <span
                      className="mt-2 w-px flex-1"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        minHeight: "64px",
                      }}
                    />
                  )}
                </div>

                {/* Card */}
                <div className="flex-1 pb-10">
                  <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.015] transition-all duration-500 hover:border-[color:color-mix(in_srgb,var(--accent)_35%,transparent)]">
                    {/* Ghost wordmark */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-[10%] -right-[2%] select-none whitespace-nowrap font-extrabold leading-none transition-opacity duration-500 group-hover:opacity-[0.06]"
                      style={{
                        fontSize: "clamp(80px, 10vw, 150px)",
                        color: "var(--accent)",
                        opacity: 0.04,
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {logoMark(exp.company)}
                    </div>

                    {/* Accent rail */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, var(--accent), transparent)",
                      }}
                    />

                    <div className="relative grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
                      {/* Left — company identity */}
                      <div
                        className="flex flex-col gap-5 p-7 md:border-r md:p-8"
                        style={{ borderColor: "rgba(255,255,255,0.04)" }}
                      >
                        <div>
                          <div
                            className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold"
                            style={{
                              background:
                                "color-mix(in srgb, var(--accent) 12%, transparent)",
                              color: "var(--accent)",
                              border:
                                "1px solid color-mix(in srgb, var(--accent) 22%, transparent)",
                            }}
                          >
                            {exp.company.charAt(0)}
                          </div>
                          <div
                            className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]"
                            style={{ color: "var(--accent)" }}
                          >
                            {exp.company}
                          </div>
                          <div className="font-mono text-[10px] text-white/35">
                            {exp.description}
                          </div>
                        </div>

                        {exp.keyMetrics && exp.keyMetrics.length > 0 && (
                          <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
                            {exp.keyMetrics.map((m) => (
                              <div key={m.label}>
                                <div
                                  className="text-base font-semibold tracking-tight"
                                  style={{ color: "var(--accent)" }}
                                >
                                  {m.value}
                                </div>
                                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">
                                  {m.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-auto">
                          <div className="font-mono text-[11px] tracking-wide text-white/45">
                            {exp.period}
                          </div>
                          <div className="mt-1 font-mono text-[10px] text-white/35">
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      {/* Right — content */}
                      <div className="flex flex-col gap-6 p-7 md:p-8">
                        <h3 className="text-balance text-[22px] font-semibold leading-snug tracking-tight text-white md:text-2xl">
                          {exp.role}
                        </h3>

                        <ul className="flex-1 space-y-3">
                          {exp.highlights.map((h, idx) => (
                            <li
                              key={idx}
                              className="flex gap-3 text-[13px] leading-[1.75] text-white/55"
                            >
                              <span
                                aria-hidden
                                className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full"
                                style={{
                                  background: "var(--accent)",
                                  opacity: 0.55,
                                }}
                              />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>

                        <div
                          className="flex flex-wrap gap-1.5 border-t pt-5"
                          style={{ borderColor: "rgba(255,255,255,0.04)" }}
                        >
                          {exp.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 text-[10px] text-white/55"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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
