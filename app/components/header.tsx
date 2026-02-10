import Link from "next/link";
import { getPages, stripHtml, WPPage } from "@/app/lib/wp";
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

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-black/10" />
          <div className="leading-tight">
            <p className="text-sm font-semibold">NL Pharmacy Museum</p>
            <p className="text-xs text-black/60">Memorial University</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <NavClient nav={nav} />

        {/* Right-side CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/visit"
            className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:opacity-90"
          >
            Plan Your Visit
          </Link>
        </div>
      </div>
    </header>
  );
}
