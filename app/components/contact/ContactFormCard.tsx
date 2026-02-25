"use client";

import { useMemo, useState } from "react";
import SoftCard from "@/app/components/SoftCard";

const TO = "hello@nlpharmacymuseum.ca";

export default function ContactFormCard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = `Website contact from ${firstName} ${lastName}`.trim();
    const body = [
      `Name: ${firstName} ${lastName}`.trim(),
      `Email: ${email}`.trim(),
      "",
      "Message:",
      message,
    ].join("\n");

    return `mailto:${encodeURIComponent(TO)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [firstName, lastName, email, message]);

  return (
    <SoftCard className="p-6">
      <h3 className="text-lg font-semibold text-black">Send a message</h3>
      <p className="mt-2 text-sm text-black/60">
        This will open your email app with everything filled in.
      </p>

      <div className="mt-6 grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
            placeholder="First name"
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
            placeholder="Last name"
          />
        </div>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          placeholder="Email"
          inputMode="email"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[130px] w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          placeholder="Message"
        />

        <a
          href={mailtoHref}
          className="inline-flex w-fit items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Open Email App
        </a>
      </div>
    </SoftCard>
  );
}