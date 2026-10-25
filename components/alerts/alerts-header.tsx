"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlertsHeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onFilterClick?: () => void;
  isFilterOpen?: boolean;
  totalAlertsCount?: number;
}

export function AlertsHeader({
  searchQuery = "",
  onSearchChange,
  onFilterClick,
  isFilterOpen = false,
  totalAlertsCount = 0,
}: AlertsHeaderProps) {
  return (
    <div className="flex flex-col gap-5 pt-6 pb-2">
      {/* 4. Page Title & Subtitle + Count Badge */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-1 border-b border-slate-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#16273B]">
            Alerts & Deadlines
          </h1>
          <p className="mt-1 text-sm sm:text-base text-[#243B53]/80">
            Stay on top of important policy updates and upcoming actions.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold text-[#16273B] border border-slate-200/60 shadow-2xs">
            {totalAlertsCount} {totalAlertsCount === 1 ? "alert" : "alerts"} recorded
          </span>
        </div>
      </div>

      {/* 6. Search Bar & Type Filter Toggle */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#7899B8]"
            aria-hidden="true"
          />
          <input
            id="alerts-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search alerts, policies, or topics…"
            className="w-full h-11 rounded-xl border border-slate-200/80 bg-white pl-10 pr-9 text-xs sm:text-sm text-[#16273B] placeholder:text-muted-foreground shadow-xs outline-none focus:border-[#7899B8] focus:bg-white focus:ring-1 focus:ring-[#7899B8] transition-all"
            aria-label="Search alerts, policies, or topics"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange?.("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#16273B] p-0.5 cursor-pointer transition-colors"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <Button
          id="alerts-filter-btn"
          variant="outline"
          onClick={onFilterClick}
          aria-label="Filter alerts by type"
          className={`h-11 px-4 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
            isFilterOpen
              ? "bg-[#16273B] text-white border-[#16273B] hover:bg-[#243B53]"
              : "border-slate-200/80 bg-white text-[#16273B] hover:bg-[#FAF8F5]"
          }`}
        >
          <SlidersHorizontal className="size-4 text-[#7899B8]" aria-hidden="true" />
          <span className="hidden sm:inline">Type Filter</span>
        </Button>
      </div>
    </div>
  );
}
