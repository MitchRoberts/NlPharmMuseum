import Link from "next/link";
import { getMuseumInfo } from "@/app/lib/museumInfo";

export default async function PlanVisit() {
  const info = await getMuseumInfo();

  return (
    <section className="bg-[#eaf0db]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-black/15 pt-6 mt-10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mt-6 overflow-hidden rounded-3xl bg-white/70 backdrop-blur ring-1 ring-black/10 shadow-sm">
          <div className="px-6 sm:px-8 py-6 border-b border-black/10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-black">
                  {info.planTitle}
                </h2>
                <p className="mt-1 text-sm sm:text-base text-black/70">
                  {info.planSubtitle}
                </p>
              </div>

              <Link
                href="/visit"
                className="text-sm font-medium text-black/70 hover:text-black underline underline-offset-4"
              >
                {info.planDetailsLabel}
              </Link>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-black/[0.04] ring-1 ring-black/10 px-4 py-3">
                <p className="text-xs font-semibold text-black/60">
                  {info.seasonalLabel}
                </p>
                <p className="mt-1 text-sm font-semibold text-black">
                  {info.seasonalText}
                </p>
              </div>

              <div className="rounded-2xl bg-black/[0.04] ring-1 ring-black/10 px-4 py-3">
                <p className="text-xs font-semibold text-black/60">
                  {info.hoursLabel}
                </p>
                <p className="mt-1 text-sm font-semibold text-black">
                  {info.hoursText}
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2">
            <div className="px-6 sm:px-8 py-6">
              <h3 className="text-base sm:text-lg font-semibold text-black">
                {info.locationTitle}
              </h3>

              <div className="mt-4 rounded-2xl bg-white ring-1 ring-black/10 p-4">
                <p className="text-sm text-black/60">{info.museumName}</p>
                <p className="mt-1 text-sm font-semibold text-black leading-relaxed">
                  {info.addressLines.map((line, i) => (
                    <span key={`${line}-${i}`}>
                      {line}
                      {i < info.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/visit"
                  className={[
                    "inline-flex items-center justify-center rounded-full",
                    "px-5 py-3 text-sm font-semibold",
                    "bg-black text-white hover:opacity-90",
                    "touch-manipulation select-none",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40",
                  ].join(" ")}
                >
                  {info.visitInfoLabel}
                </Link>

                <a
                  href={info.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "inline-flex items-center justify-center rounded-full",
                    "px-5 py-3 text-sm font-semibold",
                    "bg-black/[0.04] text-black hover:bg-black/10",
                    "ring-1 ring-black/10",
                    "touch-manipulation select-none",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40",
                  ].join(" ")}
                >
                  {info.directionsLabel}
                </a>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-6 lg:border-l border-black/10">
              <h3 className="text-base sm:text-lg font-semibold text-black">
                {info.mapTitle}
              </h3>

              <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-black/10 bg-white">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/9]">
                  <iframe
                    src={info.mapEmbedUrl}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="mt-4">
                <a
                  href={info.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-black/80 underline underline-offset-4 hover:text-black"
                >
                  {info.directionsLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
