import Link from "next/link";

const tiles = [
  { title: "Events", href: "/events", desc: "See current and upcoming events." },
  { title: "About the Museum", href: "/about", desc: "Discover what the museum is all about." },
  { title: "Exhibits", href: "/exhibits", desc: "Current and past exhibitions." },
];

export default function ExploreTiles() {
  return (
    <section className="bg-[#eaf0db]">
      <div className="mx-auto max-w-6xl px-4 pt-16">
				<div className="border-t border-black/20 pt-6 text-sm" />
        <h2 className="text-2xl text-black font-semibold">Explore the Museum</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {tiles.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-xl bg-white p-6 hover:shadow-md transition block"
            >
              <h3 className="text-lg text-black font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-black/70">{t.desc}</p>
              <p className="mt-4 text-sm text-black/90 font-medium underline">Learn more</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
