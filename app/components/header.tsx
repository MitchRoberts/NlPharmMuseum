import Link from "next/link";
import Image from "next/image";
import { getPages, WPPage, getPostBySlug } from "@/app/lib/wp";
import NavClient from "@/app/components/NavClient";

export default async function Header() {
  const pages = await getPages().catch(() => [] as WPPage[]);

  const logoPost = await getPostBySlug("profile-picture").catch(() => null);
  const media = (logoPost as any)?._embedded?.["wp:featuredmedia"]?.[0];
  const logoUrl = media?.source_url as string | undefined;

  return (
    <header className="sticky top-0 z-50 bg-white md:bg-white/90 md:backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex">
          <Link href="/" className="flex items-center gap-2 mr-6">
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

          <div className="leading-tight hidden sm:block">
            <p className="text-sm text-black/90 font-semibold">NL Pharmacy Museum</p>
          </div>
        </Link>
          <Link
            href="https://www.zeffy.com/en-CA/donation-form/preserve-the-prescription-of-history"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-white border border-black/15 text-black text-sm font-semibold hover:bg-black/5"
          >
            Donate
          </Link>
        </div>
        

        <NavClient />

      </div>
    </header>
  );
}
