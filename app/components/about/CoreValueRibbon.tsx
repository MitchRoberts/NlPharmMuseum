// app/components/about/CoreValueRibbon.tsx
import Image from "next/image";

export default function CoreValueRibbon({
  side,
  title,
  text,
  imageUrl,
}: {
  side: "left" | "right";
  title: string;
  text: string;
  imageUrl?: string | null;
}) {
  const isLeft = side === "left";

  return (
    <div className="relative overflow-hidden rounded-3xl ring-1 ring-black/5 bg-white/60">
      {/* background image */}
      {imageUrl ? (
        <>
          <div className="absolute inset-0">
            <Image
              src={imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
          </div>
          <div className="absolute inset-0 bg-black/35" />
        </>
      ) : (
        <div className="absolute inset-0 bg-black/5" />
      )}

      {/* ribbon */}
      <div className="relative p-6 sm:p-8">
        <div
          className={[
            "relative",
            "w-full lg:w-3/4",
            isLeft ? "mr-auto" : "ml-auto",
          ].join(" ")}
        >
          <div
            className={[
              "rounded-2xl",
              "bg-white/85 backdrop-blur-sm",
              "ring-1 ring-black/10",
              "shadow-sm",
              "px-6 py-6 sm:px-7 sm:py-7",
            ].join(" ")}
          >
            <p className="text-xs font-semibold tracking-widest text-black/60 uppercase">
              Core Value
            </p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-black">
              {title}
            </h3>
            <p className="mt-3 text-base sm:text-lg text-black/75 leading-relaxed">
              {text}
            </p>
          </div>

          {/* little “tail” wedge to sell the ribbon look */}
          <div
            className={[
              "absolute top-10 hidden lg:block",
              "h-6 w-6 rotate-45",
              "bg-white/85 backdrop-blur-sm",
              "ring-1 ring-black/10",
              isLeft ? "-left-3" : "-right-3",
            ].join(" ")}
          />
        </div>
      </div>
    </div>
  );
}
