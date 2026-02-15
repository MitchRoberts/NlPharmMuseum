// app/components/ui/SoftCard.tsx
import React from "react";

export default function SoftCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl bg-white/60 ring-1 ring-black/5 p-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
