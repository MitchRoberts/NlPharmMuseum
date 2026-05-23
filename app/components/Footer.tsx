import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "lucide-react";
import { getMuseumInfo } from "@/app/lib/museumInfo";

export default async function Footer() {
  const info = await getMuseumInfo();

  return (
    <footer className="bg-[#4b2e3a] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              {info.footerVisitTitle}
            </h3>
            <p className="text-sm leading-relaxed text-white/80">
              {info.addressLines.map((line, i) => (
                <span key={`${line}-${i}`}>
                  {line}
                  <br />
                </span>
              ))}
              <a
                href={`mailto:${info.email}`}
                className="underline hover:text-white"
              >
                {info.email}
              </a>
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              {info.footerHoursTitle}
            </h3>
            <p className="text-sm leading-relaxed text-white/80">
              {info.seasonalLabel}: {info.seasonalText}
              <br />
              {info.hoursText}
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
                {info.footerGroupTitle}
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                {info.footerGroupText}
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <Link
                href="https://www.facebook.com/nlpharmacymuseum/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition hover:scale-105 hover:shadow-md"
              >
                <FacebookIcon size={18} />
              </Link>

              <Link
                href="https://www.instagram.com/pharmacymuseumnl/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E1306C] text-white shadow-sm transition hover:scale-105 hover:shadow-md"
              >
                <InstagramIcon size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-6 text-sm text-white/60">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>
              &copy; {new Date().getFullYear()} Newfoundland & Labrador Pharmacy
              Museum
            </span>
            <span>{info.footerCharityText}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
