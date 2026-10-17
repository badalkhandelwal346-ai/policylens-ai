import Link from "next/link";
import { FileText, Calendar, Building2, Bot, ArrowRight, Bell, ListChecks } from "lucide-react";
import type { Policy, PolicyProcedureStep } from "@/lib/policies";

interface PolicyNextStepsProps {
  policy: Policy;
  steps: PolicyProcedureStep[];
}

export function PolicyNextSteps({ policy, steps }: PolicyNextStepsProps) {
  return (
    <section id="action-steps" className="flex flex-col gap-4 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <ListChecks className="size-5 text-primary-blue" aria-hidden="true" />
          <h2 className="text-xl font-bold tracking-tight text-brand-navy">
            What should I do next?
          </h2>
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          {steps.length} Recommended Steps
        </span>
      </div>

      <p className="text-sm text-slate-600">
        Follow this structured, policy-specific operational procedure based on authoritative guidance from <strong className="text-brand-navy font-semibold">{policy.source}</strong>.
      </p>

      {/* Numbered Workflow List */}
      <div className="flex flex-col gap-4 mt-1">
        {steps.map((step) => {
          return (
            <div
              key={step.stepNumber}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white text-xs font-bold">
                    {step.stepNumber}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-brand-navy">
                    {step.title}
                  </h3>
                </div>

                {step.deadline && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-status-amber/15 text-status-amber border border-status-amber/30 px-3 py-0.5 text-xs font-bold self-start sm:self-auto">
                    <Calendar className="size-3.5" aria-hidden="true" />
                    Deadline: {step.deadline}
                  </span>
                )}
              </div>

              {/* Action Description */}
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-normal pl-0 sm:pl-10">
                {step.action}
              </p>

              {/* Step Metadata Box (Prerequisites, Documents, Authority) */}
              <div className="sm:ml-10 rounded-xl bg-slate-50 border border-slate-200/70 p-4 grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                {/* Prerequisites */}
                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wider text-slate-400 block text-[10px]">
                    Prerequisites
                  </span>
                  <span className="text-slate-700 font-medium">
                    {step.prerequisites}
                  </span>
                </div>

                {/* Responsible Authority */}
                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wider text-slate-400 block text-[10px]">
                    Official Authority Channel
                  </span>
                  <span className="text-brand-navy font-semibold flex items-center gap-1">
                    <Building2 className="size-3.5 text-slate-400" aria-hidden="true" />
                    {step.authority}
                  </span>
                </div>

                {/* Required Documents if specified */}
                {step.documents && step.documents.length > 0 && (
                  <div className="col-span-1 md:col-span-2 space-y-1.5 pt-2 border-t border-slate-200/60">
                    <span className="font-bold uppercase tracking-wider text-slate-400 block text-[10px]">
                      Required Documents & Filings
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {step.documents.map((doc, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-brand-navy shadow-2xs"
                        >
                          <FileText className="size-3 text-primary-blue" aria-hidden="true" />
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {step.sourceReference && (
                <div className="sm:ml-10 text-[11px] text-slate-400">
                  Reference: <span className="text-slate-500 font-medium">{step.sourceReference}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Conversion & Assistant Guidance CTAs */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-brand-navy p-6 text-white mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-sm">
        <div className="space-y-1.5">
          <h4 className="text-base font-bold flex items-center gap-2">
            <Bot className="size-5 text-ai-cyan" aria-hidden="true" />
            Need assistance executing these steps?
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            PolicyLens AI Assistant can generate tailored document checklists, explain regulatory formulas, or draft compliance queries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            id="policy-action-assistant-btn"
            href={`/assistant?policyId=${policy.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-ai-cyan text-white px-4 py-2.5 text-xs sm:text-sm font-bold shadow-xs hover:bg-ai-cyan/90 transition-transform active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <span>Ask AI for Guidance</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/alerts"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
          >
            <Bell className="size-4" aria-hidden="true" />
            <span>Track in Alerts</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
