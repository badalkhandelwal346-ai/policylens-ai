import { BookOpen, Target, CheckCircle2 } from "lucide-react";
import type { Policy } from "@/lib/policies";

interface PolicyOverviewProps {
  policy: Policy;
}

export function PolicyOverview({ policy }: PolicyOverviewProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-border/60 pb-3">
        <BookOpen className="size-5 text-primary-blue" aria-hidden="true" />
        <h2 className="text-xl font-bold tracking-tight text-brand-navy">
          Policy Overview
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col gap-5">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-brand-navy">
            Regulatory Intent & Objective
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-slate-700">
            {policy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-4 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Target className="size-3.5 text-primary-blue" aria-hidden="true" />
              Target Sector & Jurisdiction
            </span>
            <p className="text-sm font-semibold text-brand-navy">
              {policy.category} • Administered by {policy.source}
            </p>
            <p className="text-xs text-slate-500 leading-normal">
              Applies across relevant commercial operational thresholds defined by the issuing authority.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-4 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-status-green" aria-hidden="true" />
              Current Regulatory Status
            </span>
            <p className="text-sm font-semibold text-brand-navy">
              {policy.status}
            </p>
            <p className="text-xs text-slate-500 leading-normal">
              {policy.deadline
                ? `Active regulatory track with key milestone: ${policy.deadline}.`
                : "Active guidance document without fixed closing milestone."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
