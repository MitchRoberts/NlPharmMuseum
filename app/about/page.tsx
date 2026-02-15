// app/about/page.tsx
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/lib/wp";
import PageShell from "@/app/components/PageShell";
import HeroBanner from "@/app/components/HeroBanner";
import CoreValueRibbon from "@/app/components/about/CoreValueRibbon";
import { extractAllImageUrlsFromRenderedHtml } from "@/app/lib/wpGalleryUrls";
import { extractJsonFromWpHtml, asString, asStringArray } from "@/app/lib/wpjson";

export const dynamic = "force-dynamic";

type CoreValue = {
  title: string;
  text: string;
  imageIndex?: number; // 1-based
};

type AboutData = {
  heroTitle?: string;
  intro?: string[];
  mission?: string;

  coreValuesTitle?: string;
  coreValues?: CoreValue[];

  historyTitle?: string;
  history?: string[];
};

function buildAboutData(renderedHtml: string): AboutData | null {
  const obj = extractJsonFromWpHtml(renderedHtml);
  if (!obj || typeof obj !== "object") return null;

  const coreValuesRaw = Array.isArray((obj as any).coreValues)
    ? (obj as any).coreValues
    : [];

  const coreValues: CoreValue[] = coreValuesRaw
    .map((v: any) => ({
      title: typeof v?.title === "string" ? v.title : "",
      text: typeof v?.text === "string" ? v.text : "",
      imageIndex: typeof v?.imageIndex === "number" ? v.imageIndex : Number(v?.imageIndex),
    }))
    .filter((v: CoreValue) => v.title && v.text);

  return {
    heroTitle: asString((obj as any).heroTitle),
    intro: asStringArray((obj as any).intro),
    mission: asString((obj as any).mission),

    coreValuesTitle: asString((obj as any).coreValuesTitle),
    coreValues: coreValues.length ? coreValues : undefined,

    historyTitle: asString((obj as any).historyTitle),
    history: asStringArray((obj as any).history),
  };
}

export default async function AboutPage() {
  const aboutPost = await getPostBySlug("about");
  if (!aboutPost) return notFound();

  const contentHtml = (aboutPost as any)?.content?.rendered?.trim() || "";
  const excerptHtml = (aboutPost as any)?.excerpt?.rendered?.trim() || "";

  const data =
    buildAboutData(contentHtml) ??
    buildAboutData(excerptHtml) ??
    {};

  // All images found in content (gallery, img tags, srcset, etc.)
  const contentImages = extractAllImageUrlsFromRenderedHtml(contentHtml);

  // hero uses first image if present, else featured
  const heroUrl =
    contentImages[0] ??
    (aboutPost as any)?.jetpack_featured_media_url ??
    (aboutPost as any)?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    null;

  // neat defaults (only if WP JSON missing)
  const heroTitle = data.heroTitle || "About";
  const intro =
    data.intro?.length
      ? data.intro
      : [
          "The Newfoundland and Labrador Pharmacy Museum is located in Apothecary Hall, a heritage building constructed in 1922. It features Art Deco and Art Nouveau styles and has retained its original maple flooring and tin pressed ceilings.",
          "In the museum you will discover both in-house and commercial pharmaceuticals from the past 100+ years, mortars and pestles, scales and tablet presses, perfumes and cosmetics, and two ornate show globes from the early 1900’s.",
        ];

  const mission =
    data.mission ||
    "Our mission is to preserve and share the history of evolution of trusted pharmacy practice as it was experienced in Newfoundland and Labrador.";

  const coreValuesTitle = data.coreValuesTitle || "Our Core Values";
  const coreValues: CoreValue[] =
    data.coreValues?.length
      ? data.coreValues
      : [
          { title: "Honour", text: "We honour pharmacy practice by offering a glimpse into how pharmacy care advanced through the years.", imageIndex: 1 },
          { title: "Preserve", text: "We take great pride in preserving and displaying the treasured pharmacy antiques and artifacts that have stood the test of time.", imageIndex: 2 },
          { title: "Trust", text: "We tell the story through our collections of how pharmacy professionals came to be trusted community members.", imageIndex: 3 },
        ];

  const historyTitle = data.historyTitle || "History of the Building";
  const history = data.history?.length ? data.history : [];

  // debug (server terminal)
  console.log("ABOUT contentImages:", contentImages);
  console.log("ABOUT coreValues:", coreValues);

  return (
    <div className="bg-[#f2f6e9]">
      <HeroBanner title={heroTitle.toUpperCase()} imageUrl={heroUrl} />

      <PageShell className="py-10 md:py-14">
        {/* Intro + Mission */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-[#7a1630] text-5xl sm:text-6xl font-light tracking-tight">
              {heroTitle}
            </h2>

            <div className="mt-6 space-y-4 text-black/75 leading-relaxed text-base sm:text-lg">
              {intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white/60 ring-1 ring-black/5 p-6 sm:p-8">
            <p className="text-sm font-semibold text-black">Mission</p>
            <p className="mt-3 text-black/75 leading-relaxed text-base sm:text-lg">
              {mission}
            </p>
          </div>
        </div>

        {/* Core Values (ribbons) */}
        <div className="mt-14">
          <h3 className="text-[#7a1630] text-3xl sm:text-4xl font-light tracking-tight">
            {coreValuesTitle}
          </h3>

          <div className="mt-6 space-y-6">
            {coreValues.map((v, i) => {
              const side = i % 2 === 0 ? "left" : "right";
              const idx = Math.max(0, (v.imageIndex ?? (i + 1)) - 1);
              const imageUrl = contentImages[idx] ?? null;

              return (
                <CoreValueRibbon
                  key={`${v.title}-${i}`}
                  side={side}
                  title={v.title}
                  text={v.text}
                  imageUrl={imageUrl}
                />
              );
            })}
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-14">
            <h3 className="text-[#7a1630] text-3xl sm:text-4xl font-light tracking-tight">
              {historyTitle}
            </h3>

            <div className="mt-6 rounded-3xl bg-white/60 ring-1 ring-black/5 p-6 sm:p-8">
              <div className="space-y-4 text-black/75 leading-relaxed text-base sm:text-lg">
                {history.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </PageShell>
    </div>
  );
}
