import { AlertTriangle } from "lucide-react";

export function RisksCard() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-brand-card p-4">
      <div className="flex items-center gap-2">
        <AlertTriangle
          className="size-4 shrink-0 text-red-600"
          aria-hidden="true"
        />
        <h2 className="text-sm font-semibold text-red-600">Risks</h2>
      </div>

      <p className="text-sm leading-relaxed text-brand-muted-foreground">
        Non-compliance by Oct 12th may result in license suspension and fines up
        to 4% of annual domestic revenue.
      </p>
    </div>
  );
}
