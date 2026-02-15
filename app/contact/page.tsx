import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageBySlug, getPostBySlug, stripHtml } from "@/app/lib/wp";

type ContactData = {
  connectTitle?: string;
  connectText?: string;
  getInTouchTitle?: string;
  getInTouchText?: string;
  email?: string;
  phone?: string;
  addressLines?: string[];
  hoursLines?: string[];
  directionsUrl?: string;
};

// Pulls data-* attributes from a single HTML element in WP content.
// We keep it simple: find the first occurrence of data-connect-title="..."
function extractDataAttrs(html: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!html) return out;

  // matches: data-foo-bar="value"
  const re = /data-([a-z0-9-]+)\s*=\s*"([^"]*)"/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const key = m[1].toLowerCase();
    const val = m[2];
    out[key] = val;
  }
  return out;
}

function parsePipeLines(v?: string): string[] {
  if (!v) return [];
  return v
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildContactData(pageHtml: string): ContactData {
  const attrs = extractDataAttrs(pageHtml);

  return {
    connectTitle: attrs["connect-title"],
    connectText: attrs["connect-text"],
    getInTouchTitle: attrs["getintouch-title"],
    getInTouchText: attrs["getintouch-text"],
    email: attrs["email"],
    phone: attrs["phone"],
    addressLines: parsePipeLines(attrs["address"]),
    hoursLines: parsePipeLines(attrs["hours"]),
    directionsUrl: attrs["directions-url"],
  };
}

export default async function ContactPage() {
  // WP page that stores the text + the HTML data-* block
  const page = await getPageBySlug("contact");
  if (!page) return notFound();

  // WP post that stores the hero banner image as featured image
  const heroPost = await getPostBySlug("contactus-image");

  const heroUrl =
    (heroPost as any)?.jetpack_featured_media_url ??
    (heroPost as any)?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    null;

  const contact = buildContactData(page.content?.rendered ?? "");

  // Reasonable fallbacks if the admin hasn’t filled the HTML block yet
  const connectTitle = contact.connectTitle || "Let's Connect";
  const connectText =
    contact.connectText ||
    "Whether you have a question about our exhibits, programs, collections, or opportunities to get involved, our team is here to help.";
  const getInTouchTitle = contact.getInTouchTitle || "Get in Touch";
  const getInTouchText =
    contact.getInTouchText ||
    "Have a question, idea, or just want to connect? Reach out to us using the contact information below.";

  const email = contact.email || "";
  const phone = contact.phone || "";
  const addressLines = contact.addressLines?.length
    ? contact.addressLines
    : ["Apothecary Hall", "488 Water St.", "St. John's, NL A1E 1B3"];

  const hoursLines = contact.hoursLines?.length ? contact.hoursLines : [];
  const directionsUrl =
    contact.directionsUrl ||
    "https://www.google.com/maps/dir/?api=1&destination=Apothecary%20Hall%2C%20488%20Water%20St%2C%20St.%20John%27s%2C%20NL%20A1E%201B3";

  return (
    <div className="bg-[#f2f6e9]">
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[140px] sm:h-[180px] md:h-[220px] w-full overflow-hidden">
          {heroUrl ? (
            <>
              <Image
                src={heroUrl}
                alt="Contact banner"
                fill
                className="object-cover"
                priority
              />
              {/* dark overlay so white title pops */}
              <div className="absolute inset-0 bg-black/45" />
            </>
          ) : (
            <div className="absolute inset-0 bg-black/25" />
          )}

          <div className="absolute inset-0 flex items-center justify-center px-4">
            <h1 className="text-white text-3xl sm:text-5xl font-semibold tracking-wide">
              CONTACT US
            </h1>
          </div>
        </div>
      </section>

      {/* BODY */}
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Top row like your screenshot */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-[#7a1630] text-5xl sm:text-6xl font-light tracking-tight">
              {connectTitle}
            </h2>
          </div>

          <div className="text-black/80 leading-relaxed text-base sm:text-lg">
            {connectText}
          </div>
        </div>

        {/* Lower row */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* LEFT: simple form placeholder (or you can swap to a real form later) */}
          <div className="rounded-2xl bg-white/60 ring-1 ring-black/5 p-6">
            <h3 className="text-lg font-semibold text-black">Send a message</h3>
            <p className="mt-2 text-sm text-black/60">
              (Not sure if you want this here or not but easy enough to just remove it)
            </p>

            <div className="mt-6 grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="First name"
                />
                <input
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="Last name"
                />
              </div>

              <input
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                placeholder="Email"
              />

              <textarea
                className="min-h-[130px] w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                placeholder="Message"
              />

              <button
                type="button"
                className="inline-flex w-fit items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Submit
              </button>
            </div>
          </div>

          {/* RIGHT: contact info */}
          <div>
            <h2 className="text-[#7a1630] text-5xl sm:text-6xl font-light tracking-tight">
              {getInTouchTitle}
            </h2>

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

              {hoursLines.length > 0 && (
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
        </div>
      </main>
    </div>
  );
}
