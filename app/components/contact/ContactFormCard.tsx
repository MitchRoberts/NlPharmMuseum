// app/components/contact/ContactFormCard.tsx
import SoftCard from "@/app/components/SoftCard";

export default function ContactFormCard() {
  return (
    <SoftCard className="p-6">
      <h3 className="text-lg font-semibold text-black">Send a message</h3>
      <p className="mt-2 text-sm text-black/60">
        (Optional - we can remove this, or I can make it functional later.)
      </p>

      <div className="mt-6 grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
            placeholder="First name"
          />
          <input
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
            placeholder="Last name"
          />
        </div>

        <input
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          placeholder="Email"
        />

        <textarea
          className="min-h-[130px] w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          placeholder="Message"
        />

        <button
          type="button"
          className="inline-flex w-fit items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Submit
        </button>
      </div>
    </SoftCard>
  );
}
