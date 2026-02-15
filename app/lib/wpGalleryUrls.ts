// app/lib/wpGalleryUrls.ts
export function extractAllImageUrlsFromRenderedHtml(html: string): string[] {
  if (!html) return [];

  const urls: string[] = [];
  let m: RegExpExecArray | null;

  // <img src="...">
  const imgSrcRe = /<img[^>]+src="([^"]+)"/gi;
  while ((m = imgSrcRe.exec(html))) urls.push(m[1]);

  // common lazy attrs
  const lazyRe =
    /(data-lazy-src|data-src|data-original|data-large-file|data-orig-file)="([^"]+)"/gi;
  while ((m = lazyRe.exec(html))) urls.push(m[2]);

  // srcset URLs
  const srcsetRe = /srcset="([^"]+)"/gi;
  while ((m = srcsetRe.exec(html))) {
    const parts = m[1]
      .split(",")
      .map((s) => s.trim().split(" ")[0])
      .filter(Boolean);
    urls.push(...parts);
  }

  // links to image files
  const hrefImgRe = /href="([^"]+\.(?:png|jpe?g|webp|gif))"/gi;
  while ((m = hrefImgRe.exec(html))) urls.push(m[1]);

  // background-image:url(...)
  const bgRe = /background-image\s*:\s*url\((['"]?)([^'")]+)\1\)/gi;
  while ((m = bgRe.exec(html))) urls.push(m[2]);

  // normalize + dedupe
  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of urls) {
    const clean = (u || "").split("?")[0].trim();
    if (!clean) continue;
    if (!seen.has(clean)) {
      seen.add(clean);
      out.push(clean);
    }
  }
  return out;
}
