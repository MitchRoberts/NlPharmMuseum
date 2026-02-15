// app/components/PageShell.tsx
import React from "react";

export default function PageShell({
  children,
  className = "",
  bg = "bg-[#f2f6e9]",
}: {
  children: React.ReactNode;
  className?: string;
  bg?: string;
}) {
  return (
    <div className={`min-h-screen ${bg}`}>
      <main className={`mx-20 max-auto px-4 py-10 ${className}`}>
        {children}
      </main>
    </div>
  );
}
