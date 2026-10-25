"use client";

import { AlertTriangle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertsOverviewMetricsProps = {
  urgentCount: number;
  upcomingCount: number;
  overdueCount: number;
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
};

export function AlertsOverviewMetrics({
  urgentCount,
  upcomingCount,
  overdueCount,
  activeFilter,
  onSelectFilter,
}: AlertsOverviewMetricsProps) {
  const metrics = [
    {
      id: "Urgent",
      label: "Urgent Attention",
      count: urgentCount,
      icon: AlertTriangle,
      iconBg: "bg-amber-50 text-amber-700",
      activeBorder: "border-amber-400 bg-amber-50/60 ring-1 ring-amber-400",
      badgeColor: "bg-amber-100 text-amber-800",
      description: "Due within 14 days",
    },
    {
      id: "Upcoming",
      label: "Upcoming Deadlines",
      count: upcomingCount,
      icon: Clock,
      iconBg: "bg-[#7899B8]/15 text-[#16273B]",
      activeBorder: "border-[#7899B8] bg-[#7899B8]/10 ring-1 ring-[#7899B8]",
      badgeColor: "bg-[#7899B8]/20 text-[#16273B]",
      description: "Scheduled milestones",
    },
    {
      id: "Overdue",
      label: "Overdue Items",
      count: overdueCount,
      icon: AlertCircle,
      iconBg: "bg-rose-50 text-rose-700",
      activeBorder: "border-rose-400 bg-rose-50/60 ring-1 ring-rose-400",
      badgeColor: "bg-rose-100 text-rose-800",
      description: "Past filing window",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
      {metrics.map((item) => {
        const Icon = item.icon;
        const isActive = activeFilter.toLowerCase() === item.id.toLowerCase();

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectFilter(isActive ? "All" : item.id)}
            className={cn(
              "flex flex-col justify-between p-4 rounded-2xl border bg-white shadow-xs transition-all text-left cursor-pointer hover:shadow-sm hover:border-[#7899B8]/60",
              isActive ? item.activeBorder : "border-slate-200/80"
            )}
            title={`Filter by ${item.label}`}
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-xl", item.iconBg)}>
                  <Icon className="size-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold text-[#16273B] tracking-tight">
                  {item.label}
                </span>
              </div>

              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-xs font-bold leading-none",
                  item.badgeColor
                )}
              >
                {item.count}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 font-medium">
              {item.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
