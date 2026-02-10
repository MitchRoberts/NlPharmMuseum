import Link from "next/link";
import { WPPost, stripHtml, getPostImageUrl } from "@/app/lib/wp";

export default function PostCard({ post }: { post: WPPost }) {
  const img = getPostImageUrl(post);

  return (
    <article className="group rounded-xl overflow-hidden border bg-white hover:shadow-md transition">
      {img && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={img}
            alt={stripHtml(post.title.rendered)}
            className="h-full w-full object-cover group-hover:scale-105 transition"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="font-semibold leading-snug">
          {stripHtml(post.title.rendered)}
        </h3>

        <p className="mt-2 text-sm text-black/70 line-clamp-3">
          {stripHtml(post.excerpt.rendered)}
        </p>

        <Link
          href={`/posts/${post.slug}`}
          className="inline-block mt-3 text-sm font-medium underline"
        >
          Read more
        </Link>
      </div>
    </article>
  );
}
