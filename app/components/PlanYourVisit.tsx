import Link from "next/link";

export default function PlanVisit() {
  return (
    <section className="bg-[#eaf0db]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="border-t border-black/20 pt-6" />

        <div className="mt-6 rounded-3xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-black/10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <h2 className="text-2xl text-black font-semibold">Plan Your Visit</h2>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-black/5 px-4 py-3">
                <p className="text-xs font-semibold text-black/60">Season</p>
                <p className="mt-1 text-sm font-semibold text-black">May - October</p>
              </div>
              <div className="rounded-2xl bg-black/5 px-4 py-3">
                <p className="text-xs font-semibold text-black/60">Hours</p>
                <p className="mt-1 text-sm font-semibold text-black">
                  Wed - Sun · 10:00 - 4:00
                </p>
              </div>
              <div className="rounded-2xl bg-black/5 px-4 py-3">
                <p className="text-xs font-semibold text-black/60">Admission</p>
                <p className="mt-1 text-sm font-semibold text-black">Free</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="grid gap-0 lg:grid-cols-2">
            {/* Left details */}
            <div className="p-6 sm:p-8">
              <h3 className="text-lg text-black font-semibold">Location</h3>

              <div className="mt-4 rounded-2xl border border-black/10 p-4">
                <p className="text-sm text-black/60">Apothecary Hall</p>
                <p className="mt-1 text-sm font-semibold text-black">
                  488 Water St.<br />
                  St. John's, NL A1E 1B3
                </p>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/visit"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-black text-white text-sm font-semibold hover:opacity-90"
                >
                  Visit Info
                </Link>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Apothecary%20Hall%2C%20488%20Water%20St%2C%20St.%20John%27s%2C%20NL%20A1E%201B3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-black/5 text-black text-sm font-semibold hover:bg-black/10"
                >
                  Get Directions
                </a>
              </div>

              <p className="mt-4 text-xs text-black/50">
                Opens in Google Maps on mobile.
              </p>
            </div>

            {/* Right map */}
            <div className="p-6 sm:p-8 lg:border-l border-black/10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-black font-semibold">Map</h3>
                <Link
                  href="/visit"
                  className="text-sm font-medium text-black/70 hover:text-black underline"
                >
                  View details
                </Link>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-black/10">
                <div className="relative w-full aspect-[16/10]">
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
                  className="text-sm font-medium text-black/80 underline"
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
