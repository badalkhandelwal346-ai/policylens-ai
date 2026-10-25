"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Check, Clock, AlertTriangle, FileText, Info } from "lucide-react";
import {
  getActionRequiredAlerts,
  getUpcomingDeadlines,
  getAllPolicies,
} from "@/lib/policies";
import { BUSINESS_PROFILE_KEY, readLocalStorageItem } from "@/lib/local-storage";

type BusinessProfile = {
  businessName?: string;
  industry?: string;
  stateOfOperation?: string;
};

export function TrackingSummaryCard() {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);

  useEffect(() => {
    const saved = readLocalStorageItem<BusinessProfile>(BUSINESS_PROFILE_KEY);
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(saved);
    }
  }, []);

  const actionCount = getActionRequiredAlerts().length;
  const deadlineCount = getUpcomingDeadlines().length;
  const policyCount = getAllPolicies().length;

  const hasProfile = !!(profile?.businessName && (profile?.industry || profile?.stateOfOperation));


  return (
    <section aria-label="Policy Tracking Summary">
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#7899B8]/20 text-[#16273B]">
              <ShieldCheck className="size-4" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-[#16273B] leading-tight">
                Policy Tracking Status
              </h3>
              <p className="text-[11px] text-muted-foreground leading-tight">
                Current statutory coverage overview
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-[#7899B8]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#16273B]">
            Active
          </span>
        </div>

        {/* Structured Status Items */}
        <div className="space-y-2 mt-3.5">
          {/* Outstanding Actions */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-border/60">
            <div className="flex items-center gap-2 text-xs">
              <AlertTriangle className="size-3.5 text-[#DC2626]" />
              <span className="font-semibold text-[#16273B]">Actions Requiring Review</span>
            </div>
            <span className="text-xs font-bold text-[#DC2626] bg-[#DC2626]/10 px-2 py-0.5 rounded-md">
              {actionCount} {actionCount === 1 ? "item" : "items"}
            </span>
          </div>

          {/* Upcoming Deadlines */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-border/60">
            <div className="flex items-center gap-2 text-xs">
              <Clock className="size-3.5 text-[#2563EB]" />
              <span className="font-semibold text-[#16273B]">Upcoming Deadlines</span>
            </div>
            <span className="text-xs font-bold text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-md">
              {deadlineCount} {deadlineCount === 1 ? "date" : "dates"}
            </span>
          </div>

          {/* Total Monitored Policies */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-border/60">
            <div className="flex items-center gap-2 text-xs">
              <FileText className="size-3.5 text-[#7899B8]" />
              <span className="font-semibold text-[#16273B]">Tracked Policy Frameworks</span>
            </div>
            <span className="text-xs font-bold text-[#16273B] bg-[#7899B8]/15 px-2 py-0.5 rounded-md">
              {policyCount} total
            </span>
          </div>

          {/* Business Profile Calibration */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-border/60">
            <div className="flex items-center gap-2 text-xs">
              <Check className="size-3.5 text-emerald-600" />
              <span className="font-semibold text-[#16273B]">Profile Scope</span>
            </div>
            <span className="text-xs font-medium text-slate-600 truncate max-w-[120px]">
              {hasProfile ? profile?.stateOfOperation || "Calibrated" : "Default"}
            </span>
          </div>
        </div>

        {/* Honest Disclaimer */}
        <div className="mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-2">
          <Info className="size-3.5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-500 leading-normal">
            Status reflects published government notifications in the sample dataset. Does not constitute certified legal compliance.
          </p>
        </div>

        {/* Footer Link */}
        <div className="mt-3 pt-3 border-t border-border/60 text-right">
          <Link
            href="/business"
            className="text-xs font-semibold text-[#2563EB] hover:underline"
          >
            Adjust business profile scope →
          </Link>
        </div>
      </div>
    </section>
  );
}
