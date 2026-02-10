import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#ffffff_0%,transparent_35%),radial-gradient(circle_at_80%_30%,#ffffff_0%,transparent_30%)]" />
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 relative">
        <p className="text-sm text-white/70">Memorial University</p>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
          Newfoundland Pharmacy Museum
        </h1>
        <p className="mt-5 max-w-xl text-white/80 leading-relaxed">
          Discover the stories, objects, and people behind pharmacy and health care
          in Newfoundland and Labrador.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/visit"
            className="px-5 py-3 rounded-full bg-white text-black text-sm font-semibold hover:opacity-90"
          >
            Plan Your Visit
          </Link>
          <Link
            href="/posts"
            className="px-5 py-3 rounded-full border border-white/30 text-sm font-semibold hover:bg-white/10"
          >
            Latest Updates
          </Link>
        </div>
      </div>
    </section>
  );
}
