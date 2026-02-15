// app/components/ui/TwoCol.tsx
import React from "react";

export default function TwoCol({
  left,
  right,
  className = "",
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={["grid gap-10 lg:grid-cols-2 lg:items-start", className].join(" ")}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
