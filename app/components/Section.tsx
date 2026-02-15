// app/components/Section.tsx
import React from "react";

export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mt-12 md:mt-16 ${className}`}>
      {children}
    </section>
  );
}
