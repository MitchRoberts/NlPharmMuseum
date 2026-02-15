// app/components/visit/VisitMapCard.tsx
import Link from "next/link";

export default function VisitMapCard({
  addressLabel,
  directionsUrl,
  mapEmbedUrl,
}: {
  addressLabel: string;
  directionsUrl: string;
  mapEmbedUrl: string;
}) {
  return (
    <div className="mt-12 rounded-2xl overflow-hidden bg-white/60 ring-1 ring-black/5">
      <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-black">Find us</p>
          <p className="mt-1 text-sm text-black/70">{addressLabel}</p>
        </div>

        <Link
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center justify-center rounded-full bg-black/5 px-5 py-2.5 text-sm font-semibold text-black hover:bg-black/10"
        >
          Open in Maps
        </Link>
      </div>

      <div className="relative h-[320px] sm:h-[380px]">
        <iframe
          src={mapEmbedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title="Museum location map"
        />
      </div>
    </div>
  );
}
