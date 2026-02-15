import ImageCarousel from "@/app/components/ImageCarousel";
import PostCard from "@/app/components/PostCard";
import ExploreTiles from "@/app/components/ExploreTiles";
import PlanVisit from "@/app/components/PlanYourVisit";
import Image from "next/image";

import { getPosts, getCategoryBySlug, getPostBySlug } from "@/app/lib/wp";
import { extractAllImageUrlsFromRenderedHtml } from "@/app/lib/wpGalleryUrls";
import { extractJsonFromWpHtml, asNumber } from "@/app/lib/wpjson";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Logo
  const profilePic = await getPostBySlug("profile-picture");
  const logoUrl =
    (profilePic as any)?.jetpack_featured_media_url ??
    (profilePic as any)?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    null;

  // Slider post (single post with Gallery block)
  const sliderPost = await getPostBySlug("homepage-slider");
  const sliderHtml = (sliderPost as any)?.content?.rendered?.trim() || "";
  const sliderConfig = extractJsonFromWpHtml(sliderHtml) ?? {};
  const sliderIntervalMs = asNumber(sliderConfig.intervalMs) ?? 7000;

  const sliderUrls = extractAllImageUrlsFromRenderedHtml(sliderHtml);
  const sliderItems = sliderUrls.map((src, i) => ({
    id: i + 1,
    src,
    alt: `Homepage slide ${i + 1}`,
  }));

  // Only allow Latest Updates from these categories
  const [newsCat, exhibitsCat, eventsCat] = await Promise.all([
    getCategoryBySlug("news"),
    getCategoryBySlug("exhibits"),
    getCategoryBySlug("events"),
  ]);

   console.log("HOME newsCat:", newsCat);
  console.log("HOME exhibitsCat:", exhibitsCat);
  console.log("HOME eventsCat:", eventsCat);

  const allowedCatIds = [newsCat?.id, exhibitsCat?.id, eventsCat?.id].filter(
    (n): n is number => typeof n === "number"
  );

  const latest =
    allowedCatIds.length > 0
      ? await getPosts({
          per_page: 6,
          categories: allowedCatIds, // only News/Exhibits/Events
          ...(profilePic?.id ? { exclude: profilePic.id } : {}),
        })
      : [];

  // Debug (terminal)
  console.log("HOMEPAGE sliderUrls:", sliderUrls);
  console.log("HOMEPAGE sliderIntervalMs:", sliderIntervalMs);
  console.log("HOMEPAGE allowedCatIds:", allowedCatIds);

  return (
    <main>
      <section className="bg-[#f2f6e9]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-18 flex flex-col items-center">
          <div className="max-w-3xl text-center">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="NL Pharmacy Museum"
                width={120}
                height={120}
                className="h-30 w-30 rounded-full object-contain bg-white mx-auto"
                priority
              />
            ) : (
              <div className="mx-auto h-9 w-9 rounded-full bg-black/10" />
            )}

            <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight text-black">
              Newfoundland & Labrador Pharmacy Museum
            </h1>
            <p className="mt-5 mx-auto max-w-2xl text-base md:text-lg text-black/70 leading-relaxed">
              Explore the objects, stories, and people behind pharmacy and health care
              in Newfoundland and Labrador.
            </p>
          </div>

          {sliderItems.length > 0 && (
            <div className="mx-auto w-full max-w-5xl">
              <ImageCarousel items={sliderItems} intervalMs={sliderIntervalMs} />
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#eaf0db]">
        <div className="mx-20 max-w-8xl px-4 pt-16 pb-10">
          <h2 className="text-2xl text-black font-semibold">Latest Updates</h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.slice(0, 3).map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>

        <ExploreTiles />
        <PlanVisit />
      </section>
    </main>
  );
}
