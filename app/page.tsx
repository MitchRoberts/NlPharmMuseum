import { getPosts } from "@/app/lib/wp";
import PostCard from "@/app/components/PostCard";

export default async function Home() {
  const latest = await getPosts({ per_page: 6 });

  return (
    <main>
      {/* HERO */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Newfoundland Pharmacy Museum
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            Exploring the history of pharmacy, medicine, and care in
            Newfoundland and Labrador.
          </p>
        </div>
      </section>

      {/* LATEST UPDATES */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold">Latest Updates</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
