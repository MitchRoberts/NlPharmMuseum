import { getPageBySlug, stripHtml } from "@/app/lib/wp";
import { notFound } from "next/navigation";

export default async function WPPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);
  if (!page) return notFound();

  return (
     <div className="min-h-screen bg-[#f2f6e9]">
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black">
          {stripHtml(page.title.rendered)}
        </h1>

        <article className="mt-8 wp-content text-black/80">
          <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </article>
      </main>
    </div>
  );
}
