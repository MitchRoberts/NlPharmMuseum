// app/components/HeroBanner.tsx
import Image from "next/image";

export default function HeroBanner({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl?: string | null;
}) {
  return (
    <section className="relative">
      <div className="relative h-[140px] sm:h-[180px] md:h-[220px] w-full overflow-hidden">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/45" />
          </>
        ) : (
          <div className="absolute inset-0 bg-black/25" />
        )}

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-3xl sm:text-5xl font-semibold tracking-wide">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
