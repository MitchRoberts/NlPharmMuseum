// app/components/ui/AccentTitle.tsx
import React from "react";

export default function AccentTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={[
        "text-[#7a1630] text-5xl sm:text-6xl font-light tracking-tight",
        className,
      ].join(" ")}
    >
      {children}
    </h2>
  );
}
