"use client";

import Masonry from "react-masonry-css";
import CollectionCard from "./CollectionCard";

export type CollectionItem = {
  title: string;
  description: string[];
  imageIndex?: number; // 1-based
  alt?: string;
  href?: string;
};

export default function CollectionsMasonry({
  items,
  images,
}: {
  items: CollectionItem[];
  images: string[];
}) {
  // Desktop masonry can still be your CSS columns if you want,
  // but simplest is: use JS masonry everywhere for consistency.
  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    640: 2,
    0: 1,
  };

  return (
    <div className="mt-10">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-js"
        columnClassName="masonry-js-col"
      >
        {items.map((c, i) => {
          const idx = Math.max(0, (c.imageIndex ?? i + 1) - 1);
          const imageUrl = images[idx] ?? null;

          return (
            <div key={`${c.title}-${i}`} className="mb-5">
              <CollectionCard
                title={c.title}
                description={c.description}
                imageUrl={imageUrl}
                alt={c.alt}
              />
            </div>
          );
        })}
      </Masonry>
    </div>
  );
}