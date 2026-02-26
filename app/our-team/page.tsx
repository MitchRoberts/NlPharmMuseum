// app/team/page.tsx
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/lib/wp";
import PageShell from "@/app/components/PageShell";
import TwoCol from "@/app/components/TwoCol";
import HeroBanner from "@/app/components/HeroBanner";
import { extractAllImageUrlsFromRenderedHtml } from "@/app/lib/wpGalleryUrls";
import { extractJsonFromWpHtml, asString, asStringArray, asNumber } from "@/app/lib/wpjson";

export const dynamic = "force-dynamic";

type TeamData = {
  heroTitle?: string;
  heroGalleryIndex?: number;
  heroObjectPosition?: string;

  leftTitle?: string;
  leftLines?: string[];

  rightTitle?: string;
  rightLines?: string[];
};

function buildTeamData(renderedHtml: string): TeamData | null {
  const obj = extractJsonFromWpHtml(renderedHtml);
  if (!obj || typeof obj !== "object") return null;

  const leftLines =
    asStringArray((obj as any).leftLines) ??
    asStringArray((obj as any).boardLines) ??
    asStringArray((obj as any).board);

  const rightLines =
    asStringArray((obj as any).rightLines) ??
    asStringArray((obj as any).staffLines) ??
    asStringArray((obj as any).staff);

  return {
    heroTitle: asString((obj as any).heroTitle),
    heroGalleryIndex: asNumber((obj as any).heroGalleryIndex),
    heroObjectPosition: asString((obj as any).heroObjectPosition),

    leftTitle: asString((obj as any).leftTitle) ?? asString((obj as any).boardTitle),
    leftLines,

    rightTitle: asString((obj as any).rightTitle) ?? asString((obj as any).staffTitle),
    rightLines,
  };
}

export default async function TeamPage() {
  const post = await getPostBySlug("our-team");
  if (!post) return notFound();

  const contentHtml = (post as any)?.content?.rendered?.trim() || "";
  const excerptHtml = (post as any)?.excerpt?.rendered?.trim() || "";

  const data = buildTeamData(contentHtml) ?? buildTeamData(excerptHtml) ?? {};

  // all image URLs found in the WP content (gallery/img/srcset/etc.)
  const contentImages = extractAllImageUrlsFromRenderedHtml(contentHtml);

  // hero image selection by 1-based index from JSON
  const oneBased = data.heroGalleryIndex ?? 1;
  const idx = Math.max(0, oneBased - 1);

  const heroUrl =
    contentImages[idx] ??
    (post as any)?.jetpack_featured_media_url ??
    (post as any)?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    null;

  const heroTitle = data.heroTitle || "Our Team";

  const leftTitle = data.leftTitle || "Board of Directors";
  const leftLines = data.leftLines?.length ? data.leftLines : [];

  const rightTitle = data.rightTitle || "Staff and Volunteers";
  const rightLines = data.rightLines?.length ? data.rightLines : [];

  return (
    <div className="bg-[#f2f6e9]">
      <HeroBanner title={heroTitle.toUpperCase()} imageUrl={heroUrl} objectPosition={data.heroObjectPosition ?? "50% 50%"} />

      <PageShell className="py-10 md:py-14">
        <p className="my-5 text-black/70 leading-relaxed">
          The Newfoundland and Labrador Pharmacy Museum is operated by a small group of
          volunteers dedicated to preserving and sharing the history and evolution of
          trusted pharmacy practice in Newfoundland and Labrador.
        </p>
        <TwoCol
          left={
            <section>
              <h2 className="text-[#7a1630] text-5xl sm:text-6xl font-light tracking-tight">
                {leftTitle}
              </h2>

              {leftLines.length > 0 && (
                <ul className="mt-6 space-y-3 text-black/75 text-base sm:text-lg">
                  {leftLines.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </section>
          }
          right={
            <section>
              <h2 className="text-[#7a1630] text-5xl sm:text-6xl font-light tracking-tight">
                {rightTitle}
              </h2>

              {rightLines.length > 0 && (
                <ul className="mt-6 space-y-3 text-black/75 text-base sm:text-lg">
                  {rightLines.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </section>
          }
        />
      </PageShell>
    </div>
  );
}