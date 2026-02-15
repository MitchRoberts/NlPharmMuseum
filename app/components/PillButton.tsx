// app/components/ui/PillButton.tsx
import Link from "next/link";
import React from "react";

export default function PillButton({
  href,
  children,
  variant = "primary",
  className = "",
  target,
  rel,
  onClick,
  type,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "soft";
  className?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition";

  const styles =
    variant === "primary"
      ? "bg-black text-white hover:opacity-90"
      : "bg-black/5 text-black hover:bg-black/10";

  if (href) {
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

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={[base, styles, className].join(" ")}
    >
      {children}
    </button>
  );
}
