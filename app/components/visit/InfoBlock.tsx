// app/components/visit/InfoBlock.tsx
export default function InfoBlock({
  title,
  lines,
}: {
  title: string;
  lines?: string[];
}) {
  if (!lines?.length) return null;

  return (
    <div>
      <p className="text-sm font-semibold text-black">{title}</p>
      <div className="mt-2 space-y-1 text-black/80">
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
    </div>
  );
}
