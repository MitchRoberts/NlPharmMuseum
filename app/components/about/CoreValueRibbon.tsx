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

  // Left ribbon: notch on RIGHT
  // Right ribbon: notch on LEFT
  const clipLeft = "polygon(0% 0%, 100% 0%, 92% 50%, 100% 100%, 0% 100%)";
  const clipRight = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 8% 50%)";

  return (
    <div
      className={[
        "relative w-full",
        // only do the 3/4 ribbon alignment on lg+
        "lg:w-3/4",
        isLeft ? "lg:mr-auto" : "lg:ml-auto",
      ].join(" ")}
    >
      <div
        className={[
          "relative overflow-hidden",
          "h-auto", // mobile: allow height to grow naturally
          "lg:h-[210px]", // desktop ribbon height
          "ring-1 ring-black/10 shadow-sm",
          "rounded-2xl", // mobile rounded
          "lg:rounded-none", // ribbon look on desktop
        ].join(" ")}
        // IMPORTANT: only apply clipPath on lg+
        style={{
          clipPath: undefined,
        }}
      >
        {/* apply clipPath only on lg via an inner wrapper */}
        <div
          className="relative h-full"
          style={{
            clipPath: undefined,
          }}
        >
          {/* Background image */}
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 75vw, 100vw"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 bg-black/5" />
          )}

          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/35" />

          {/* MOBILE LAYOUT (no notch, centered readable card) */}
          <div className="relative lg:hidden p-5 sm:p-6">
            <div className="rounded-2xl bg-white/70 backdrop-blur-sm ring-1 ring-black/10 p-5 sm:p-6">
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
          </div>

          {/* DESKTOP LAYOUT (your ribbon + notch) */}
          <div
            className={[
              "hidden lg:block",
              "relative overflow-hidden",
              "h-[210px]",
            ].join(" ")}
            style={{ clipPath: isLeft ? clipLeft : clipRight }}
          >
            {/* Background image + overlay already exist above; re-layer for clip area */}
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="75vw"
              />
            ) : (
              <div className="absolute inset-0 bg-black/5" />
            )}
            <div className="absolute inset-0 bg-black/35" />

            {/* “paper” text panel — LEFT for left ribbons, RIGHT for right ribbons */}
            <div
              className={[
                "absolute inset-y-0",
                isLeft ? "left-0" : "right-0",
                "w-[62%]",
                "bg-white/45 backdrop-blur-sm",
              ].join(" ")}
            />

            {/* Content */}
            <div
              className={[
                "relative h-full flex flex-col justify-center",
                "px-10",
                isLeft ? "items-start text-left" : "items-end text-right",
              ].join(" ")}
            >
              <div className="max-w-[52ch]">
                <p className="text-xs font-semibold tracking-widest text-black/60 uppercase">
                  Core Value
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-black">
                  {title}
                </h3>
                <p className="mt-3 text-lg text-black/75 leading-relaxed">
                  {text}
                </p>
              </div>
            </div>
          </div>
          {/* end desktop */}
        </div>
      </div>
    </div>
  );
}
