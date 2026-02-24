// app/components/FacebookFeed.tsx
import Image from "next/image";
import { getFacebookPosts } from "@/app/lib/facebook";

export default async function FacebookFeed({ limit = 6 }: { limit?: number }) {
  const posts = await getFacebookPosts(limit);

  if (!posts.length) {
    return (
      <div className="rounded-2xl bg-white p-4 text-sm text-black/70">
        No Facebook posts available right now.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((p) => (
        <a
          key={p.id}
          href={p.permalink_url}
          target="_blank"
          rel="noreferrer"
          className="block overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
        >
          {p.full_picture ? (
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={p.full_picture}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 600px"
              />
            </div>
          ) : null}

          <div className="p-4">
            <div className="text-sm text-black/80 whitespace-pre-wrap">
              {(p.message ?? "").trim() || "View post"}
            </div>
            {p.created_time ? (
              <div className="mt-2 text-xs text-black/50">
                {new Date(p.created_time).toLocaleDateString()}
              </div>
            ) : null}
          </div>
        </a>
      ))}
    </div>
  );
}