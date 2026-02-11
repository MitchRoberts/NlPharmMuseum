import Link from "next/link";
import Image from "next/image";
import { getPages, stripHtml, WPPage, getPostBySlug } from "@/app/lib/wp";
import NavClient, { NavItem } from "@/app/components/NavClient";

function buildNavTree(pages: WPPage[]): NavItem[] {
  const byId = new Map<number, NavItem>();

  for (const p of pages) {
    byId.set(p.id, {
      id: p.id,
      title: stripHtml(p.title.rendered),
      slug: p.slug,
      children: [],
    });
  }

  const roots: NavItem[] = [];
  for (const p of pages) {
    const node = byId.get(p.id)!;
    if (p.parent && byId.has(p.parent)) {
      byId.get(p.parent)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  // Only include top-level items you want in the header (match your dropdown idea)
const top = roots;

  // Sort children by title for consistency (or later: manual menu order)
  for (const t of top) t.children.sort((a, b) => a.title.localeCompare(b.title));
  top.sort((a, b) => a.title.localeCompare(b.title));

  return top;
}

export default async function Header() {
  const pages = await getPages().catch(() => [] as WPPage[]);
  const nav = buildNavTree(pages);

  const logoPost = await getPostBySlug("profile-picture").catch(() => null);
  const media = (logoPost as any)?._embedded?.["wp:featuredmedia"]?.[0];
  const logoUrl = media?.source_url as string | undefined;

  return (
    <header className="sticky top-0 z-50 bg-white md:bg-white/90 md:backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="NL Pharmacy Museum"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-contain bg-white"
              priority
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-black/10" />
          )}

          <div className="leading-tight">
            <p className="text-sm font-semibold">NL Pharmacy Museum</p>
          </div>
        </Link>

        <NavClient nav={nav} />

        <div className="flex items-center gap-2">
          <Link
            href="/visit"
            className="px-4 py-2 rounded-md bg-black text-white text-sm font-medium hover:opacity-90 hover:shadow-md"
          >
            Plan Your Visit
          </Link>
        </div>
      </div>
    </header>
  );
}
