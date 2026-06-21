import Link from "next/link";
import { SKILL_CLUSTERS, INTEREST_PILLARS, HERO_MARKERS } from "@/data/content";

export const metadata = {
  title: "About — Aravind Santhosh Kumar",
  description:
    "Systems engineer building distributed, ML, and real-time infrastructure. MS Computer Science at Northeastern.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-ink-950 px-6 pt-32 pb-40">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/40">
          About
        </p>
        <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-tightest text-white sm:text-7xl">
          The trajectory.
        </h1>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* Narrative */}
          <div className="space-y-6 text-base leading-[1.8] text-white/65">
            <p>
              I spent my first six years as an engineer where most of the hard
              problems live —{" "}
              <strong className="font-semibold text-white">
                behind the interface
              </strong>
              . Designing API architectures that serve hundreds of thousands of
              requests, building queue-based ingestion systems that compress
              30-minute ETL jobs into 2-minute pipelines, and deploying
              production infrastructure on bare-metal VPS when managed services
              weren&rsquo;t an option.
            </p>

            <blockquote className="my-7 border-l-2 border-white/30 pl-5 text-xl font-medium italic leading-snug text-white/80">
              I don&rsquo;t just write endpoints. I design the data flow, the
              failure modes, and the recovery paths.
            </blockquote>

            <p>
              At Northeastern, I turned that operational intuition toward{" "}
              <strong className="font-semibold text-white">
                ML and distributed real-time systems
              </strong>
              . I built NLP classifiers for clinical urgency detection on
              messy, imbalanced EHR data. I architected a server-authoritative
              multiplayer VR environment where terrain state synchronizes
              across Meta Quest headsets at frame-level precision. I designed
              a cross-chain analytics platform that ingests and indexes
              17,000+ decentralized applications through concurrent
              Redis-backed pipelines.
            </p>

            <p>
              The thread across all of it:{" "}
              <strong className="font-semibold text-white">
                I build systems that handle complexity at the infrastructure
                layer so the product layer can be simple
              </strong>
              . Whether that means a BullMQ pipeline with dead-letter recovery,
              a Netcode authority model that prevents client-side state drift,
              or a vector similarity engine that returns semantically relevant
              results in under 50ms.
            </p>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-10">
            <InfoBlock
              label="Education"
              value="MS Computer Science"
              sub="Northeastern University · 4.0 GPA"
            />
            <InfoBlock
              label="Experience"
              value="6+ years production engineering"
              sub="Backend · Infra · DevOps · ML pipelines"
            />
            <div>
              <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-white/35">
                Certification
              </div>
              <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
                <span className="text-sm text-white">◆</span>
                <span className="text-xs font-semibold text-white/85">
                  AWS Solutions Architect – Associate
                </span>
              </div>
            </div>
            <InfoBlock
              label="Current focus"
              value="Applied ML · VR Systems · Distributed Architecture"
              sub="Bridging ML research and production engineering"
            />

            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
              {HERO_MARKERS.map((m) => (
                <div key={m.label}>
                  <div className="text-2xl font-extrabold tracking-tight text-white">
                    {m.value}
                  </div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Skill clusters */}
        <section className="mt-32">
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/40">
            Capabilities
          </p>
          <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            The stack I build with.
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_CLUSTERS.map((c) => (
              <article
                key={c.id}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg text-white">{c.icon}</span>
                  <h3 className="text-base font-medium text-white">{c.name}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {c.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {c.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-white/55"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Direction */}
        <section className="mt-32">
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/40">
            Direction
          </p>
          <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Where I&rsquo;m headed.
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {INTEREST_PILLARS.map((p) => (
              <article
                key={p.label}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <span className="text-2xl text-white">{p.icon}</span>
                <div>
                  <h3 className="text-base font-medium text-white">{p.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">
                    {p.sub}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

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

function InfoBlock({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div>
      <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-white/35">
        {label}
      </div>
      <div className="text-[15px] font-semibold leading-snug text-white">
        {value}
      </div>
      <div className="mt-1 text-xs text-white/40">{sub}</div>
    </div>
  );
}
