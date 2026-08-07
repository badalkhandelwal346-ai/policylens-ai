import { FileText } from "lucide-react";

export function SummaryCard() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-brand-card p-4">
      <div className="flex items-center gap-2">
        <FileText
          className="size-4 shrink-0 text-brand-navy"
          aria-hidden="true"
        />
        <h2 className="text-sm font-semibold text-brand-navy">
          Simple Summary
        </h2>
      </div>

      <p className="text-sm leading-relaxed text-brand-muted-foreground">
        This policy mandates all FinTech companies operating within federal
        jurisdictions to implement zero-trust architecture and multi-factor
        authentication for all internal database access. It specifically targets
        the prevention of identity-spoofing in real-time transaction processing.
      </p>
    </div>
  );
}
