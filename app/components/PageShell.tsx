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
    <div className={bg}>
      <main
        className={[
          "w-full",
          "px-4",        // mobile
          "sm:px-6",     // small screens
          "md:px-10",    // tablets
          "lg:px-16",    // desktop
          "xl:px-20",    // large desktop
          "2xl:px-24",   // ultra-wide
          "py-10",
          className,
        ].join(" ")}
      >
        {children}
      </main>
    </div>
  );
}
