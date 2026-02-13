import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#4b2e3a] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          
          {/* Visiting the Museum */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Visiting the Museum
            </h3>
            <p className="text-sm leading-relaxed text-white/80">
              Apothecary Hall<br />
              488 Water St.<br />
              St. John's, NL A1E 1B3<br />
              <a
                href="mailto:hello@nlpharmacymuseum.ca"
                className="underline hover:text-white"
              >
                hello@nlpharmacymuseum.ca
              </a><br />
              Registered Charity CRA No. 768787301RR0001
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Opening Hours
            </h3>
            <p className="text-sm leading-relaxed text-white/80">
              Seasonally May to October<br />
              Wed-Sun: 10:00am - 4:00pm<br />
              <br />
              Admission is free of charge.
            </p>
          </div>

          {/* Group Visits + Social */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
                Group Visits
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                Please email us for arranging group visits or special requests.
              </p>
            </div>

						<div className="mt-6 flex gap-4">
							<Link
								href="https://www.facebook.com/nlpharmacymuseum/"
								target="_blank"
								rel="noreferrer"
								aria-label="Facebook"
								className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition hover:scale-105 hover:shadow-md"
							>
								<FacebookIcon size={18} />
							</Link>

							<Link
								href="https://www.instagram.com/pharmacymuseumnl/"
								target="_blank"
								rel="noreferrer"
								aria-label="Instagram"
								className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E1306C] text-white shadow-sm transition hover:scale-105 hover:shadow-md"
							>
								<InstagramIcon size={18} />
							</Link>
						</div>
        	</div>
    		</div>

        {/* bottom line */}
        <div className="mt-12 border-t border-white/20 pt-6 text-sm text-white/60">
          © {new Date().getFullYear()} Newfoundland & Labrador Pharmacy Museum
        </div>
      </div>
    </footer>
  );
}
