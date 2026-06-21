# Portfolio — Built for motion.

A cinematic, Apple-style portfolio landing page built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP ScrollTrigger**, **Lenis** smooth scrolling, and a scroll-controlled HTML canvas image sequence.

## Quick start

```bash
# 1. install
npm install

# 2. run dev server
npm run dev

# 3. open
# http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve production build
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

## What you get

- Cinematic hero with **scroll-controlled canvas image sequence**
- Smooth scrolling via **Lenis**, bridged to **GSAP ScrollTrigger**
- Pinned story section with crossfading text panels
- Feature cards with reveal-on-scroll
- Final CTA with hover-animated button
- Subtle animated navbar with backdrop blur on scroll
- Top-of-page scroll progress bar
- Sub-pages: `/work`, `/about`, `/contact`
- Respects `prefers-reduced-motion` (static fallback, no scrub)
- WebP-first, DPR-clamped canvas, no React re-renders during scroll

## Project structure

```
src/
  app/
    layout.tsx              # Root layout: providers, navbar, progress bar
    page.tsx                # Landing page composition
    globals.css             # Tailwind layers + Lenis helpers
    work/page.tsx           # /work
    about/page.tsx          # /about
    contact/page.tsx        # /contact
  components/
    SmoothScrollProvider.tsx # Lenis init + GSAP bridge
    Navbar.tsx
    ScrollProgress.tsx
    ScrollImageSequence.tsx  # The reusable canvas scrub component
    HeroSection.tsx
    FeatureSection.tsx
    PinnedStorySection.tsx
    CTASection.tsx
  lib/
    gsap.ts                  # Single ScrollTrigger registration
    imageSequence.ts         # Path builder, preloader, cover-draw helper

public/
  frames/
    README.md                # How to add frames
    frame_0001.webp          # <-- you add these
    ...
```

## Adding your frame sequence

See `public/frames/README.md` for the full export pipeline. TL;DR:

1. Export your animation as a PNG sequence.
2. Convert to WebP (`cwebp -q 80 ...` or `ffmpeg -c:v libwebp -quality 80 ...`).
3. Name them `frame_0001.webp ... frame_NNNN.webp`.
4. Drop them into `/public/frames/`.
5. Update `frameCount` in `src/components/HeroSection.tsx` if it&rsquo;s not 120.

If frames are missing, the canvas gracefully falls back to a dark gradient — the rest of the page still works.

## Customizing the hero scrub

`HeroSection.tsx` configures the sequence:

```tsx
<ScrollImageSequence
  frameCount={120}        // how many frames you have
  imagePath="/frames"     // folder under /public
  fileExtension="webp"    // "webp" | "png" | "jpg" | ...
  startFrame={1}          // first frame index (1 → frame_0001)
  filePrefix="frame_"     // filename prefix before the padded index
  pad={4}                 // zero-pad width (4 → 0001)
  scrollLength="+=350%"   // scrub distance — bigger = longer pin
/>
```

Tweak `scrollLength` to control how much scrolling the sequence consumes.

## Accessibility

- All decorative canvases are `aria-hidden`.
- Reduced motion: scrub is disabled, a single static frame is shown.
- Keyboard scroll continues to work — Lenis virtualizes wheel/touch, not focus.

## Tech versions

- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3
- GSAP 3.12 + ScrollTrigger
- Lenis 1.0
