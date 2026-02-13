"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavLink = {
  label: string;
  href?: string;
  children?: NavLink[];
};

const NAV_ITEMS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Visit", href: "/visit" },

  {
    label: "About us",
    href: "/about",
    children: [
      { label: "About the museum", href: "/about" },
      { label: "Our team", href: "/our-team" },
    ],
  },

  { label: "Contact", href: "/contact" },
  { label: "Exhibits", href: "/exhibits" },
  { label: "Events", href: "/events" },
];

function useClickOutside<T extends HTMLElement>(onOutside: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) onOutside();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onOutside]);

  return ref;
}

function MobileAccordionItem({
  item,
  closeMenu,
}: {
  item: NavLink;
  closeMenu: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between rounded-xl px-4 py-4 text-base font-medium text-black/90 hover:bg-black/5 active:bg-black/10"
        aria-expanded={expanded}
      >
        <span>{item.label}</span>
        <span className="text-black/50">{expanded ? "▴" : "▾"}</span>
      </button>

      {expanded && (
        <div className="pb-2">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href!}
              onClick={closeMenu}
              className="block px-6 py-3 text-sm font-medium text-black/80 hover:bg-black/5"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NavClient() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useClickOutside<HTMLDivElement>(() => setOpen(false));

  // Escape closes
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent background scroll on mobile when open (iOS-friendly)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Desktop inline nav (no hamburger) */}
      <nav className="hidden lg:flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const hasChildren = !!item.children?.length;

          return (
            <div
              key={item.label}
              className="relative group
                        after:content-[''] after:absolute after:left-0 after:top-full
                        after:h-3 after:w-full"
            >
              <Link
                href={item.href ?? "#"}
                className="px-3 py-2 rounded-lg text-sm font-medium text-black/80 hover:bg-black/5 hover:text-black transition inline-flex items-center gap-1"
              >
                {item.label}
                {hasChildren ? <span className="text-black/50">▾</span> : null}
              </Link>

              {/* Hover dropdown */}
              {hasChildren && (
                <div className="absolute left-0 top-full pt-2 min-w-56 rounded-xl bg-white shadow-lg overflow-hidden z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href!}
                      className="block px-4 py-3 text-sm text-black/80 hover:bg-black/5"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Mobile hamburger */}
      <div className="lg:hidden">
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 hover:bg-black/5 active:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/30"
        >
          <span className="block h-0.5 w-6 bg-black/80 mb-1.5" />
          <span className="block h-0.5 w-6 bg-black/80 mb-1.5" />
          <span className="block h-0.5 w-6 bg-black/80" />
        </button>

        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/20"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
        )}

        <div
          className={[
            "absolute right-0 mt-2 z-50 w-[min(92vw,360px)] overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/10",
            "origin-top-right transition",
            open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
          ].join(" ")}
        >
          <div className="px-4 py-3 border-b border-black/10">
            <p className="text-sm font-semibold text-black/90">Menu</p>
            <p className="text-xs text-black/60">Explore the museum</p>
          </div>

          <nav className="p-2 space-y-1">
            {NAV_ITEMS.map((item) => {
              const hasChildren = !!item.children?.length;

              if (hasChildren) {
                return (
                  <MobileAccordionItem
                    key={item.label}
                    item={item}
                    closeMenu={() => setOpen(false)}
                  />
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-4 text-base font-medium text-black/90 hover:bg-black/5 active:bg-black/10"
                >
                  {item.label}
                  <span className="text-black/30">›</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-2 border-t border-black/10">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-black/80 hover:bg-black/5 active:bg-black/10"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
