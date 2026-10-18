"use client";

import { CalendarCheck2, Check, Layers, ShieldCheck } from "lucide-react";

export function ComplianceMatrixCard() {
  return (
    <div
      className="w-full rounded-2xl bg-white/95 p-4 sm:p-5 shadow-lg shadow-[#16273B]/10 border border-white/80 space-y-3"
      role="region"
      aria-label="Compliance Matrix feature preview"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-[#16273B] text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="size-4 text-white" strokeWidth={2.2} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-[#16273B] leading-tight truncate">
              Compliance Matrix
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
              Autonomous Scope Calibration
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/80 shrink-0">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          Live
        </span>
      </div>

      {/* Feature Row 1: Multi-jurisdiction Filter */}
      <div className="flex items-center justify-between gap-2.5 rounded-xl bg-slate-50/90 border border-slate-200/70 p-2.5 sm:p-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="size-7 rounded-lg bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
            <Layers className="size-3.5 text-blue-600" strokeWidth={2.2} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#16273B] leading-snug truncate">
              Multi-jurisdiction Filter Active
            </p>
            <p className="text-[10px] text-slate-500 leading-snug truncate">
              Excludes non-applicable state revisions
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200/80">
          99.8% Match
        </span>
      </div>

      {/* Feature Row 2: Statutory Calendar Sync */}
      <div className="flex items-center justify-between gap-2.5 rounded-xl bg-slate-50/90 border border-slate-200/70 p-2.5 sm:p-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="size-7 rounded-lg bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0">
            <CalendarCheck2 className="size-3.5 text-emerald-600" strokeWidth={2.2} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#16273B] leading-snug truncate">
              Statutory Calendar Sync
            </p>
            <p className="text-[10px] text-slate-500 leading-snug truncate">
              Quarterly reporting & filings tracked
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 shrink-0">
          <Check className="size-3 text-emerald-600" strokeWidth={2.5} aria-hidden="true" />
          <span>Synced</span>
        </div>
      </div>
    </div>
  );
}
