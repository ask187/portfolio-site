# Portfolio Site

Personal portfolio - built with Next.js 14 (App Router), TypeScript, Tailwind, GSAP, and Lenis. Dark-only, scroll-driven, single-source-of-truth content.

---

## What this is

A static-feeling marketing site with five routes:

- `/` — landing (hero, feature strip, project highlights, pinned story, CTA)
- `/work` — work history
- `/projects` — full project list (driven by `src/data/projects.json`)
- `/about` — bio, skills, philosophy
- `/contact` — contact info

Plus `/hero-demo` (an orphan route showcasing the unused scroll-canvas hero) and on-theme `not-found` / `error` pages.

---

## Tech stack

| Layer        | Choice                                      |
| ------------ | ------------------------------------------- |
| Framework    | Next.js 14.2 (App Router)                   |
| Language     | TypeScript 5 (strict)                       |
| Styling      | Tailwind 3.4, dark-only, `ink-950` base     |
| Animation    | GSAP 3.12 + ScrollTrigger, Framer Motion 12 |
| Smooth scroll| Lenis 1.0 (bridged to GSAP)                 |
| Icons        | lucide-react                                |

---

## Installation

**Prerequisites:** Node 18.17+ (Node 20 recommended), npm.


### Environment variables

Create a `.env.local` at the project root:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Used by `src/app/sitemap.ts`, `src/app/robots.ts`, and `metadataBase` in `src/app/layout.tsx`. Defaults to `https://aravindsk.dev` in production if unset.

---

## Running it

```bash
npm run dev        # start dev server on http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

---

## Project layout

```
portfolio-site/
├── public/
│   ├── ask-port.png             # landing hero portrait
│   └── frames/                  # WebP frames for scroll-canvas hero (see README inside)
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # root layout, fonts, metadata
│   │   ├── page.tsx             # landing page
│   │   ├── globals.css          # tailwind base + global styles
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── work/page.tsx
│   │   ├── hero-demo/page.tsx   # orphan demo route
│   │   ├── not-found.tsx        # 404 page
│   │   ├── error.tsx            # error boundary
│   │   ├── sitemap.ts           # generated /sitemap.xml
│   │   └── robots.ts            # generated /robots.txt
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx              # scroll-canvas hero (used on /hero-demo)
│   │   ├── FeatureSection.tsx
│   │   ├── HighlightProjectsSection.tsx # landing highlights grid (1×4 / 2×2 / 3×1)
│   │   ├── ProjectVisuals.tsx           # rings / tiles / waveform / clusters
│   │   ├── PinnedStorySection.tsx
│   │   ├── CTASection.tsx
│   │   ├── ScrollImageSequence.tsx      # canvas-driven frame player
│   │   ├── ScrollProgress.tsx
│   │   ├── SmoothScrollProvider.tsx     # Lenis ↔ GSAP bridge
│   │   └── ui/
│   │       ├── minimalist-hero.tsx      # landing hero (Framer Motion)
│   │       ├── minimalist-hero.demo.tsx # wires portrait + copy
│   │       └── brand-icons.tsx
│   │
│   ├── data/
│   │   ├── projects.json        # SINGLE SOURCE OF TRUTH for projects
│   │   └── content.ts           # PROFILE, EXPERIENCES, SKILLS, NAV, FOOTER + derives PROJECTS/HIGHLIGHTS
│   │
│   └── lib/
│       ├── gsap.ts              # GSAP + ScrollTrigger registration
│       ├── imageSequence.ts     # frame-loading helpers
│       └── utils.ts             # clsx/tailwind-merge `cn`
│
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

### Where what lives

| Want to change…             | Edit                                                                 |
| --------------------------- | -------------------------------------------------------------------- |
| Project list                | `src/data/projects.json`                                             |
| Bio, skills, work history   | `src/data/content.ts`                                                |
| Landing hero copy / image   | `src/components/ui/minimalist-hero.demo.tsx` + `public/ask-port.png` |
| Nav / footer links          | `src/data/content.ts` (`NAV_LINKS`, `FOOTER_LINKS`)                  |
| Global colors / fonts       | `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`    |
| Site URL (sitemap/robots)   | `NEXT_PUBLIC_SITE_URL` in `.env.local`                               |

---

## Adding a project

Edit `src/data/projects.json`. JSON order = render order on `/projects` AND on the landing highlights grid.

```json
{
  "id": "my-project",
  "category": "Systems",
  "year": "2025",
  "accentColor": "#a3e635",
  "name": "My Project",
  "problem": "What it solves.",
  "impacts": ["Outcome 1", "Outcome 2"],
  "architecture": "Short architecture note.",
  "techTags": ["Go", "Postgres"],
  "featured": true,
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://myproject.com",

  "landing": {
    "name": "My Project",
    "category": "Systems",
    "blurb": "One-line hook for the landing card.",
    "techTags": ["Go", "Postgres"],
    "visual": "rings"
  }
}
```

- `landing` is **optional**. Include it to surface the project on the landing page.
- `visual` must be one of `"rings" | "tiles" | "waveform" | "clusters"` (defined in `src/components/ProjectVisuals.tsx`).
- `liveUrl` and `githubUrl` are **optional-ish**: buttons only render when the value starts with `http`. Leave as `""` or `"#"` to hide the button on both the landing card hover overlay and the `/projects` row.
- On the landing page, the entire highlight card is a link to `/projects#{id}`. The Visit / GitHub buttons appear on hover.
- The landing grid shows up to 4 items on small screens and up to 3 on `lg+`. Items past index 2 get `lg:hidden` automatically — see `src/components/HighlightProjectsSection.tsx`.

---

## Notes / known gaps

- Most `githubUrl` fields in `projects.json` are `#` placeholders.
- `public/frames/` is empty (only its own README). The scroll-canvas hero falls back to a gradient — fine, since it's not on the landing path.
- No favicon, no OG image, no contact form backend, no tests, no CI.
