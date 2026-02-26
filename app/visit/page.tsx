// app/visit/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/lib/wp";
import PageShell from "@/app/components/PageShell";
import TwoCol from "@/app/components/TwoCol";
import HeroBanner from "@/app/components/HeroBanner";
import VisitInfoCard from "@/app/components/visit/VisitInfoCard";
import VisitMapCard from "@/app/components/visit/VisitMapCard";
import { extractJsonFromWpHtml, asString, asStringArray } from "@/app/lib/wpjson";


export const dynamic = "force-dynamic";

type VisitData = {
  heroTitle?: string;
  subtitle?: string;
  hoursLines?: string[];
  admissionLines?: string[];
  addressLines?: string[];
  email?: string;
  parkingLines?: string[];
  accessibilityLines?: string[];
  directionsUrl?: string;
  mapEmbedUrl?: string;
};

function buildVisitData(renderedHtml: string): VisitData | null {
  const obj = extractJsonFromWpHtml(renderedHtml);
  if (!obj || typeof obj !== "object") return null;

  return {
    heroTitle: asString(obj.heroTitle),
    subtitle: asString(obj.subtitle),
    hoursLines: asStringArray(obj.hoursLines ?? obj.hours),
    admissionLines: asStringArray(obj.admissionLines ?? obj.admission),
    addressLines: asStringArray(obj.addressLines ?? obj.address),
    email: asString(obj.email),
    parkingLines: asStringArray(obj.parkingLines ?? obj.parking),
    accessibilityLines: asStringArray(obj.accessibilityLines ?? obj.accessibility),
    directionsUrl: asString(obj.directionsUrl),
    mapEmbedUrl: asString(obj.mapEmbedUrl),
  };
}

export default async function VisitPage() {
  const visitPost = await getPostBySlug("visit");
  if (!visitPost) return notFound();

  const heroUrl =
    (visitPost as any)?.jetpack_featured_media_url ??
    (visitPost as any)?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    null;

  const contentHtml = (visitPost as any)?.content?.rendered?.trim() || "";
  const excerptHtml = (visitPost as any)?.excerpt?.rendered?.trim() || "";

  const data = buildVisitData(contentHtml) ?? buildVisitData(excerptHtml) ?? {};

  const heroTitle = data.heroTitle || "Visit";
  const subtitle =
    data.subtitle || "Plan your visit to the Newfoundland & Labrador Pharmacy Museum.";

  const hoursLines = data.hoursLines?.length
    ? data.hoursLines
    : ["Seasonal hours available", "Check back soon for updates"];

  const admissionLines = data.admissionLines ?? [];

  const addressLines = data.addressLines?.length
    ? data.addressLines
    : ["Apothecary Hall", "488 Water St.", "St. John's, NL A1E 1B3"];

  const directionsUrl =
    data.directionsUrl ||
    "https://www.google.com/maps/dir/?api=1&destination=Apothecary%20Hall%2C%20488%20Water%20St%2C%20St.%20John%27s%2C%20NL%20A1E%201B3";

  const mapEmbedUrl =
    data.mapEmbedUrl ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5385.212706394297!2d-52.713152699999995!3d47.5559897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0ca3af5599226d%3A0x522d1adbf95caa2f!2sNewfoundland%20%26%20Labrador%20Pharmacy%20Museum!5e0!3m2!1sen!2sca!4v1772129805273!5m2!1sen!2sca";

  return (
    <div className="bg-[#f2f6e9]">
      <HeroBanner title={heroTitle.toUpperCase()} imageUrl={heroUrl} />

      <PageShell className="py-10 md:py-14">
        <TwoCol
          left={
            <div>
              <h2 className="text-[#7a1630] text-5xl sm:text-6xl font-light tracking-tight">
                Plan Your Visit
              </h2>
              <p className="mt-4 text-black/70 leading-relaxed text-base sm:text-lg max-w-xl">
                {subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Get Directions
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-black/5 px-6 py-3 text-sm font-semibold text-black hover:bg-black/10"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          }
          right={
            <VisitInfoCard
              hoursLines={hoursLines}
              admissionLines={admissionLines}
              addressLines={addressLines}
              email={data.email}
              parkingLines={data.parkingLines}
              accessibilityLines={data.accessibilityLines}
            />
          }
        />

        <VisitMapCard
          addressLabel={addressLines.join(" - ")}
          directionsUrl={directionsUrl}
          mapEmbedUrl={mapEmbedUrl}
        />
      </PageShell>
    </div>
  );
}
