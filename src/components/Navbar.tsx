"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NAV_LINKS } from "@/data/content";

const links = NAV_LINKS;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  // On home, the MinimalistHero already shows a header at top — we slide the global navbar in
  // once the user scrolls past the hero. On other routes, it's visible from scroll 0.
  const [visible, setVisible] = useState(!isHome);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (isHome) {
        setVisible(y > window.innerHeight * 0.8);
      } else {
        setVisible(true);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  return (
    <header
      aria-hidden={!visible}
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-apple",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0",
        scrolled
          ? "backdrop-blur-xl bg-ink-950/60 border-b border-white/5"
          : "backdrop-blur-0 bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-white/90 hover:text-white transition"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            aravind.
          </span>
        </Link>
        <ul className="flex items-center gap-7 text-sm text-white/60">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="relative transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
