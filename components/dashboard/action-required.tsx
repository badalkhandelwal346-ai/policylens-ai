"use client";

import { AlertTriangle, Clock, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getActionRequiredAlerts } from "@/lib/policies";

export function ActionRequired() {
  const router = useRouter();
  const actionAlerts = getActionRequiredAlerts(3);

  return (
    <section className="pt-2" aria-label="Actions Requiring Attention">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-700">
            <AlertTriangle className="size-4" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-[#16273B]">
            Actions Requiring Attention
          </h2>
          {actionAlerts.length > 0 && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
              {actionAlerts.length}
            </span>
          )}
        </div>
        <Link
          href="/alerts"
          className="text-xs font-semibold text-[#2563EB] hover:underline"
        >
          View all alerts →
        </Link>
      </div>

      <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        {actionAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-[#FAF8F5]/40">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-2.5">
              <CheckCircle2 className="size-5 stroke-[2.2]" />
            </div>
            <h3 className="text-sm font-bold text-[#16273B]">
              No Outstanding Actions Required
            </h3>
            <p className="mt-1 text-xs text-muted-foreground max-w-sm">
              All monitored statutory filings and compliance milestones are up to date. You will be notified if new legislative obligations arise.
            </p>
            <Link
              href="/alerts"
              className="mt-3 text-xs font-semibold text-[#2563EB] hover:underline"
            >
              View alerts history →
            </Link>
          </div>
        ) : (
          actionAlerts.map((action, i) => {
            const isOverdue = action.calculatedStatus === "overdue";
            const isUrgent = action.calculatedStatus === "urgent";
            const targetUrl = action.hasPolicy ? `/policy?id=${action.policyId}` : "/alerts";

            return (
              <div
                key={action.id}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-4.5 transition-colors bg-white hover:bg-slate-50/70",
                  i !== 0 && "border-t border-slate-100"
                )}
              >
                {/* Status Indicator & Content */}
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <div
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl border mt-0.5",
                      isOverdue
                        ? "bg-rose-50 text-rose-600 border-rose-200/60"
                        : isUrgent
                        ? "bg-amber-50 text-amber-700 border-amber-200/60"
                        : "bg-slate-50 text-slate-600 border-slate-200/60"
                    )}
                  >
                    <AlertTriangle className="size-4" aria-hidden="true" />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-[#16273B] leading-snug">
                        {action.title}
                      </p>
                      <span
                        className={cn(
                          "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
                          isOverdue
                            ? "bg-rose-50 text-rose-700 border-rose-200/60"
                            : isUrgent
                            ? "bg-amber-50 text-amber-800 border-amber-200/60"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        )}
                      >
                        {action.calculatedStatus}
                      </span>
                    </div>

                    <p className="text-xs text-[#243B53]/80 leading-relaxed line-clamp-2">
                      {action.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-0.5 text-[11px] text-slate-500">
                      {action.formattedDate && (
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="size-3 text-[#7899B8]" />
                          Deadline: {action.formattedDate}
                        </span>
                      )}
                      {action.daysRemaining !== undefined && (
                        <span
                          className={cn(
                            "font-semibold",
                            action.daysRemaining < 0
                              ? "text-rose-600"
                              : action.daysRemaining <= 7
                              ? "text-amber-700"
                              : "text-slate-600"
                          )}
                        >
                          {action.daysRemaining < 0
                            ? `Overdue by ${Math.abs(action.daysRemaining)} days`
                            : `Due in ${action.daysRemaining} days`}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Single Clear Action */}
                <div className="shrink-0 self-end sm:self-center">
                  <Button
                    id={`action-${action.id}-btn`}
                    onClick={() => router.push(targetUrl)}
                    className="h-8.5 rounded-xl px-4 text-xs font-semibold bg-[#16273B] text-white hover:bg-[#243B53] shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <FileText className="size-3.5" />
                    <span>{action.hasPolicy ? "View Policy" : "Review Details"}</span>
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

