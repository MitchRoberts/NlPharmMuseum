// app/collections/page.tsx
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

import CollectionsMasonry, {
  CollectionItem,
} from "@/app/components/collections/CollectionsMasonry";

export const dynamic = "force-dynamic";

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
    heroImageIndex: asNumber((obj as any).heroImageIndex),
    intro: asStringArray((obj as any).intro),
    collections: collections.length ? collections : undefined,
  };
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

        <CollectionsMasonry items={collections} images={contentImages} />
      </PageShell>
    </div>
  );
}