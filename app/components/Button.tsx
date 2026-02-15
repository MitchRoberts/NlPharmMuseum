// app/components/Button.tsx
import Link from "next/link";
import React from "react";

type Variant = "primary" | "soft";

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  target?: string;
  rel?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition";

  const styles =
    variant === "primary"
      ? "bg-black text-white hover:opacity-90"
      : "bg-black/5 text-black hover:bg-black/10";

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={[base, styles, className].join(" ")}
    >
      {children}
    </Link>
  );
}
