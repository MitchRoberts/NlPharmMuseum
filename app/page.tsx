import ImageCarousel from "@/app/components/ImageCarousel";
import PostCard from "@/app/components/PostCard";
import ExploreTiles from "@/app/components/ExploreTiles";
import PlanVisit from "@/app/components/PlanYourVisit";
import { getPosts, getPostsByCategorySlug, stripHtml, getCategoryBySlug } from "@/app/lib/wp";

export default async function Home() {
  const sliderCat = await getCategoryBySlug("homepage-slider");
  const sliderCatId = sliderCat?.id;

  const [latest, sliderPosts] = await Promise.all([
    getPosts({
      per_page: 6,
      ...(sliderCatId ? { categories_exclude: sliderCatId } : {}),
    }),
    getPostsByCategorySlug("homepage-slider", 10),
  ]);

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
      <section className="bg-[#faf8f1] border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-18 flex flex-col items-center">
          <div className="max-w-3xl text-center">
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

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold">Latest Updates</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>

      <ExploreTiles />
      <PlanVisit />
    </main>
  );
}
