"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export type CarouselItem = {
  id: number;
  src: string;
  alt: string;
};

type Pos = "left" | "center" | "right";

export default function GalleryCarousel({
  items,
  intervalMs = 6000,
}: {
  items: CarouselItem[];
  intervalMs?: number;
}) {
  const slides = useMemo(() => items.filter((i) => !!i.src), [items]);
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // track breakpoint so offsets feel right on mobile vs md+
  const [isMd, setIsMd] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMd(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => clearInterval(t);
  }, [count, intervalMs]);

  if (count === 0) return null;

  const prev = (index - 1 + count) % count;
  const next = (index + 1) % count;

  const goPrev = () => {
    setDirection(-1);
    setIndex(prev);
  };
  const goNext = () => {
    setDirection(1);
    setIndex(next);
  };

  // swipe tuning (mobile)
  const swipeConfidenceThreshold = 80; // px
  const swipeVelocityThreshold = 400; // px/s

  // how far left/right the peeks sit from center
  const offset = isMd ? 280 : 170;

  // motion variants = where each "role" lives visually
  const variants: Record<Pos, any> = {
    left: {
      x: -offset,
      scale: 0.72,
      zIndex: 1,
    },
    center: {
      x: 0,
      scale: 1,
      zIndex: 3,
    },
    right: {
      x: offset,
      scale: 0.72,
      zIndex: 1,
    },
  };

  // we keep all cards the SAME base size and use scale for peeks
  const baseW = isMd ? 360 : 220;
  const baseH = isMd ? 320 : 240;

  // build the 3 visible cards
  const visible = [
    { pos: "left" as Pos, slideIndex: prev },
    { pos: "center" as Pos, slideIndex: index },
    { pos: "right" as Pos, slideIndex: next },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Commented out: border around the images */}
      <div /*className="relative rounded-4xl bg-white/60 shadow-sm px-8 py-6"*/>
        {/* stage */}
        <div className="relative h-[260px] md:h-[340px] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {visible.map(({ pos, slideIndex }) => {
              const s = slides[slideIndex];

              return (
                <motion.div
                  key={s.id}
                  className="absolute"
                  animate={pos}
                  variants={variants}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 28,
                    mass: 0.9,
                  }}
                  style={{
                    width: baseW,
                    height: baseH,
                    opacity: pos === "center" ? 1 : 0.6,
                    transformOrigin: "center center",
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-xl shadow-md">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 768px) 360px, 220px"
                      className="object-cover"
                      priority={pos === "center"}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* swipe layer (captures touch + mouse drag) */}
          {count > 1 && (
            <motion.div
              className="absolute inset-0 z-10"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                const offsetX = info.offset.x;
                const velocityX = info.velocity.x;

                if (
                  offsetX < -swipeConfidenceThreshold ||
                  velocityX < -swipeVelocityThreshold
                ) {
                  goNext();
                  return;
                }

                if (
                  offsetX > swipeConfidenceThreshold ||
                  velocityX > swipeVelocityThreshold
                ) {
                  goPrev();
                  return;
                }
              }}
              style={{ touchAction: "pan-y" }}
              aria-label="Swipe carousel"
            />
          )}

          {/* arrows (desktop only) */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/5 hover:bg-black/10 items-center justify-center z-20"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goNext}
                className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/5 hover:bg-black/10 items-center justify-center z-20"
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* dots */}
        {count > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-blue-500" : "w-2.5 bg-black/20"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
