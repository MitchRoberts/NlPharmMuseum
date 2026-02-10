import { getPosts, stripHtml } from "@/app/lib/wp";

export default async function Page() {
  const posts = await getPosts({ per_page: 5 });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">WP Connection Test</h1>
      <ul className="mt-4 list-disc pl-6">
        {posts.map((p) => (
          <li key={p.id}>
            {stripHtml(p.title.rendered)} — <span className="text-gray-500">{p.slug}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
