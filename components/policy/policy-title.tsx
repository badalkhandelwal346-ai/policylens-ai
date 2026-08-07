import { ShieldCheck } from "lucide-react";

export function PolicyTitle() {
  return (
    <div className="px-4 pb-5 pt-1">
      {/* Government badge */}
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.48_0.14_165)] px-3 py-1.5 text-[10px] font-semibold tracking-widest text-white uppercase">
        <ShieldCheck className="size-3" aria-hidden="true" />
        Verified Government
      </span>

      {/* Title */}
      <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-brand-navy">
        Revised Cybersecurity Framework for FinTech Infrastructure (2024-B)
      </h1>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-brand-muted-foreground">
        A comprehensive update to federal data protection mandates for digital
        payment providers and cryptocurrency exchanges.
      </p>
    </div>
  );
}
