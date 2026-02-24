// app/contact/page.tsx
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/lib/wp";
import PageShell from "@/app/components/PageShell";
import TwoCol from "@/app/components/TwoCol";
import HeroBanner from "@/app/components/HeroBanner";
import ContactFormCard from "@/app/components/contact/ContactFormCard";
import ContactInfo from "@/app/components/contact/ContactInfo";
import { extractJsonFromWpHtml, asString, asStringArray, asNumber } from "@/app/lib/wpjson";
import { extractAllImageUrlsFromRenderedHtml } from "@/app/lib/wpGalleryUrls";

export const dynamic = "force-dynamic";

type ContactData = {
  heroTitle?: string;
  connectTitle?: string;
  connectText?: string;
  getInTouchTitle?: string;
  getInTouchText?: string;
  email?: string;
  addressLines?: string[];
  hoursLines?: string[];
  directionsUrl?: string;
  heroGalleryIndex?: number;
};

function buildContactData(renderedHtml: string): ContactData | null {
  const obj = extractJsonFromWpHtml(renderedHtml);
  if (!obj || typeof obj !== "object") return null;

  return {
    heroTitle: asString(obj.heroTitle),

    connectTitle: asString(obj.connectTitle),
    connectText: asString(obj.connectText),

    getInTouchTitle: asString(obj.getInTouchTitle),
    getInTouchText: asString(obj.getInTouchText),

    email: asString(obj.email),

    addressLines: asStringArray(obj.addressLines ?? obj.address),
    hoursLines: asStringArray(obj.hoursLines ?? obj.hours),

    directionsUrl: asString(obj.directionsUrl),

    heroGalleryIndex: asNumber(obj.heroGalleryIndex),
  };
}

export default async function ContactPage() {
  const contactPost = await getPostBySlug("contactus-image");
  if (!contactPost) return notFound();

  const contentHtml = (contactPost as any)?.content?.rendered?.trim() || "";
  const excerptHtml = (contactPost as any)?.excerpt?.rendered?.trim() || "";

  const contact = buildContactData(contentHtml) ?? buildContactData(excerptHtml) ?? {};

  const contentImageUrls = extractAllImageUrlsFromRenderedHtml(contentHtml);

  const oneBased = contact.heroGalleryIndex ?? 1;
  const idx = Math.max(0, oneBased - 1);

  const heroUrl =
    contentImageUrls[idx] ??
    (contactPost as any)?.jetpack_featured_media_url ??
    (contactPost as any)?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    null;

  const heroTitle = contact.heroTitle || "Contact Us";

  const connectTitle = contact.connectTitle || "Let's Connect";
  const connectText =
    contact.connectText ||
    "Whether you have a question about our exhibits, programs, collections, or opportunities to get involved, our team is here to help.";

  const getInTouchTitle = contact.getInTouchTitle || "Get in Touch";
  const getInTouchText =
    contact.getInTouchText ||
    "Have a question, idea, or just want to connect? Reach out to us using the contact information below.";

  const email = contact.email || "";

  const addressLines =
    contact.addressLines?.length
      ? contact.addressLines
      : ["Apothecary Hall", "488 Water St.", "St. John's, NL A1E 1B3"];

  const hoursLines = contact.hoursLines?.length ? contact.hoursLines : [];

  const directionsUrl =
    contact.directionsUrl ||
    "https://www.google.com/maps/dir/?api=1&destination=Apothecary%20Hall%2C%20488%20Water%20St%2C%20St.%20John%27s%2C%20NL%20A1E%201B3";

  return (
    <div className="bg-[#f2f6e9]">
      <HeroBanner title={heroTitle.toUpperCase()} imageUrl={heroUrl} />

      <PageShell className="py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <h2 className="text-[#7a1630] text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
            {connectTitle}
          </h2>

          <h2 className="hidden lg:block text-[#7a1630] text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
            {getInTouchTitle}
          </h2>
        </div>

        <div className="mt-10">
          <TwoCol
            left={<ContactFormCard />}
            right={
              <ContactInfo
                connectText={connectText}
                getInTouchTitle={getInTouchTitle}
                getInTouchText={getInTouchText}
                email={email || undefined}
                addressLines={addressLines}
                hoursLines={hoursLines}
                directionsUrl={directionsUrl}
              />
            }
          />
        </div>
      </PageShell>
    </div>
  );
}
