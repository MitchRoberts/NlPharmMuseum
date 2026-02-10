import Link from "next/link";
import PostCard from "@/app/components/PostCard";
import { WPPost } from "@/app/lib/wp";

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <Link href={href} className="text-sm font-medium underline text-black/70">
        View all
      </Link>
    </div>
  );
}

export default function FeaturedRow({
  news,
  events,
  exhibits,
}: {
  news: WPPost[];
  events: WPPost[];
  exhibits: WPPost[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-12">
        <div>
          <SectionHeader title="News" href="/category/news" />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader title="Events" href="/category/events" />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader title="Exhibits" href="/category/exhibits" />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exhibits.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
