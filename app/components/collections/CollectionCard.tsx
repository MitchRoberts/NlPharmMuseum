// app/components/collections/CollectionCard.tsx
import Image from "next/image";

export default function CollectionCard({
  title,
  description,
  imageUrl,
  alt,
}: {
  title: string;
  description: string[];
  imageUrl?: string | null;
  alt?: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white/60 backdrop-blur ring-1 ring-black/10 shadow-sm hover:shadow-md transition">
      <div className="bg-white">
        <div className="relative w-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={alt || title}
              width={1200}
              height={900}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-contain"
            />
          ) : (
            <div className="flex h-[260px] items-center justify-center text-xs text-black/40">
              No image
            </div>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-black">
          {title}
        </h3>

        <div className="mt-3 space-y-3 text-sm leading-relaxed text-black/70">
          {description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}