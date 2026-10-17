import Link from "next/link";
import { Bot, FileText, Clock, AlertCircle } from "lucide-react";

import { AlertBadge } from "./alert-badge";
import { AlertIcon } from "./alert-icon";
import type { EnrichedAlert, AlertItem } from "@/lib/policies";
import { cn } from "@/lib/utils";

export type AlertCardData = EnrichedAlert | AlertItem;

interface AlertCardProps {
  alert: AlertCardData;
  policyTitle?: string;
  policyCategory?: string;
  policySource?: string;
}

export function AlertCard({ alert, policyTitle, policyCategory, policySource }: AlertCardProps) {
  const hasPolicy = !!policyTitle;
  const status = ("calculatedStatus" in alert && alert.calculatedStatus) ? alert.calculatedStatus : alert.status;
  const daysRemaining = "daysRemaining" in alert ? alert.daysRemaining : undefined;
  const formattedDate = ("formattedDate" in alert && alert.formattedDate) ? alert.formattedDate : alert.date;

  // Determine border accent style
  const statusNorm = status?.toLowerCase();
  let borderAccent = "border-l-[#527884]/40";
  if (statusNorm === "urgent") borderAccent = "border-l-status-amber";
  else if (statusNorm === "overdue") borderAccent = "border-l-status-red";
  else if (statusNorm === "completed") borderAccent = "border-l-status-green";
  else if (statusNorm === "upcoming") borderAccent = "border-l-[#527884]";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-[#F7F4EF] p-5 shadow-xs border-l-4 flex flex-col gap-3.5 transition-all hover:shadow-md",
        borderAccent
      )}
    >
      <div className="flex flex-col gap-3.5">
        {/* Header with Title & Badge */}
        <div className="flex items-center gap-2.5 flex-wrap justify-between">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <AlertIcon type={alert.type} status={status} />
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#2A434D] leading-snug">
                {alert.title}
              </h3>
            </div>
          </div>
          <AlertBadge priority={status} />
        </div>

        {/* Message */}
        <p className="text-sm text-[#4D646E] leading-relaxed font-normal">
          {alert.message}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-1 pb-1 text-xs sm:text-sm">
          <div>
            <span className="block text-[11px] font-bold tracking-wider text-[#78909C] uppercase">
              DATE
            </span>
            <span className="font-semibold text-[#2A434D] flex items-center gap-1.5 mt-0.5">
              {formattedDate}
            </span>
            {daysRemaining !== undefined && statusNorm !== "completed" && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#78909C] mt-0.5">
                <Clock className="size-3" />
                {daysRemaining < 0
                  ? `Overdue by ${Math.abs(daysRemaining)} ${Math.abs(daysRemaining) === 1 ? "day" : "days"}`
                  : daysRemaining === 0
                  ? "Due today"
                  : `Due in ${daysRemaining} ${daysRemaining === 1 ? "day" : "days"}`}
              </span>
            )}
          </div>

          <div>
            <span className="block text-[11px] font-bold tracking-wider text-[#78909C] uppercase">
              TYPE
            </span>
            <span className="font-medium text-[#2A434D] capitalize mt-0.5 block">
              {alert.type}
            </span>
          </div>

          {hasPolicy ? (
            <div className="col-span-2 pt-1 border-t border-[#2A434D]/10">
              <span className="block text-[11px] font-bold tracking-wider text-[#78909C] uppercase">
                RELATED POLICY
              </span>
              <Link
                href={`/policy?id=${alert.policyId}`}
                className="mt-0.5 text-sm font-semibold text-[#2A434D] hover:text-primary-blue transition-colors line-clamp-1 group flex items-center gap-1.5"
              >
                <span>{policyTitle}</span>
                {policyCategory && (
                  <span className="text-xs font-normal text-[#527884] bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    {policyCategory}
                  </span>
                )}
                {policySource && (
                  <span className="text-xs font-normal text-[#78909C] hidden sm:inline">
                    • {policySource}
                  </span>
                )}
              </Link>
            </div>
          ) : (
            <div className="col-span-2 pt-1 border-t border-[#2A434D]/10">
              <span className="block text-[11px] font-bold tracking-wider text-status-amber uppercase flex items-center gap-1">
                <AlertCircle className="size-3.5" />
                RELATED POLICY UNAVAILABLE
              </span>
              <p className="text-xs text-[#78909C] mt-0.5">
                This policy reference was archived or is not in the active dataset.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {hasPolicy && (
        <div className="flex items-center gap-3 pt-2">
          <Link
            id={`alert-primary-btn-${alert.id}`}
            href={`/policy?id=${alert.policyId}`}
            className="flex-1 rounded-xl bg-[#527884] py-2.5 px-4 text-center text-sm font-semibold text-white shadow-xs hover:bg-[#456670] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <FileText className="size-4" />
            View Policy
          </Link>
          <Link
            id={`alert-secondary-btn-${alert.id}`}
            href={`/assistant?policyId=${alert.policyId}`}
            className="flex-1 rounded-xl border border-[#2A434D]/30 bg-white py-2.5 px-4 text-center text-sm font-semibold text-[#2A434D] hover:bg-[#2A434D]/5 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Bot className="size-4" />
            Ask AI
          </Link>
        </div>
      )}
    </div>
  );
}
