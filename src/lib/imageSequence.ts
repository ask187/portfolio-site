/**
 * Build a frame path: e.g. ("/frames", "frame_", 4, "webp", 12) -> "/frames/frame_0012.webp"
 */
export function buildFramePath(
  basePath: string,
  prefix: string,
  pad: number,
  extension: string,
  index: number
): string {
  const trimmedBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  const cleanedExt = extension.startsWith(".") ? extension.slice(1) : extension;
  const padded = String(index).padStart(pad, "0");
  return `${trimmedBase}/${prefix}${padded}.${cleanedExt}`;
}

export interface PreloadResult {
  images: HTMLImageElement[];
  failed: number[];
}

/**
 * Preload all frames in parallel. Resolves once each image has either
 * loaded or errored. Failed frames are tracked but do not reject the promise.
 */
export function preloadFrames(urls: string[]): Promise<PreloadResult> {
  const images: HTMLImageElement[] = new Array(urls.length);
  const failed: number[] = [];

  const tasks = urls.map(
    (url, i) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          images[i] = img;
          resolve();
        };
        img.onerror = () => {
          failed.push(i);
          images[i] = img; // keep placeholder so indices stay aligned
          resolve();
        };
        img.src = url;
      })
  );

  return Promise.all(tasks).then(() => ({ images, failed }));
}

/**
 * Draws an image into a canvas context using object-fit: cover semantics.
 * Centers the image, crops overflow, never distorts.
 */
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  targetW: number,
  targetH: number
): void {
  if (!img || !img.naturalWidth || !img.naturalHeight) return;

  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const ir = iw / ih;
  const tr = targetW / targetH;

  let dw: number;
  let dh: number;

  if (tr > ir) {
    // target is wider than image -> match width, overflow vertically
    dw = targetW;
    dh = targetW / ir;
  } else {
    dh = targetH;
    dw = targetH * ir;
  }

  const dx = (targetW - dw) / 2;
  const dy = (targetH - dh) / 2;

  ctx.clearRect(0, 0, targetW, targetH);
  ctx.drawImage(img, dx, dy, dw, dh);
}
