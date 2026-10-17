"use client";

import { useMemo } from "react";
import Image from "next/image";
import { FilterX } from "lucide-react";
import { AlertCard } from "./alert-card";
import { getAlerts, type EnrichedAlert } from "@/lib/policies";
import { cn } from "@/lib/utils";

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
        const matchesAlertTitle = alert.title.toLowerCase().includes(q);
        const matchesMessage = alert.message.toLowerCase().includes(q);
        const matchesType = alert.type.toLowerCase().includes(q);
        const matchesPolicyTitle = alert.policy?.title.toLowerCase().includes(q) ?? false;
        const matchesPolicyCategory = alert.policy?.category.toLowerCase().includes(q) ?? false;
        const matchesPolicySource = alert.policy?.source?.toLowerCase().includes(q) ?? false;

        if (
          !matchesAlertTitle &&
          !matchesMessage &&
          !matchesType &&
          !matchesPolicyTitle &&
          !matchesPolicyCategory &&
          !matchesPolicySource
        ) {
          return false;
        }
      }

      return true;
    });
  }, [allAlerts, activeFilter, selectedType, searchQuery]);

  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-2">
      {/* Primary Status Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {STATUS_FILTERS.map((filter) => {
          const count = statusCounts[filter] ?? 0;
          const isActive = activeFilter.toLowerCase() === filter.toLowerCase();

          return (
            <button
              key={filter}
              id={`alerts-filter-${filter.toLowerCase()}-btn`}
              onClick={() => onFilterChange?.(filter)}
              className={cn(
                "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-colors border cursor-pointer",
                isActive
                  ? "bg-[#527884] text-white border-[#527884]"
                  : "bg-white text-[#2A434D] border-slate-200 hover:bg-slate-50"
              )}
            >
              <span>{filter}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.2 text-[10px] font-bold",
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-[#4D646E]"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Optional Type Filter Row (Toggled via header filter button) */}
      {showTypeFilters && (
        <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 bg-slate-100/70 rounded-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="text-[11px] font-bold text-[#78909C] uppercase pl-2 shrink-0">
            Type:
          </span>
          {TYPE_FILTERS.map((type) => {
            const isTypeActive = selectedType.toLowerCase() === type.toLowerCase();
            return (
              <button
                key={type}
                onClick={() => onTypeChange?.(type)}
                className={cn(
                  "whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer",
                  isTypeActive
                    ? "bg-white text-[#2A434D] shadow-xs font-semibold"
                    : "text-[#527884] hover:text-[#2A434D]"
                )}
              >
                {type}
              </button>
            );
          })}
        </div>
      )}

      {/* Alerts List or Empty State */}
      {filteredAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-2xl border border-dashed border-slate-200 my-2">
          <div className="rounded-full bg-slate-100 p-4 mb-3 text-slate-400">
            <FilterX className="size-8" aria-hidden="true" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-[#2A434D] mb-1">
            No alerts found
          </h3>
          <p className="text-xs sm:text-sm text-[#4D646E] max-w-xs mb-4">
            {searchQuery
              ? `No alerts or deadlines matched "${searchQuery}". Try a different search term or reset your filters.`
              : "No policy deadlines currently match the selected criteria."}
          </p>
          {(searchQuery || activeFilter !== "All" || selectedType !== "All") && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs sm:text-sm font-semibold text-primary-blue hover:underline cursor-pointer"
            >
              Reset search and filters
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
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

      {/* Contextual Insights Banner Card */}
      <div className="relative overflow-hidden rounded-2xl shadow-xs aspect-4/3 sm:aspect-16/9 w-full mt-2">
        <Image
          src="/images/policy-office.jpg"
          alt="Contextual Insights"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent flex flex-col justify-end p-5">
          <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase mb-1">
            CONTEXTUAL INSIGHTS
          </span>
          <h4 className="text-base font-bold text-white leading-snug max-w-[95%]">
            Stay ahead of the legislative curve with AI-driven compliance tracking.
          </h4>
        </div>
      </div>
    </div>
  );
}
