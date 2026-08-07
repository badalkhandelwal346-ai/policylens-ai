import { CheckCircle2, TrendingUp } from "lucide-react";

export function ImpactCard() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-brand-navy p-5 text-white shadow-sm">
      <div className="flex items-center gap-2">
        <TrendingUp className="size-5 shrink-0 text-white" aria-hidden="true" />
        <h2 className="text-base font-bold text-white leading-snug">
          Impact on Business
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-2.5">
          <CheckCircle2
            className="size-4 shrink-0 text-white/90 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-xs sm:text-sm font-medium leading-snug text-white/95">
            Increased operational overhead for compliance audit.
          </p>
        </div>

        <div className="flex items-start gap-2.5">
          <CheckCircle2
            className="size-4 shrink-0 text-white/90 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-xs sm:text-sm font-medium leading-snug text-white/95">
            Mandatory data localization for transaction logs.
          </p>
        </div>
      </div>
    </div>
  );
}
