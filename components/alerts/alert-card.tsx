"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, ArrowRight, Calendar, Tag, Building2, AlertCircle } from "lucide-react";

import { AlertBadge } from "./alert-badge";
import { AlertIcon } from "./alert-icon";
import type { EnrichedAlert, AlertItem } from "@/lib/policies";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type AlertCardData = EnrichedAlert | AlertItem;

interface AlertCardProps {
  alert: AlertCardData;
  policyTitle?: string;
  policyCategory?: string;
  policySource?: string;
  className?: string;
}

export function AlertCard({ alert, policyTitle, policyCategory, policySource, className }: AlertCardProps) {
  const router = useRouter();
  const hasPolicy = !!policyTitle && alert.policyId !== "deleted-policy-id";
  const status = ("calculatedStatus" in alert && alert.calculatedStatus) ? alert.calculatedStatus : alert.status;
  const daysRemaining = "daysRemaining" in alert ? alert.daysRemaining : undefined;
  const formattedDate = ("formattedDate" in alert && alert.formattedDate) ? alert.formattedDate : alert.date;
  const statusNorm = status?.toLowerCase() || "";

  const targetHref = hasPolicy ? `/policy?id=${alert.policyId}` : undefined;
  const assistantHref = hasPolicy ? `/assistant?policyId=${alert.policyId}` : "/assistant";

  return (
    <article
      className={cn(
        "group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5",
        statusNorm === "overdue" && "border-l-4 border-l-rose-500",
        statusNorm === "urgent" && "border-l-4 border-l-amber-500",
        statusNorm === "completed" && "border-l-4 border-l-emerald-500",
        statusNorm === "upcoming" && "border-l-4 border-l-[#7899B8]",
        className
      )}
    >
      <div>
        {/* Top Header Row: Icon, Title, Status Badge, Countdown */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <AlertIcon type={alert.type} status={status} />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <AlertBadge priority={status} />

                {daysRemaining !== undefined && statusNorm !== "completed" && (
                  <span
                    className={cn(
                      "text-[11px] font-semibold",
                      daysRemaining < 0
                        ? "text-rose-600"
                        : daysRemaining <= 14
                        ? "text-amber-700"
                        : "text-slate-500"
                    )}
                  >
                    {daysRemaining < 0
                      ? `Overdue by ${Math.abs(daysRemaining)} ${Math.abs(daysRemaining) === 1 ? "day" : "days"}`
                      : daysRemaining === 0
                      ? "Due today"
                      : `Due in ${daysRemaining} ${daysRemaining === 1 ? "day" : "days"}`}
                  </span>
                )}
              </div>

              {targetHref ? (
                <Link href={targetHref} className="block group-hover:text-[#2563EB] transition-colors">
                  <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-[#16273B]">
                    {alert.title}
                  </h3>
                </Link>
              ) : (
                <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-[#16273B]">
                  {alert.title}
                </h3>
              )}
            </div>
          </div>
        </div>

        {/* Message / Short Explanation */}
        <p className="mt-1 text-xs sm:text-sm text-[#243B53]/80 leading-relaxed font-normal">
          {alert.message}
        </p>

        {/* Structured Metadata Box */}
        <div className="mt-3.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs text-slate-600">
          {/* Date */}
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="size-3.5 text-[#7899B8] shrink-0" aria-hidden="true" />
            <span className="text-slate-500">Date:</span>
            <span className="font-semibold text-[#16273B]">{formattedDate}</span>
          </div>

          {/* Type */}
          <div className="flex items-center gap-1.5 font-medium capitalize">
            <Tag className="size-3.5 text-[#7899B8] shrink-0" aria-hidden="true" />
            <span className="text-slate-500">Type:</span>
            <span className="font-semibold text-[#16273B]">{alert.type}</span>
          </div>

          {/* Source organization if available */}
          {policySource && (
            <div className="flex items-center gap-1.5 font-medium truncate max-w-[200px]">
              <Building2 className="size-3.5 text-[#7899B8] shrink-0" aria-hidden="true" />
              <span className="truncate">{policySource}</span>
            </div>
          )}
        </div>

        {/* Related Policy Reference */}
        {hasPolicy ? (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                Related:
              </span>
              <Link
                href={targetHref!}
                className="text-xs font-semibold text-[#16273B] hover:text-[#2563EB] transition-colors truncate"
              >
                {policyTitle}
              </Link>
            </div>

            {policyCategory && (
              <span className="shrink-0 text-[10px] font-medium text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200/80">
                {policyCategory}
              </span>
            )}
          </div>
        ) : (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-400">
            <AlertCircle className="size-3.5 text-slate-400 shrink-0" />
            <span>Policy framework reference archived or not in current catalogue.</span>
          </div>
        )}
      </div>

      {/* Action Buttons Row */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
        {hasPolicy ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(assistantHref)}
              className="h-8.5 px-3 text-xs font-semibold text-[#7899B8] hover:text-[#16273B] hover:bg-[#7899B8]/15 rounded-xl cursor-pointer flex items-center gap-1.5"
              title="Ask AI Assistant about this alert"
            >
              <Bot className="size-3.5 text-[#2563EB]" />
              <span>Ask AI</span>
            </Button>

            <Button
              size="sm"
              onClick={() => router.push(targetHref!)}
              className="h-8.5 rounded-xl px-4 text-xs font-semibold bg-[#16273B] text-white hover:bg-[#243B53] shadow-xs cursor-pointer flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <span>View Policy</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </>
        ) : (
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Completed compliance audit
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/policies")}
              className="h-8 rounded-xl text-xs font-semibold border-slate-200 cursor-pointer"
            >
              Explore Active Policies
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
