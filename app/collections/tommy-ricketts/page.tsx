// app/collections/tommy-ricketts/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import HeroBanner from "@/app/components/HeroBanner";
import PageShell from "@/app/components/PageShell";
import { getPostBySlug } from "@/app/lib/wp";
import { extractAllImageUrlsFromRenderedHtml } from "@/app/lib/wpGalleryUrls";
import {
  asNumber,
  asString,
  asStringArray,
  extractJsonFromWpHtml,
} from "@/app/lib/wpjson";
import { WPPost } from "@/app/lib/wp";

export const dynamic = "force-dynamic";

type TrailStop = {
  title: string;
  text: string[];
  imageIndex?: number;
  alt?: string;
  imageCaption?: string;
};

type TommyRickettsData = {
  heroTitle?: string;
  heroImageIndex?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  intro?: string[];
  featureImageIndex?: number;
  featureImageAlt?: string;
  trailTitle?: string;
  trailIntro?: string;
  trailStops?: TrailStop[];
  helpTitle?: string;
  helpText?: string[];
  contactEmail?: string;
  emailButtonLabel?: string;
  surveyUrl?: string;
  surveyButtonLabel?: string;
  qrImageIndex?: number;
  qrImageAlt?: string;
  qrCaption?: string;
  imagePlaceholder?: string;
};

type JsonRecord = Record<string, unknown>;
type WPPostWithEmbeddedMedia = WPPost & {
  _embedded?: {
    "wp:featuredmedia"?: { source_url?: string }[];
  };
};

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function buildTommyRickettsData(renderedHtml: string): TommyRickettsData | null {
  const obj = extractJsonFromWpHtml(renderedHtml) as unknown;
  if (!isRecord(obj)) return null;

  const rawTrailStops = Array.isArray(obj.trailStops)
    ? obj.trailStops
    : [];

  const trailStops: TrailStop[] = rawTrailStops
    .filter(isRecord)
    .map((stop) => ({
      title: asString(stop.title) ?? "",
      text: asStringArray(stop.text) ?? [],
      imageIndex: asNumber(stop.imageIndex),
      alt: asString(stop.alt),
      imageCaption: asString(stop.imageCaption),
    }))
    .filter((stop: TrailStop) => stop.title && stop.text.length);

  return {
    heroTitle: asString(obj.heroTitle),
    heroImageIndex: asNumber(obj.heroImageIndex),
    eyebrow: asString(obj.eyebrow),
    title: asString(obj.title),
    subtitle: asString(obj.subtitle),
    intro: asStringArray(obj.intro),
    featureImageIndex: asNumber(obj.featureImageIndex),
    featureImageAlt: asString(obj.featureImageAlt),
    trailTitle: asString(obj.trailTitle),
    trailIntro: asString(obj.trailIntro),
    trailStops: trailStops.length ? trailStops : undefined,
    helpTitle: asString(obj.helpTitle),
    helpText: asStringArray(obj.helpText),
    contactEmail: asString(obj.contactEmail),
    emailButtonLabel: asString(obj.emailButtonLabel),
    surveyUrl: asString(obj.surveyUrl),
    surveyButtonLabel: asString(obj.surveyButtonLabel),
    qrImageIndex: asNumber(obj.qrImageIndex),
    qrImageAlt: asString(obj.qrImageAlt),
    qrCaption: asString(obj.qrCaption),
    imagePlaceholder: asString(obj.imagePlaceholder),
  };
}

function getImageByIndex(images: string[], oneBased?: number) {
  if (!images.length) return null;
  const idx = Math.max(0, (oneBased ?? 1) - 1);
  return images[idx] ?? null;
}

function getOptionalImageByIndex(images: string[], oneBased?: number) {
  if (!images.length || typeof oneBased !== "number") return null;
  const idx = Math.max(0, oneBased - 1);
  return images[idx] ?? null;
}

function TrailStopCard({ stop, number }: { stop: TrailStop; number: number }) {
  return (
    <article className="rounded-xl bg-white/75 p-4 ring-1 ring-black/10 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7a1630] text-sm font-semibold text-white">
          {number}
        </span>
        <h4 className="pt-1 text-base sm:text-lg font-semibold tracking-tight text-black">
          {stop.title}
        </h4>
      </div>

      <div className="mt-3 space-y-2 text-sm leading-relaxed text-black/70">
        {stop.text.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

function TrailImage({
  imageUrl,
  alt,
  caption,
  className = "",
}: {
  imageUrl: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure
      className={[
        "overflow-hidden rounded-xl bg-white ring-1 ring-black/10 shadow-sm",
        className,
      ].join(" ")}
    >
      <Image
        src={imageUrl}
        alt={alt}
        width={1000}
        height={1200}
        sizes="(max-width: 1024px) 100vw, 38vw"
        className="aspect-[16/9] max-h-[220px] w-full object-cover lg:aspect-[5/4] lg:max-h-[410px]"
      />
      {caption && (
        <figcaption className="border-t border-black/10 bg-white px-4 py-3 text-sm leading-relaxed text-black/65">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default async function TommyRickettsPage() {
  const post = (await getPostBySlug("tommy-ricketts")) as WPPostWithEmbeddedMedia | null;
  if (!post) return notFound();

  const contentHtml = post.content?.rendered?.trim() || "";
  const excerptHtml = post.excerpt?.rendered?.trim() || "";
  const data =
    buildTommyRickettsData(contentHtml) ??
    buildTommyRickettsData(excerptHtml) ??
    {};

  const contentImages = extractAllImageUrlsFromRenderedHtml(contentHtml);
  const heroTitle = data.heroTitle || data.title || "Tommy Ricketts";
  const heroUrl =
    getImageByIndex(contentImages, data.heroImageIndex) ??
    post.jetpack_featured_media_url ??
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    null;

  const featureImageUrl = getImageByIndex(
    contentImages,
    data.featureImageIndex ?? data.heroImageIndex
  );

  const intro = data.intro ?? [];
  const trailStops = data.trailStops ?? [];
  const helpText = data.helpText ?? [];
  const qrImageUrl = getOptionalImageByIndex(contentImages, data.qrImageIndex);
  const topTrailStops = trailStops.slice(0, 3);
  const bottomTrailStops = trailStops.slice(3);
  const topImageStop = topTrailStops.find(
    (stop) => typeof stop.imageIndex === "number"
  );
  const bottomImageStop = [...bottomTrailStops]
    .reverse()
    .find((stop) => typeof stop.imageIndex === "number");
  const topTrailImageUrl = getOptionalImageByIndex(
    contentImages,
    topImageStop?.imageIndex
  );
  const bottomTrailImageUrl = getOptionalImageByIndex(
    contentImages,
    bottomImageStop?.imageIndex
  );

  return (
    <div className="bg-[#f2f6e9]">
      <HeroBanner title={heroTitle.toUpperCase()} imageUrl={heroUrl} />

      <PageShell className="py-10 md:py-14">
        <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,380px)] lg:items-center">
          <div>
            {data.eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/55">
                {data.eyebrow}
              </p>
            )}

            <h2 className="mt-2 text-[#7a1630] text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
              {data.title || heroTitle}
            </h2>

            {data.subtitle && (
              <p className="mt-5 max-w-3xl text-xl sm:text-2xl leading-snug text-black/80">
                {data.subtitle}
              </p>
            )}

            {intro.length > 0 && (
              <div className="mt-6 max-w-3xl space-y-4 text-base sm:text-lg leading-relaxed text-black/72">
                {intro.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl bg-white/70 ring-1 ring-black/10 shadow-sm lg:justify-self-center">
            {featureImageUrl ? (
              <Image
                src={featureImageUrl}
                alt={data.featureImageAlt || heroTitle}
                width={900}
                height={1100}
                sizes="(max-width: 1024px) 100vw, 380px"
                className="aspect-[4/5] max-h-[460px] w-full object-cover bg-white"
              />
            ) : (
              <div className="flex min-h-[300px] items-center justify-center text-sm text-black/45">
                {data.imagePlaceholder || ""}
              </div>
            )}
          </div>
        </section>

        {(data.trailTitle || data.trailIntro || trailStops.length > 0) && (
          <section className="mt-14">
            <div className="max-w-3xl">
              {data.trailTitle && (
                <h3 className="text-[#7a1630] text-3xl sm:text-4xl font-light tracking-tight">
                  {data.trailTitle}
                </h3>
              )}

              {data.trailIntro && (
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-black/72">
                  {data.trailIntro}
                </p>
              )}
            </div>

            {trailStops.length > 0 && (
              <div className="mt-7">
                <div className="space-y-4 lg:hidden">
                  {trailStops.map((stop, i) => {
                    const imageUrl = getOptionalImageByIndex(
                      contentImages,
                      stop.imageIndex
                    );

                    return (
                      <div key={`${stop.title}-${i}`} className="space-y-3">
                        <TrailStopCard stop={stop} number={i + 1} />
                        {imageUrl && (
                          <TrailImage
                            imageUrl={imageUrl}
                            alt={stop.alt || stop.title}
                            caption={stop.imageCaption}
                            className="max-w-3xl"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="hidden max-w-7xl space-y-4 lg:block">
                  {topTrailStops.length > 0 && (
                    <div
                      className={[
                        "grid gap-4",
                        topTrailImageUrl
                          ? "grid-cols-[minmax(320px,0.82fr)_minmax(0,1fr)]"
                          : "grid-cols-1",
                      ].join(" ")}
                    >
                      {topTrailImageUrl && topImageStop && (
                        <TrailImage
                          imageUrl={topTrailImageUrl}
                          alt={topImageStop.alt || topImageStop.title}
                          caption={topImageStop.imageCaption}
                          className="self-start"
                        />
                      )}

                      <div className="space-y-4 self-start">
                        {topTrailStops.map((stop, i) => (
                          <TrailStopCard
                            key={`${stop.title}-${i}`}
                            stop={stop}
                            number={i + 1}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {bottomTrailStops.length > 0 && (
                    <div
                      className={[
                        "grid gap-4",
                        bottomTrailImageUrl
                          ? "grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)]"
                          : "grid-cols-1",
                      ].join(" ")}
                    >
                      <div className="space-y-4 self-start">
                        {bottomTrailStops.map((stop, i) => (
                          <TrailStopCard
                            key={`${stop.title}-${i + 3}`}
                            stop={stop}
                            number={i + 4}
                          />
                        ))}
                      </div>

                      {bottomTrailImageUrl && bottomImageStop && (
                        <TrailImage
                          imageUrl={bottomTrailImageUrl}
                          alt={bottomImageStop.alt || bottomImageStop.title}
                          caption={bottomImageStop.imageCaption}
                          className="-mt-10 self-start"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {(data.helpTitle || helpText.length > 0 || qrImageUrl) && (
          <section className="mt-14 rounded-2xl bg-white/70 p-6 sm:p-8 ring-1 ring-black/10 shadow-sm">
            <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div>
                {data.helpTitle && (
                  <h3 className="text-[#7a1630] text-3xl sm:text-4xl font-light tracking-tight">
                    {data.helpTitle}
                  </h3>
                )}

                {helpText.length > 0 && (
                  <div className="mt-4 max-w-3xl space-y-3 text-base sm:text-lg leading-relaxed text-black/72">
                    {helpText.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {(data.contactEmail || data.surveyUrl || qrImageUrl) && (
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-3">
                    {data.contactEmail && (
                      <Link
                        href={`mailto:${data.contactEmail}`}
                        className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                      >
                        {data.emailButtonLabel || data.contactEmail}
                      </Link>
                    )}

                    {data.surveyUrl && (
                      <Link
                        href={data.surveyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-black/5 px-5 py-3 text-sm font-semibold text-black ring-1 ring-black/10 hover:bg-black/10"
                      >
                        {data.surveyButtonLabel || data.surveyUrl}
                      </Link>
                    )}
                    </div>

                    {qrImageUrl && (
                      <figure className="ml-auto w-[126px] shrink-0 sm:hidden">
                        <div className="overflow-hidden rounded-2xl bg-white p-2 ring-1 ring-black/10">
                          <Image
                            src={qrImageUrl}
                            alt={data.qrImageAlt || data.qrCaption || "QR code"}
                            width={360}
                            height={360}
                            sizes="126px"
                            className="h-auto w-full"
                          />
                        </div>
                        {data.qrCaption && (
                          <figcaption className="mt-2 text-center text-xs font-medium leading-snug text-black/55">
                            {data.qrCaption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </div>
                )}
              </div>

              {qrImageUrl && (
                <figure className="hidden w-full max-w-[180px] justify-self-end sm:block">
                  <div className="overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-black/10">
                    <Image
                      src={qrImageUrl}
                      alt={data.qrImageAlt || data.qrCaption || "QR code"}
                      width={360}
                      height={360}
                      sizes="180px"
                      className="h-auto w-full"
                    />
                  </div>
                  {data.qrCaption && (
                    <figcaption className="mt-2 text-center text-xs font-medium leading-snug text-black/55">
                      {data.qrCaption}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          </section>
        )}
      </PageShell>
    </div>
  );
}
