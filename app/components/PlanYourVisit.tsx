import Link from "next/link";

export default function PlanVisit() {
  return (
    <section className="bg-[#eaf0db]">
      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-black/15 pt-6 mt-10" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mt-6 overflow-hidden rounded-3xl bg-white/70 backdrop-blur ring-1 ring-black/10 shadow-sm">
          {/* Header */}
          <div className="px-6 sm:px-8 py-6 border-b border-black/10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-black">
                  Plan Your Visit
                </h2>
                <p className="mt-1 text-sm sm:text-base text-black/70">
                  Hours, location, and directions—everything you need in one place.
                </p>
              </div>

              <Link
                href="/visit"
                className="text-sm font-medium text-black/70 hover:text-black underline underline-offset-4"
              >
                View details
              </Link>
            </div>

            {/* Quick facts */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-black/[0.04] ring-1 ring-black/10 px-4 py-3">
                <p className="text-xs font-semibold text-black/60">Season</p>
                <p className="mt-1 text-sm font-semibold text-black">May - October</p>
              </div>

              <div className="rounded-2xl bg-black/[0.04] ring-1 ring-black/10 px-4 py-3">
                <p className="text-xs font-semibold text-black/60">Hours</p>
                <p className="mt-1 text-sm font-semibold text-black">
                  Wed - Sun · 10:00 - 4:00
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="grid lg:grid-cols-2">
            {/* Left */}
            <div className="px-6 sm:px-8 py-6">
              <h3 className="text-base sm:text-lg font-semibold text-black">
                Location
              </h3>

              <div className="mt-4 rounded-2xl bg-white ring-1 ring-black/10 p-4">
                <p className="text-sm text-black/60">Apothecary Hall</p>
                <p className="mt-1 text-sm font-semibold text-black leading-relaxed">
                  488 Water St.
                  <br />
                  St. John's, NL A1E 1B3
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/visit"
                  className={[
                    "inline-flex items-center justify-center rounded-full",
                    "px-5 py-3 text-sm font-semibold",
                    "bg-black text-white hover:opacity-90",
                    "touch-manipulation select-none",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40",
                  ].join(" ")}
                >
                  Visit Info
                </Link>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Apothecary%20Hall%2C%20488%20Water%20St%2C%20St.%20John%27s%2C%20NL%20A1E%201B3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "inline-flex items-center justify-center rounded-full",
                    "px-5 py-3 text-sm font-semibold",
                    "bg-black/[0.04] text-black hover:bg-black/10",
                    "ring-1 ring-black/10",
                    "touch-manipulation select-none",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40",
                  ].join(" ")}
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="px-6 sm:px-8 py-6 lg:border-l border-black/10">
              <h3 className="text-base sm:text-lg font-semibold text-black">
                Map
              </h3>

              {/* tighter map container, less “empty” */}
              <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-black/10 bg-white">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/9]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2692.603419459551!2d-52.71585182257984!3d47.5560467914656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0ca3685c3441d7%3A0x3259b1431a445095!2sApothecary%20Hall!5e0!3m2!1sen!2sca!4v1771020649315!5m2!1sen!2sca"
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="mt-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Apothecary%20Hall%2C%20488%20Water%20St%2C%20St.%20John%27s%2C%20NL%20A1E%201B3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-black/80 underline underline-offset-4 hover:text-black"
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
