"use client";

import { useMemo } from "react";
import { FilterX, RotateCcw, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { AlertCard } from "./alert-card";
import { getAlerts, type EnrichedAlert } from "@/lib/policies";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const STATUS_FILTERS = ["All", "Urgent", "Upcoming", "Overdue", "Completed"] as const;
const TYPE_FILTERS = ["All", "Deadline", "Application", "Filing"] as const;

interface AlertsListProps {
  searchQuery?: string;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  selectedType?: string;
  onTypeChange?: (type: string) => void;
  showTypeFilters?: boolean;
  onResetFilters?: () => void;
}

export function AlertsList({
  searchQuery = "",
  activeFilter = "All",
  onFilterChange,
  selectedType = "All",
  onTypeChange,
  showTypeFilters = false,
  onResetFilters,
}: AlertsListProps) {
  // Load centralized enriched alerts
  const allAlerts = useMemo<EnrichedAlert[]>(() => {
    return getAlerts();
  }, []);

  // Compute status counts for badges
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allAlerts.length };
    STATUS_FILTERS.forEach((sf) => {
      if (sf !== "All") {
        counts[sf] = allAlerts.filter(
          (a) => a.calculatedStatus.toLowerCase() === sf.toLowerCase()
        ).length;
      }
    });
    return counts;
  }, [allAlerts]);

  // Filter alerts based on activeFilter, selectedType, and searchQuery
  const filteredAlerts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allAlerts.filter((alert) => {
      // 1. Status Filter
      if (
        activeFilter !== "All" &&
        alert.calculatedStatus.toLowerCase() !== activeFilter.toLowerCase()
      ) {
        return false;
      }

      // 2. Type Filter
      if (
        selectedType !== "All" &&
        alert.type.toLowerCase() !== selectedType.toLowerCase()
      ) {
        return false;
      }

      // 3. Search query
      if (q) {
        const searchableFields = [
          alert.title,
          alert.message,
          alert.type,
          alert.policy?.title,
          alert.policy?.category,
          alert.policy?.source,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!searchableFields.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }, [allAlerts, activeFilter, selectedType, searchQuery]);

  // Grouped breakdown when viewing "All"
  const needsAttentionAlerts = useMemo(() => {
    return filteredAlerts.filter(
      (a) => a.calculatedStatus === "urgent" || a.calculatedStatus === "overdue"
    );
  }, [filteredAlerts]);

  const upcomingAlerts = useMemo(() => {
    return filteredAlerts.filter((a) => a.calculatedStatus === "upcoming");
  }, [filteredAlerts]);

  const completedAlerts = useMemo(() => {
    return filteredAlerts.filter((a) => a.calculatedStatus === "completed");
  }, [filteredAlerts]);

  const isGroupedView = activeFilter === "All" && !searchQuery && selectedType === "All";

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Primary Status Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STATUS_FILTERS.map((filter) => {
            const count = statusCounts[filter] ?? 0;
            const isActive = activeFilter.toLowerCase() === filter.toLowerCase();

            return (
              <button
                key={filter}
                id={`alerts-filter-${filter.toLowerCase()}-btn`}
                type="button"
                onClick={() => onFilterChange?.(filter)}
                className={cn(
                  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition-all border cursor-pointer",
                  isActive
                    ? "bg-[#16273B] text-white border-[#16273B] shadow-xs"
                    : "bg-white text-slate-700 border-slate-200/80 hover:bg-[#FAF8F5] hover:border-[#7899B8]/50"
                )}
              >
                <span>{filter}</span>
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.2 text-[10px] font-bold",
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Type Filter Pills if toggled */}
        {showTypeFilters && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/80 border border-slate-200/60 overflow-x-auto text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase px-2 shrink-0">
              Type:
            </span>
            {TYPE_FILTERS.map((type) => {
              const isTypeActive = selectedType.toLowerCase() === type.toLowerCase();
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onTypeChange?.(type)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer",
                    isTypeActive
                      ? "bg-white text-[#16273B] font-semibold shadow-2xs"
                      : "text-slate-600 hover:text-[#16273B]"
                  )}
                >
                  {type}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Alerts Results Content */}
      {filteredAlerts.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-[#FAF8F5]/50 p-12 text-center w-full my-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[#7899B8]/15 text-[#16273B] mb-3">
            <FilterX className="size-6 text-[#7899B8]" />
          </div>
          <h3 className="text-base font-bold text-[#16273B]">
            No alerts match your current filters
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
            {searchQuery
              ? `No alerts or policy deadlines matched "${searchQuery}". Try clearing search keywords or choosing a different status filter.`
              : "No regulatory deadlines currently match the selected criteria."}
          </p>
          {(searchQuery || activeFilter !== "All" || selectedType !== "All") && (
            <Button
              onClick={onResetFilters}
              className="mt-4 h-9 rounded-xl px-4 text-xs font-semibold bg-[#16273B] text-white hover:bg-[#243B53] shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset search and filters</span>
            </Button>
          )}
        </div>
      ) : isGroupedView ? (
        /* Section 7 Grouped View (Needs Attention -> Upcoming -> Completed) */
        <div className="space-y-8 w-full">
          {/* 1. Needs Attention (Urgent & Overdue) */}
          {needsAttentionAlerts.length > 0 && (
            <section aria-label="Needs Attention Alerts">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-rose-50 text-rose-700">
                    <AlertTriangle className="size-4" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-bold tracking-tight text-[#16273B]">
                    Action Required & Urgent Attention
                  </h2>
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-800">
                    {needsAttentionAlerts.length}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                {needsAttentionAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    policyTitle={alert.policy?.title}
                    policyCategory={alert.policy?.category}
                    policySource={alert.policy?.source}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 2. Upcoming Deadlines */}
          {upcomingAlerts.length > 0 && (
            <section aria-label="Upcoming Deadlines">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                    <Clock className="size-4" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-bold tracking-tight text-[#16273B]">
                    Upcoming Statutory Deadlines
                  </h2>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-[#16273B]">
                    {upcomingAlerts.length}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                {upcomingAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    policyTitle={alert.policy?.title}
                    policyCategory={alert.policy?.category}
                    policySource={alert.policy?.source}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 3. Completed & Archived */}
          {completedAlerts.length > 0 && (
            <section aria-label="Completed Alerts">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-bold tracking-tight text-[#16273B]">
                    Completed Milestones
                  </h2>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                    {completedAlerts.length}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                {completedAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    policyTitle={alert.policy?.title}
                    policyCategory={alert.policy?.category}
                    policySource={alert.policy?.source}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        /* Filtered Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              policyTitle={alert.policy?.title}
              policyCategory={alert.policy?.category}
              policySource={alert.policy?.source}
            />
          ))}
        </div>
      )}
    </div>
  );
}
