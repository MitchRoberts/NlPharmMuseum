"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type FBPost = {
  id: string;
  message?: string;
  created_time?: string;
  permalink_url?: string;
  full_picture?: string;
};

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const clamp3 =
  "[display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden";

export default function FacebookFeedCarouselClient({ posts }: { posts: FBPost[] }) {
  // Ensure exactly up to 6
  const slides = useMemo(() => (Array.isArray(posts) ? posts.slice(0, 6) : []), [posts]);

  const PAGE_SIZE = 3;
  const pageCount = Math.max(1, Math.ceil(slides.length / PAGE_SIZE));

  const [page, setPage] = useState(0);

  const canPrev = page > 0;
  const canNext = page < pageCount - 1;

  const goPrev = () => {
    if (!canPrev) return;
    setPage((p) => Math.max(0, p - 1));
  };

  const goNext = () => {
    if (!canNext) return;
    setPage((p) => Math.min(pageCount - 1, p + 1));
  };

  // current page items
  const start = page * PAGE_SIZE;
  const visible = slides.slice(start, start + PAGE_SIZE);

  if (slides.length === 0) return null;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Frame */}
      <div className="relative mt-3">
        {/* swipe/drag layer */}
        <motion.div
          className="absolute inset-0 z-10"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            const offsetX = info.offset.x;
            const velocityX = info.velocity.x;

            // tuned for “page swipe”
            const swipeThreshold = 120;
            const velocityThreshold = 500;

            if ((offsetX < -swipeThreshold || velocityX < -velocityThreshold) && canNext) {
              goNext();
              return;
            }
            if ((offsetX > swipeThreshold || velocityX > velocityThreshold) && canPrev) {
              goPrev();
              return;
            }
          }}
          style={{ touchAction: "pan-y" }}
          aria-label="Swipe posts"
        />

        {/* Cards row (no wrap, 3 columns) */}
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.9 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {visible.map((p) => {
            const msg = (p.message ?? "").trim();
            const date = formatDate(p.created_time);
            const href = p.permalink_url ?? "#";

            return (
              <article
                key={p.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
              >
                {/* image */}
                {p.full_picture ? (
                  <div className="relative  h-48 w-full bg-black/5">
                    <Image
                      src={p.full_picture}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-black/5" />
                )}

                {/* content */}
                <div className="flex flex-col p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#1877F2]/10 px-3 py-1 text-xs font-medium text-[#1877F2]">
                      <span className="h-2 w-2 rounded-full bg-[#1877F2]" />
                      Facebook
                    </span>
                    {date ? <time className="text-xs text-black/45">{date}</time> : null}
                  </div>

                  <p className={`mt-3 text-sm leading-relaxed text-black/80 ${clamp3}`}>
                    {msg || "View post on Facebook."}
                  </p>

                  <div className="mt-4">
                    <Link
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-black/10 px-4 py-2 text-sm font-medium text-black/80 transition hover:bg-black/[0.03]"
                    >
                      View <span className="ml-2 text-black/40">↗</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>

        {/* Arrows */}
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          className={`hidden md:flex absolute lg:-left-14 md:-left-12 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full shadow ring-1 ring-black/10 z-20
            ${canPrev ? "bg-white/80 hover:bg-white" : "bg-white/40 opacity-50 cursor-not-allowed"}`}
          aria-label="Previous"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          className={`hidden md:flex absolute lg:-right-14 md:-right-12 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full shadow ring-1 ring-black/10 z-20
            ${canNext ? "bg-white/80 hover:bg-white" : "bg-white/40 opacity-50 cursor-not-allowed"}`}
          aria-label="Next"
        >
          ›
        </button>
      </div>
      <div className="mt-3" />
    </div>
  );
}