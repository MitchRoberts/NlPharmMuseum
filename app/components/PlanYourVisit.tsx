import Link from "next/link";

export default function PlanVisit() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-semibold">Plan Your Visit</h2>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6">
          <h3 className="text-lg font-semibold">Hours</h3>
          <ul className="mt-3 text-sm text-black/70 space-y-2">
            <li><b>Wed-Sun:</b> 10:00 AM - 4:00 PM</li>
            <li><b>Sat-Sun:</b> Closed</li>
          </ul>

          <Link
            href="/visit"
            className="inline-block mt-6 px-5 py-3 rounded-full bg-black text-white text-sm font-semibold hover:opacity-90"
          >
            Visit Info
          </Link>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <h3 className="text-lg font-semibold">Location</h3>
          <p className="mt-3 text-sm text-black/70">
            ...
          </p>
          <Link
            href="/visit"
            className="inline-block mt-6 text-sm font-medium underline"
          >
            Get directions
          </Link>
        </div>
      </div>
    </section>
  );
}
