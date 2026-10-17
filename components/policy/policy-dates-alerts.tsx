import Link from "next/link";
import { Calendar, Bell, Clock, ArrowRight } from "lucide-react";
import type { Policy, PolicyDateMilestone, EnrichedAlert } from "@/lib/policies";
import { cn } from "@/lib/utils";

interface PolicyDatesAlertsProps {
  policy: Policy;
  milestones: PolicyDateMilestone[];
  relatedAlerts: EnrichedAlert[];
}

export function PolicyDatesAlerts({
  policy,
  milestones,
  relatedAlerts,
}: PolicyDatesAlertsProps) {
  const hasDates = milestones.length > 0;

  return (
    <section className="flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-status-amber" aria-hidden="true" />
          <h2 className="text-xl font-bold tracking-tight text-brand-navy">
            Important Dates & Alerts
          </h2>
        </div>

        {relatedAlerts.length > 0 && (
          <Link
            href="/alerts"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-blue hover:underline"
          >
            <span>View all enterprise alerts</span>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>

      <p className="text-sm text-slate-600">
        Track critical filing windows, consultation cutoffs, and regulatory milestones for <strong className="text-brand-navy font-semibold">{policy.title}</strong>.
      </p>

      {/* Active Phase 6 Alerts Banner */}
      {relatedAlerts.length > 0 && (
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/25 p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-status-amber" aria-hidden="true" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-status-amber">
              Active Legislative & Regulatory Alerts ({relatedAlerts.length})
            </h3>
          </div>

          <div className="space-y-3">
            {relatedAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/90 p-3.5 rounded-xl border border-amber-200/60 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-brand-navy">
                      {alert.title}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                        alert.calculatedStatus === "urgent"
                          ? "bg-status-amber text-white"
                          : alert.calculatedStatus === "overdue"
                          ? "bg-status-red text-white"
                          : "bg-slate-600 text-white"
                      )}
                    >
                      {alert.calculatedStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {alert.message}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto text-xs">
                  {alert.daysRemaining !== undefined && alert.calculatedStatus !== "completed" && (
                    <span className="font-semibold text-brand-navy flex items-center gap-1">
                      <Clock className="size-3.5 text-slate-400" aria-hidden="true" />
                      {alert.daysRemaining < 0
                        ? `${Math.abs(alert.daysRemaining)}d overdue`
                        : `${alert.daysRemaining}d left`}
                    </span>
                  )}
                  <Link
                    href="/alerts"
                    className="font-semibold text-primary-blue hover:underline whitespace-nowrap"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dates & Milestones Grid */}
      {hasDates ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((m, idx) => {
            const isUrgent = m.status === "urgent";
            const isOverdue = m.status === "overdue";
            const isCompleted = m.status === "completed";

            let statusBadge = "bg-slate-100 text-slate-700 border-slate-200";
            if (isUrgent) statusBadge = "bg-status-amber/15 text-status-amber border-status-amber/30";
            if (isOverdue) statusBadge = "bg-status-red/15 text-status-red border-status-red/30";
            if (isCompleted) statusBadge = "bg-status-green/15 text-status-green border-status-green/30";

            return (
              <div
                key={idx}
                className={cn(
                  "rounded-2xl border p-5 shadow-xs bg-white flex flex-col justify-between gap-4 transition-all hover:shadow-md",
                  isUrgent ? "border-amber-300/80 bg-amber-50/20" : "border-slate-200/90"
                )}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {m.label}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
                        statusBadge
                      )}
                    >
                      {m.status}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-brand-navy">
                      {m.date}
                    </h3>
                    {m.daysRemaining !== undefined && !isCompleted && (
                      <span className="text-xs font-semibold text-slate-500">
                        ({m.daysRemaining < 0
                          ? `passed ${Math.abs(m.daysRemaining)} days ago`
                          : m.daysRemaining === 0
                          ? "today"
                          : `in ${m.daysRemaining} days`})
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="truncate">
                    Source: <span className="font-medium text-slate-700">{m.source}</span>
                  </span>
                  <span className="capitalize font-medium text-slate-600 shrink-0">
                    {m.type} milestone
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-6 text-center text-sm text-slate-500 space-y-1">
          <p className="font-semibold text-brand-navy">
            No specific action deadline is available in the current policy data.
          </p>
          <p className="text-xs text-slate-500">
            This regulation operates as general statutory guidance or has ongoing compliance duties.
          </p>
        </div>
      )}
    </section>
  );
}
