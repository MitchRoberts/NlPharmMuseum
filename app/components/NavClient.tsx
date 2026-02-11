"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export type NavItem = {
  id: number;
  title: string;
  slug: string;
  children: NavItem[];
};

function useClickOutside<T extends HTMLElement>(onOutside: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        onOutside();
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onOutside]);

  return ref;
}

export default function NavClient({ nav }: { nav: NavItem[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const wrapperRef = useClickOutside<HTMLDivElement>(() => setOpenSlug(null));

  const hasDropdown = useMemo(() => {
    return new Set(nav.filter(n => n.children.length > 0).map(n => n.slug));
  }, [nav]);

  return (
    <div ref={wrapperRef} className="hidden md:flex items-center gap-1">
      {nav.map((item) => {
        const isOpen = openSlug === item.slug;

        return (
          <div key={item.id} className="relative">
            <button
              type="button"
              onClick={() => {
                if (!hasDropdown.has(item.slug)) {
                  setOpenSlug(null);
                  // if no dropdown, just navigate by link below
                  return;
                }
                setOpenSlug((prev) => (prev === item.slug ? null : item.slug));
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-black/5 flex items-center gap-1"
              aria-expanded={isOpen}
              aria-haspopup={item.children.length > 0}
            >
              <Link
                href={`/${item.slug}`}
                onClick={() => setOpenSlug(null)}
                className="outline-none"
              >
                {item.title}
              </Link>

              {item.children.length > 0 && (
                <span className="text-black/50">▾</span>
              )}
            </button>

            {item.children.length > 0 && isOpen && (
              <div className="absolute left-0 top-full mt-2 min-w-64 rounded-xl border bg-white shadow-lg overflow-hidden z-50">
                {item.children.map((child) => (
                  <Link
                    key={child.id}
                    href={`/${child.slug}`}
                    onClick={() => setOpenSlug(null)}
                    className="block px-4 py-3 text-sm text-black hover:bg-black/5"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
