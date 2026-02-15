// app/components/visit/VisitInfoCard.tsx
import SoftCard from "@/app/components/SoftCard";
import InfoBlock from "./InfoBlock";

export default function VisitInfoCard({
  hoursLines,
  admissionLines,
  addressLines,
  phone,
  email,
  parkingLines,
  accessibilityLines,
}: {
  hoursLines: string[];
  admissionLines?: string[];
  addressLines: string[];
  phone?: string;
  email?: string;
  parkingLines?: string[];
  accessibilityLines?: string[];
}) {
  return (
    <SoftCard className="p-6 sm:p-7">
      <div className="grid gap-6 sm:grid-cols-2">
        <InfoBlock title="Hours" lines={hoursLines} />
        <InfoBlock title="Admission" lines={admissionLines} />
        <InfoBlock title="Address" lines={addressLines} />

        <div className="space-y-4">
          {!!phone && (
            <div>
              <p className="text-sm font-semibold text-black">Phone</p>
              <p className="mt-2 text-black/80">{phone}</p>
            </div>
          )}
          {!!email && (
            <div>
              <p className="text-sm font-semibold text-black">Email</p>
              <a className="mt-2 inline-block underline text-black/80" href={`mailto:${email}`}>
                {email}
              </a>
            </div>
          )}
        </div>

        <InfoBlock title="Parking" lines={parkingLines} />
        <InfoBlock title="Accessibility" lines={accessibilityLines} />
      </div>
    </SoftCard>
  );
}
