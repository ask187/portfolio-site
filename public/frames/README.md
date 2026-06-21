# Frame sequence

Drop your exported WebP frames into this folder.

## Naming convention

```
frame_0001.webp
frame_0002.webp
frame_0003.webp
...
frame_0120.webp
```

- 4-digit zero-padded index (e.g. `0001`, `0042`, `0120`).
- Lowercase `.webp` extension.
- Prefix is `frame_` by default.

The defaults in `HeroSection.tsx` expect **120 frames** named exactly as above.
To change any of this, edit the `<ScrollImageSequence>` props in
`src/components/HeroSection.tsx`:

```tsx
<ScrollImageSequence
  frameCount={120}
  imagePath="/frames"
  fileExtension="webp"
  startFrame={1}
  filePrefix="frame_"
  pad={4}
  scrollLength="+=350%"
/>
```

## Exporting frames

A typical pipeline:

1. Render your animation (After Effects, Blender, Cinema 4D, etc.) at the
   target resolution — `1920x1080` is a good default; render `2560x1440` if
   you want crisp 4K-ish output.
2. Export as a PNG sequence, then batch convert to WebP:
   ```bash
   # macOS / linux with cwebp installed
   for f in *.png; do
     cwebp -q 80 "$f" -o "${f%.png}.webp"
   done
   ```
   Or use ffmpeg directly:
   ```bash
   ffmpeg -i frame_%04d.png -c:v libwebp -quality 80 frame_%04d.webp
   ```
3. Aim for ~80 quality. Keep each frame under ~80 KB if possible.
4. Drop the resulting `frame_0001.webp ... frame_NNNN.webp` files in this folder.

## Performance notes

- Lower the frame count if you target slow networks (60 frames still feels great).
- WebP > PNG. Avoid JPEG unless your animation is photographic.
- For very long sequences (300+ frames), consider splitting the animation
  into multiple `ScrollImageSequence` blocks so each one preloads independently.

## What happens before frames are added?

The component gracefully falls back to a dark radial-gradient background and
shows a "Loading sequence" indicator. If a frame 404s, the canvas paints the
gradient for that frame instead of crashing.
