"use client";

import { FileEdit, AlertTriangle, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getActionRequiredAlerts } from "@/lib/policies";

export function ActionRequired() {
  const router = useRouter();
  const actionAlerts = getActionRequiredAlerts(3);

  if (actionAlerts.length === 0) return null;

  return (
    <section className="px-4 pt-6 lg:px-0 lg:pt-0">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-brand-navy">
          Action Required
        </h2>
        <button
          onClick={() => router.push("/alerts")}
          className="text-sm font-semibold text-primary-blue hover:text-primary-blue/80 cursor-pointer"
        >
          View all
        </button>
      </div>

      <div className="flex flex-col rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        {actionAlerts.map((action, i) => {
          const isUrgent = action.calculatedStatus === "urgent";
          const isOverdue = action.calculatedStatus === "overdue";
          const Icon = isUrgent ? AlertTriangle : FileEdit;
          const targetUrl = action.hasPolicy ? `/policy?id=${action.policyId}` : "/alerts";

          return (
            <div
              key={action.id}
              className={cn(
                "flex flex-col sm:flex-row sm:items-center gap-4 p-4 transition-colors",
                i !== 0 && "border-t border-border",
                isUrgent ? "bg-status-red/5 hover:bg-status-red/10" : "bg-white hover:bg-brand-muted/30"
              )}
            >
              <div
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-xl",
                  isUrgent || isOverdue
                    ? "bg-status-red/10 text-status-red"
                    : "bg-brand-muted text-brand-muted-foreground"
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold leading-snug text-brand-navy">
                    {action.title}
                  </p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                      isUrgent
                        ? "bg-status-amber/15 text-status-amber"
                        : "bg-status-red/15 text-status-red"
                    )}
                  >
                    {action.calculatedStatus}
                  </span>
                </div>
                <p className="text-xs leading-snug text-brand-muted-foreground line-clamp-1">
                  {action.message}
                </p>
                {action.daysRemaining !== undefined && (
                  <p className="text-[11px] font-medium text-slate-500">
                    {action.daysRemaining < 0
                      ? `Due date passed (${Math.abs(action.daysRemaining)} days ago)`
                      : `Due in ${action.daysRemaining} days`}
                  </p>
                )}
              </div>

              <Button
                id={`action-${action.id}-btn`}
                onClick={() => router.push(targetUrl)}
                className={cn(
                  "h-11 shrink-0 rounded-xl px-5 text-sm font-semibold transition-transform active:scale-95 flex items-center gap-2 cursor-pointer",
                  isUrgent
                    ? "bg-status-red text-white hover:bg-status-red/90 shadow-sm"
                    : "border-border bg-white text-primary-blue hover:bg-brand-muted",
                )}
                variant={isUrgent ? "default" : "outline"}
              >
                <FileText className="size-4" />
                {action.hasPolicy ? "View Policy" : "View Alert"}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
