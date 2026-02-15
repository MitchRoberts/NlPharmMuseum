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
      <main
        className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 ${className}`}
      >
        {children}
      </main>
    </div>
  );
}
