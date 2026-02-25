import Link from "next/link";

const tiles = [
  {
    title: "Collections",
    href: "/collections",
    desc: "Browse highlights from our artifacts, archives, and featured items.",
  },
  {
    title: "About the Museum",
    href: "/about",
    desc: "Learn our story, mission, and the people behind the museum.",
  },
  {
    title: "Plan Your Visit",
    href: "/visit",
    desc: "Hours, admission, accessibility, and everything you need to know.",
  },
];

export default function ExploreTiles() {
  return (
    <section className="bg-[#eaf0db]">
      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-black/15 py-6" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-black">
              Explore the Museum
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-3">
          {tiles.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={[
                "group relative block overflow-hidden rounded-2xl",
                "bg-white/70 backdrop-blur",
                "ring-1 ring-black/10 shadow-sm",
                "transition-all duration-200",
                "hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:ring-black/15",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40",
              ].join(" ")}
            >
              {/* subtle top accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-black/10 group-hover:bg-black/20 transition-colors" />

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base sm:text-lg font-semibold text-black tracking-tight">
                    {t.title}
                  </h3>

                  {/* arrow badge */}
                  <span
                    className={[
                      "shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full",
                      "bg-black/[0.04] ring-1 ring-black/10",
                      "transition-all duration-200",
                      "group-hover:bg-black/10 group-hover:ring-black/15",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <span className="text-black/70 group-hover:text-black transition-colors">
                      →
                    </span>
                  </span>
                </div>

                <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-black/70">
                  {t.desc}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-black">
                  <span className="underline underline-offset-4 decoration-black/30 group-hover:decoration-black/60 transition-colors">
                    Learn more
                  </span>
                  <span className="text-black/60 group-hover:translate-x-0.5 transition-transform">
                    ↗
                  </span>
                </div>
              </div>

              {/* bottom fade for depth */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/[0.03] to-transparent" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}