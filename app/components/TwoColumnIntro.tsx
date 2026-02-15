// app/components/TwoColumnIntro.tsx
import React from "react";

export default function TwoColumnIntro({
  leftTitle,
  rightText,
  accentClass = "text-[#8b1d3b]",
}: {
  leftTitle: React.ReactNode;
  rightText: React.ReactNode;
  accentClass?: string;
}) {
  return (
    <div className="grid gap-10 md:gap-14 lg:grid-cols-2 items-start">
      <div>
        <div className={`text-5xl md:text-6xl font-medium ${accentClass}`}>
          {leftTitle}
        </div>
      </div>

      <div className="text-black/80 leading-relaxed text-base md:text-lg">
        {rightText}
      </div>
    </div>
  );
}
