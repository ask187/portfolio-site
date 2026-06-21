import Link from "next/link";
import { PROFILE, FOOTER_LINKS } from "@/data/content";

export const metadata = {
  title: "Contact — Aravind Santhosh Kumar",
  description: "Get in touch about roles, research, or collaborations.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-ink-950 px-6 pt-32 pb-40">
      <div className="mx-auto max-w-3xl">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/40">
          Contact
        </p>
        <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-tightest text-white sm:text-7xl">
          Let&rsquo;s talk systems.
        </h1>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-white/65">
          <p>
            Open to roles in applied ML, distributed systems, and real-time
            backend engineering. Internships, full-time, or research
            collaborations — happy to talk through what you&rsquo;re building.
          </p>
          <p>Fastest path is email. I usually reply within a day.</p>
        </div>

        <div className="mt-12">
          <a
            href={`mailto:${PROFILE.email}`}
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white px-7 py-3 text-sm font-medium text-ink-950 transition-all duration-500 ease-apple hover:gap-5"
          >
            <span>{PROFILE.email}</span>
            <span className="transition-transform duration-500 ease-apple group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 border-t border-white/5 pt-12 sm:grid-cols-2">
          <div>
            <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-white/35">
              Based in
            </div>
            <div className="text-base text-white/85">{PROFILE.location}</div>
            <div className="mt-1 text-sm text-white/45">
              Northeastern University · MS Computer Science
            </div>
          </div>
          <div>
            <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-white/35">
              Elsewhere
            </div>
            <ul className="space-y-2">
              {FOOTER_LINKS.filter((l) => l.label !== "Email").map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      l.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-base text-white/85 transition-colors hover:text-white"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
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
