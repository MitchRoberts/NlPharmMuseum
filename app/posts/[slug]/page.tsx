import { getPostBySlug, stripHtml } from "@/app/lib/wp";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 bg-[#f2f6e9]">
      <p className="text-sm text-black/60">
        {new Date(post.date).toLocaleDateString()}
      </p>

      <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-black">
        {stripHtml(post.title.rendered)}
      </h1>

      <article className="mt-8 wp-content text-black/80">
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    </main>
  );
}
