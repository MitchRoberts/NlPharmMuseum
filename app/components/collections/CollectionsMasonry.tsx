// app/components/collections/CollectionsMasonry.tsx
import CollectionCard from "./CollectionCard";

export type CollectionItem = {
  title: string;
  description: string[];
  imageIndex?: number; // 1-based
  alt?: string;
  href?: string;
};

export default function CollectionsMasonry({ items, images }: { items: CollectionItem[]; images: string[] }) {
  return (
    <div className="mt-10 masonry">
      {items.map((c, i) => {
        const idx = Math.max(0, (c.imageIndex ?? i + 1) - 1);
        const imageUrl = images[idx] ?? null;

        return (
          <div key={`${c.title}-${i}`} className="masonry-item">
            <CollectionCard
              title={c.title}
              description={c.description}
              imageUrl={imageUrl}
              alt={c.alt}
            />
          </div>
        );
      })}
    </div>
  );
}