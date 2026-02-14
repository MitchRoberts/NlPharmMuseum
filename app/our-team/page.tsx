import Image from "next/image";
import { getPostsByCategorySlug, stripHtml, WPPost } from "@/app/lib/wp";

function getRole(p: WPPost) {
  // We are using EXCERPT as the role/title (no plugins needed)
  const roleHtml = p.excerpt?.rendered ? p.excerpt.rendered : "";
  const role = stripHtml(roleHtml);
  return role;
}

function getBioHtml(p: WPPost) {
  // We are using CONTENT as the bio (keeps WP formatting if they add paragraphs)
  const html = p.content?.rendered ?? "";
  // Strip totally empty content (sometimes WP gives "<p></p>" etc.)
  const text = stripHtml(html);
  return text ? html : "";
}

export default async function OurTeamPage() {
  // Pull team posts (category slug = "team")
  const team = await getPostsByCategorySlug("team", 100);

  return (
    <div className="min-h-screen bg-[#f2f6e9]">
      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black">
            Our Team
          </h1>

          <p className="mt-3 text-black/70 leading-relaxed">
            The Newfoundland and Labrador Pharmacy Museum is operated by a small group of
            volunteers dedicated to preserving and sharing the history and evolution of
            trusted pharmacy practice in Newfoundland and Labrador.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => {
            const name = stripHtml(member.title.rendered);
            const role = getRole(member);
            const bioHtml = getBioHtml(member);

            const img =
              member.jetpack_featured_media_url ??
              (member as any)?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
              null;

            return (
              <article
                key={member.id}
                className="group rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden flex flex-col"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] bg-black/5 overflow-hidden">
                  {img ? (
                    <Image
                      src={img}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-black/50">
                      No photo
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-base font-semibold text-black leading-snug">
                    {name}
                  </h2>

                  {/* Role (excerpt) */}
                  {role ? (
                    <p className="mt-1 text-xs uppercase tracking-wide text-black/60">
                      {role}
                    </p>
                  ) : null}

                  {/* Bio (content) */}
                  {bioHtml ? (
                    <div
                      className="mt-3 text-sm text-black/70 leading-relaxed wp-content"
                      dangerouslySetInnerHTML={{ __html: bioHtml }}
                    />
                  ) : (
                    // If no bio, keep spacing tidy (or remove entirely)
                    <p className="mt-3 text-sm text-black/40 italic">
                      {/* No bio provided */}
                    </p>
                  )}

                  {/* Optional: subtle bottom spacing so cards feel balanced */}
                  <div className="mt-auto pt-4" />
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
