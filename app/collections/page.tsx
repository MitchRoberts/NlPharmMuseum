// app/collections/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";

import { getPostBySlug } from "@/app/lib/wp";
import PageShell from "@/app/components/PageShell";
import HeroBanner from "@/app/components/HeroBanner";
import { extractAllImageUrlsFromRenderedHtml } from "@/app/lib/wpGalleryUrls";
import {
  extractJsonFromWpHtml,
  asString,
  asStringArray,
  asNumber,
} from "@/app/lib/wpjson";

export const dynamic = "force-dynamic";

type CollectionItem = {
  title: string;
  description: string[];
  imageIndex?: number; // 1-based
  alt?: string;
  href?: string; // optional for later
};

type CollectionsData = {
  heroTitle?: string;
  heroImageIndex?: number;
  intro?: string[];
  collections?: CollectionItem[];
};

function buildCollectionsData(renderedHtml: string): CollectionsData | null {
  const obj = extractJsonFromWpHtml(renderedHtml);
  if (!obj || typeof obj !== "object") return null;

  const raw = Array.isArray((obj as any).collections) ? (obj as any).collections : [];

  const collections: CollectionItem[] = raw
    .map((c: any) => ({
      title: typeof c?.title === "string" ? c.title : "",
      description: asStringArray(c?.description) ?? [],
      imageIndex: asNumber(c?.imageIndex),
      alt: asString(c?.alt),
      href: asString(c?.href),
    }))
    .filter((c: CollectionItem) => c.title && c.description.length);

  return {
    heroTitle: asString((obj as any).heroTitle),
    heroImageIndex: asNumber((obj as any).heroImageIndex), // ✅ new
    intro: asStringArray((obj as any).intro),
    collections: collections.length ? collections : undefined,
  };
}

function CollectionCard({
  title,
  description,
  imageUrl,
  alt,
}: {
  title: string;
  description: string[];
  imageUrl?: string | null;
  alt?: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white/60 backdrop-blur ring-1 ring-black/10 shadow-sm hover:shadow-md transition">
      <div className="relative w-full aspect-[16/10] bg-white">
  {imageUrl ? (
    <Image
      src={imageUrl}
      alt={alt || title}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-contain p-3"
    />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-black/40">
            No image
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-black">
          {title}
        </h3>

        <div className="mt-3 space-y-3 text-sm leading-relaxed text-black/70">
          {description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function CollectionsPage() {
  const post = await getPostBySlug("collections");
  if (!post) return notFound();

  const contentHtml = (post as any)?.content?.rendered?.trim() || "";
  const excerptHtml = (post as any)?.excerpt?.rendered?.trim() || "";

  const data =
    buildCollectionsData(contentHtml) ?? buildCollectionsData(excerptHtml) ?? {};

  const contentImages = extractAllImageUrlsFromRenderedHtml(contentHtml);

  const heroIdx = Math.max(0, (data.heroImageIndex ?? 1) - 1);

  const heroUrl =
    contentImages[heroIdx] ??
    contentImages[0] ??
    (post as any)?.jetpack_featured_media_url ??
    (post as any)?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    null;

  const heroTitle = data.heroTitle || "Collections";
  const intro = data.intro?.length ? data.intro : [];
  const collections = data.collections?.length ? data.collections : [];

  return (
    <div className="bg-[#f2f6e9]">
      <HeroBanner title={heroTitle.toUpperCase()} imageUrl={heroUrl} />

      <PageShell className="py-10 md:py-14">
        <div>
          <h2 className="text-[#7a1630] text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
            {heroTitle}
          </h2>

          {intro.length > 0 && (
            <div className="mt-5 space-y-3 text-black/75 leading-relaxed text-base sm:text-lg max-w-3xl">
              {intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {collections.map((c, i) => {
            const idx = Math.max(0, (c.imageIndex ?? i + 1) - 1);
            const imageUrl = contentImages[idx] ?? null;

            return (
              <div key={`${c.title}-${i}`} className="mb-5 break-inside-avoid">
                <CollectionCard
                  title={c.title}
                  description={c.description}
                  imageUrl={imageUrl}
                  alt={c.alt}
                />
              </div>
            );
          })}
        </div>
      </PageShell>
    </div>
  );
}