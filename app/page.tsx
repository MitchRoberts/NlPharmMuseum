import ImageCarousel from "@/app/components/ImageCarousel";
import PostCard from "@/app/components/PostCard";
import ExploreTiles from "@/app/components/ExploreTiles";
import PlanVisit from "@/app/components/PlanYourVisit";
import { getPosts, getPostsByCategorySlug, stripHtml, getCategoryBySlug, getPostBySlug } from "@/app/lib/wp";
import Image from "next/image";

export default async function Home() {
  const sliderCat = await getCategoryBySlug("homepage-slider");
  const profileCat = await getCategoryBySlug("profile-picture");
  const teamCat = await getCategoryBySlug("team");
  const profilePic = await getPostBySlug("profile-picture");
  const sliderCatId = sliderCat?.id;
  const teamCatId = teamCat?.id;
  const logoUrl = (profilePic as any)?.jetpack_featured_media_url ?? (profilePic as any)?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  const excludeCats: number[] = [];
  if (sliderCatId) excludeCats.push(sliderCatId);
  if (teamCatId) excludeCats.push(teamCatId);

  const [latest, sliderPosts] = await Promise.all([
    getPosts({
      per_page: 6,
      ...(excludeCats.length ? { categories_exclude: excludeCats } : {}),
      ...(profilePic?.id ? { exclude: profilePic.id } : {}),
    }),
    getPostsByCategorySlug("homepage-slider", 10),
  ]);

  const sliderIds = new Set(sliderPosts.map(p => p.id));
  const filteredLatest = latest.filter(p => !sliderIds.has(p.id));



  const sliderItems = sliderPosts
    .map((p) => {
      const media = (p as any)?._embedded?.["wp:featuredmedia"]?.[0];
      const src = media?.source_url as string | undefined;
      const width = media?.media_details?.width as number | undefined;
      const height = media?.media_details?.height as number | undefined;

      if (!src || !width || !height) return null;

      return {
        id: p.id,
        src,
        width,
        height,
        alt: stripHtml(p.title.rendered) || "Museum image",
      };
    })
    .filter(Boolean) as any[];

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
              <ImageCarousel items={sliderItems} intervalMs={7000} />
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#eaf0db]">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-10">
          <h2 className="text-2xl text-black font-semibold">Latest Updates</h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLatest.slice(0, 3).map((p) => (
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
