"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/"},
  { label: "Visit", href: "/visit" },
  { label: "About us", href: "/about" },
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
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-2 rounded-lg text-sm font-medium text-black/80 hover:bg-black/5 hover:text-black transition"
          >
            {item.label}
          </Link>
        ))}
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

          <nav className="p-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-4 text-base font-medium text-black/90 hover:bg-black/5 active:bg-black/10"
              >
                {item.label}
                <span className="text-black/30">›</span>
              </Link>
            ))}
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
