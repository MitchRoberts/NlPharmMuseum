// app/lib/wpJson.ts

export function stripTags(html: string) {
  return (html || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function decodeEntities(s: string) {
  let out = (s || "").trim();
  for (let i = 0; i < 3; i++) {
    const next = out
      .replace(/&quot;/g, '"')
      .replace(/&#34;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#8220;|&#8221;/g, '"')
      .replace(/&#8216;|&#8217;/g, "'")
      .trim();
    if (next === out) break;
    out = next;
  }
  return out;
}

export function extractFirstJsonObjectFromText(text: string): any | null {
  const s = text || "";
  const start = s.indexOf("{");
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < s.length; i++) {
    const ch = s[i];

    if (inString) {
      if (escape) escape = false;
      else if (ch === "\\") escape = true;
      else if (ch === '"') inString = false;
      continue;
    }

    if (ch === '"') inString = true;

    if (ch === "{") depth++;
    if (ch === "}") depth--;

    if (depth === 0) {
      const candidate = s.slice(start, i + 1);
      try {
        return JSON.parse(candidate);
      } catch {
        return null;
      }
    }
  }

  return null;
}

export function extractJsonFromWpHtml(html: string): any | null {
  const decoded = decodeEntities(html);
  let obj = extractFirstJsonObjectFromText(decoded);
  if (obj) return obj;

  const text = decodeEntities(stripTags(html));
  obj = extractFirstJsonObjectFromText(text);
  return obj;
}

export function asString(v: any): string | undefined {
  return typeof v === "string" ? v : undefined;
}

export function asStringArray(v: any): string[] | undefined {
  if (Array.isArray(v)) return v.filter((x) => typeof x === "string");
  if (typeof v === "string") {
    const parts = v
      .split(/\r?\n|\|/)
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.length ? parts : undefined;
  }
  return undefined;
}

export function asNumber(v: any): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

export function getGalleryImagesFromPost(post: any): string[] {
  const attachments = post?._embedded?.["wp:attachment"];
  if (!Array.isArray(attachments)) return [];

  // Pick best available image URL
  const urls = attachments
    .map((a: any) => a?.source_url)
    .filter((u: any) => typeof u === "string");

  // Remove duplicates
  return Array.from(new Set(urls));
}

