"use client";

import { CheckCircle2, Circle, ShieldCheck, Sparkles } from "lucide-react";
import type { BusinessProfileData } from "./business-info-card";

interface ProfileReadinessCardProps {
  profile: BusinessProfileData;
  onCompleteClick?: () => void;
}

export function ProfileReadinessCard({
  profile,
  onCompleteClick,
}: ProfileReadinessCardProps) {
  const checklist = [
    {
      id: "business-name",
      label: "Business Name Configured",
      isComplete: Boolean(profile.businessName?.trim()),
      detail: profile.businessName?.trim() || "Missing business identity",
    },
    {
      id: "industry",
      label: "Industry Sector Selected",
      isComplete: Boolean(profile.industry?.trim()),
      detail: profile.industry || "Missing industry",
    },
    {
      id: "jurisdiction",
      label: "Operating Jurisdiction Selected",
      isComplete: Boolean(profile.stateOfOperation?.trim()),
      detail: profile.stateOfOperation || "Missing state",
    },
    {
      id: "business-type",
      label: "Legal Entity Structure Defined",
      isComplete: Boolean(profile.businessType?.trim()),
      detail: profile.businessType || "Missing entity type",
    },
  ];

  const completedCount = checklist.filter((item) => item.isComplete).length;
  const totalCount = checklist.length;
  const isFullyConfigured = completedCount === totalCount;

  return (
    <section
      aria-label="Profile Personalization Readiness"
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4"
    >
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-ai-cyan" />
            <h3 className="text-sm font-bold text-brand-navy">
              Personalization Status
            </h3>
          </div>
          <p className="text-[11px] text-slate-500">
            Real-time status based on your stored profile parameters.
          </p>
        </div>

        <span
          className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 ${
            isFullyConfigured
              ? "bg-emerald-50 text-status-green border border-emerald-200"
              : "bg-amber-50 text-status-amber border border-amber-200"
          }`}
        >
          {isFullyConfigured ? "Personalization Active" : "Setup Incomplete"}
        </span>
      </div>

      {/* Progress tracker line */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
          <span>Readiness Checklist</span>
          <span className="font-semibold text-brand-navy">
            {completedCount} of {totalCount} completed
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isFullyConfigured ? "bg-status-green" : "bg-[#7899B8]"
            }`}
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Real checklist items */}
      <ul className="space-y-2 pt-1" role="list">
        {checklist.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100"
          >
            {item.isComplete ? (
              <CheckCircle2 className="size-4 text-status-green shrink-0 mt-0.5" />
            ) : (
              <Circle className="size-4 text-slate-300 shrink-0 mt-0.5" />
            )}
            <div className="min-w-0 flex-1">
              <span className="font-medium text-brand-navy block">
                {item.label}
              </span>
              <span className="text-[11px] text-slate-400 truncate block">
                {item.detail}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {!isFullyConfigured && onCompleteClick && (
        <button
          type="button"
          onClick={onCompleteClick}
          className="w-full text-center py-2 text-xs font-semibold text-primary-blue bg-primary-blue/5 hover:bg-primary-blue/10 rounded-xl transition-colors cursor-pointer"
        >
          Complete missing fields →
        </button>
      )}

      <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-100 pt-2.5 flex items-start gap-1.5">
        <Sparkles className="size-3 text-ai-cyan shrink-0 mt-0.5" />
        <span>
          PolicyLens AI evaluates these verified parameters to filter matching statutory filings and deadline alerts.
        </span>
      </p>
    </section>
  );
}
