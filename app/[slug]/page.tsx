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
    <main className="mx-auto max-w-4xl px-4 py-10 bg-[#f2f6e9]">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        {stripHtml(page.title.rendered)}
      </h1>

      <article
        className="mt-8 space-y-4 text-black/80"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />
    </main>
  );
}
