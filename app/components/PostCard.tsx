import Link from "next/link";
import Image from "next/image";
import { WPPost, stripHtml, getPostImageUrl } from "@/app/lib/wp";

export default function PostCard({ post }: { post: WPPost }) {
  const img = getPostImageUrl(post);
  const href = `/posts/${post.slug}`;

  return (
    <Link
      href={href}
      className="group block rounded-xl overflow-hidden bg-white hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-black/30"
      aria-label={`Read: ${stripHtml(post.title.rendered)}`}
    >
      {img && (
        <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
          <Image
            src={img}
            alt={stripHtml(post.title.rendered)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform"
            priority={false}
          />
        </div>
      )}

      <div className="p-4 hover:shadow-md">
        <h3 className="font-semibold text-black leading-snug">
          {stripHtml(post.title.rendered)}
        </h3>

        <p className="mt-2 text-sm text-black/70 line-clamp-3">
          {stripHtml(post.excerpt.rendered)}
        </p>

        <p className="mt-3 text-sm text-black/80 font-medium underline">
          Click to Read more
        </p>
      </div>
    </Link>
  );
}
