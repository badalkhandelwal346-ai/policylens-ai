"use client";

import Link from "next/link";
import { AlertTriangle, Calendar, FileText, ArrowUpRight } from "lucide-react";
import {
  getActionRequiredAlerts,
  getUpcomingDeadlines,
  getAllPolicies,
} from "@/lib/policies";
import { cn } from "@/lib/utils";


export function DashboardMetrics() {
  // 1. Actions requiring attention
  const actionAlerts = getActionRequiredAlerts();
  const actionAlertsCount = actionAlerts.length;
  const overdueCount = actionAlerts.filter((a) => a.calculatedStatus === "overdue").length;

  // 2. Upcoming deadlines
  const upcoming = getUpcomingDeadlines();
  const upcomingDeadlinesCount = upcoming.length;
  const nextDeadlineDate = upcoming.length > 0 ? upcoming[0].formattedDate : null;

  // 3. Tracked policies
  const allPolicies = getAllPolicies();
  const totalPoliciesCount = allPolicies.length;
  const urgentPoliciesCount = allPolicies.filter((p) => p.badge === "high-impact" || p.badge === "strategic").length;

  const metrics = [
    {
      id: "metric-action-required",
      label: "Actions Requiring Attention",
      value: actionAlertsCount,
      subtext: overdueCount > 0 ? `${overdueCount} overdue filing` : "Immediate review needed",
      icon: AlertTriangle,
      iconBg: "bg-amber-50 text-amber-700 border border-amber-200/80",
      href: "/alerts",
      cta: "Review alerts",
    },
    {
      id: "metric-upcoming-deadlines",
      label: "Upcoming Deadlines",
      value: upcomingDeadlinesCount,
      subtext: nextDeadlineDate ? `Next due: ${nextDeadlineDate}` : "No immediate deadlines",
      icon: Calendar,
      iconBg: "bg-blue-50 text-blue-700 border border-blue-200/80",
      href: "/alerts",
      cta: "View schedule",
    },
    {
      id: "metric-tracked-policies",
      label: "Tracked Policies",
      value: totalPoliciesCount,
      subtext: `${urgentPoliciesCount} urgent • ${totalPoliciesCount - urgentPoliciesCount} recommended`,
      icon: FileText,
      iconBg: "bg-slate-100 text-[#16273B] border border-slate-200",
      href: "/policies",
      cta: "Browse library",
    },
  ];

  return (
    <section className="py-2" aria-label="Dashboard Overview Metrics">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.id}
              href={m.href}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:shadow-sm hover:border-[#7899B8]/60 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block truncate">
                    {m.label}
                  </span>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold tracking-tight text-[#16273B]">
                      {m.value}
                    </span>
                  </div>
                </div>

                <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", m.iconBg)}>
                  <Icon className="size-5" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 truncate mr-2 font-medium">
                  {m.subtext}
                </span>
                <span className="inline-flex items-center gap-0.5 font-semibold text-[#2563EB] group-hover:underline shrink-0">
                  {m.cta}
                  <ArrowUpRight className="size-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

