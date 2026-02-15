// app/components/contact/ContactInfo.tsx
import Link from "next/link";

export default function ContactInfo({
  connectText,
  getInTouchTitle,
  getInTouchText,
  email,
  phone,
  addressLines,
  hoursLines,
  directionsUrl,
}: {
  connectText: string;
  getInTouchTitle: string;
  getInTouchText: string;
  email?: string;
  phone?: string;
  addressLines: string[];
  hoursLines?: string[];
  directionsUrl: string;
}) {
  return (
    <div>
      {/* Mobile title */}
      <h2 className="lg:hidden text-[#7a1630] text-5xl sm:text-6xl font-light tracking-tight mb-5">
        {getInTouchTitle}
      </h2>

      <div className="text-black/80 leading-relaxed text-base sm:text-lg">
        {connectText}
      </div>

      <p className="mt-4 text-black/80 leading-relaxed text-base sm:text-lg">
        {getInTouchText}
      </p>

      <div className="mt-6 space-y-4 text-black/80">
        {!!phone && (
          <div>
            <p className="text-sm font-semibold text-black">Phone</p>
            <p className="mt-1">{phone}</p>
          </div>
        )}

        {!!email && (
          <div>
            <p className="text-sm font-semibold text-black">Email</p>
            <a className="mt-1 inline-block underline" href={`mailto:${email}`}>
              {email}
            </a>
          </div>
        )}

        <div>
          <p className="text-sm font-semibold text-black">Address</p>
          <p className="mt-1">
            {addressLines.map((l, i) => (
              <span key={i}>
                {l}
                <br />
              </span>
            ))}
          </p>
        </div>

        {!!hoursLines?.length && (
          <div>
            <p className="text-sm font-semibold text-black">Hours</p>
            <ul className="mt-1 list-disc pl-5">
              {hoursLines.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>
        )}

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
