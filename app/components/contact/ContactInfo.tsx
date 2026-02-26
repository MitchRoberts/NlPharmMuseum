// app/components/contact/ContactInfo.tsx
import Link from "next/link";

export default function ContactInfo({
  connectText,
  getInTouchText,
  directionsUrl,
}: {
  connectText: string;
  getInTouchText: string;
  directionsUrl: string;
}) {
  return (
    <div>
      <div className="text-black/80 leading-relaxed text-base sm:text-lg">
        {connectText}
      </div>

      <p className="mt-4 text-black/80 leading-relaxed text-base sm:text-lg">
        {getInTouchText}
      </p>

      <div className="mt-6 space-y-4 text-black/80">

        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-black/5 px-6 py-3 text-sm font-semibold text-black hover:bg-black/10"
          >
            Get Directions
          </Link>

          <Link
            href="/visit"
            className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Visit Info
          </Link>
        </div>
      </div>
    </div>
  );
}
