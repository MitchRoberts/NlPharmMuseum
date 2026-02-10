import Link from "next/link";

const tiles = [
  { title: "Collections", href: "/collections", desc: "Browse artifacts and stories from our holdings." },
  { title: "Programs", href: "/education", desc: "Workshops, tours, and learning resources." },
  { title: "Exhibits", href: "/exhibits", desc: "Current and past exhibitions." },
];

export default function ExploreTiles() {
  return (
    <section className="bg-neutral-50 border-y">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold">Explore the Museum</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {tiles.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-xl border bg-white p-6 hover:shadow-md transition block"
            >
              <h3 className="text-lg font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-black/70">{t.desc}</p>
              <p className="mt-4 text-sm font-medium underline">Learn more</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
