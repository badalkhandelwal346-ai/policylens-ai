"use client";

import { FileText, AlertTriangle, Sparkles, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

type PoliciesOverviewMetricsProps = {
  totalCount: number;
  urgentCount: number;
  recommendedCount: number;
  deadlinesCount: number;
  activeQuickFilter: "all" | "urgent" | "recommended" | "deadlines" | null;
  onSelectQuickFilter: (filter: "all" | "urgent" | "recommended" | "deadlines") => void;
};

export function PoliciesOverviewMetrics({
  totalCount,
  urgentCount,
  recommendedCount,
  deadlinesCount,
  activeQuickFilter,
  onSelectQuickFilter,
}: PoliciesOverviewMetricsProps) {
  const metrics = [
    {
      id: "all" as const,
      label: "All Policies",
      count: totalCount,
      icon: FileText,
      iconBg: "bg-slate-100 text-slate-700",
      activeBg: "border-[#7899B8] bg-[#7899B8]/10 ring-1 ring-[#7899B8]",
    },
    {
      id: "urgent" as const,
      label: "Urgent & High Impact",
      count: urgentCount,
      icon: AlertTriangle,
      iconBg: "bg-rose-50 text-rose-700",
      activeBg: "border-rose-400 bg-rose-50/70 ring-1 ring-rose-400",
    },
    {
      id: "recommended" as const,
      label: "Recommended",
      count: recommendedCount,
      icon: Sparkles,
      iconBg: "bg-blue-50 text-[#2563EB]",
      activeBg: "border-blue-400 bg-blue-50/70 ring-1 ring-blue-400",
    },
    {
      id: "deadlines" as const,
      label: "Upcoming Deadlines",
      count: deadlinesCount,
      icon: Calendar,
      iconBg: "bg-amber-50 text-amber-700",
      activeBg: "border-amber-400 bg-amber-50/70 ring-1 ring-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const isActive = activeQuickFilter === metric.id;

        return (
          <button
            key={metric.id}
            type="button"
            onClick={() => onSelectQuickFilter(metric.id)}
            className={cn(
              "flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl border bg-white shadow-xs transition-all text-left cursor-pointer hover:border-[#7899B8]/60 hover:shadow-sm",
              isActive ? metric.activeBg : "border-slate-200/80"
            )}
            title={`Filter by ${metric.label}`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", metric.iconBg)}>
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold text-[#16273B] truncate leading-tight">
                {metric.label}
              </span>
            </div>

            <span
              className={cn(
                "shrink-0 rounded-md px-2 py-0.5 text-xs font-bold leading-none",
                isActive ? "bg-white text-[#16273B] shadow-2xs" : "bg-slate-100 text-[#16273B]"
              )}
            >
              {metric.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
