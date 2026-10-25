"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Bot } from "lucide-react";

import { AlertsHeader } from "./alerts-header";
import { AlertsOverviewMetrics } from "./alerts-overview-metrics";
import { AlertsList } from "./alerts-list";
import { getAlerts, type EnrichedAlert } from "@/lib/policies";

export function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [showTypeFilters, setShowTypeFilters] = useState(false);

  // Centralized alerts data
  const allAlerts = useMemo<EnrichedAlert[]>(() => {
    return getAlerts();
  }, []);

  // Compute metric counts
  const urgentCount = useMemo(() => {
    return allAlerts.filter((a) => a.calculatedStatus === "urgent").length;
  }, [allAlerts]);

  const upcomingCount = useMemo(() => {
    return allAlerts.filter((a) => a.calculatedStatus === "upcoming").length;
  }, [allAlerts]);

  const overdueCount = useMemo(() => {
    return allAlerts.filter((a) => a.calculatedStatus === "overdue").length;
  }, [allAlerts]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveFilter("All");
    setSelectedType("All");
  };

  const handleSelectQuickMetric = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="relative mx-auto flex min-h-full w-full max-w-[1240px] flex-col bg-white pb-28 md:pb-16 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* 4. Page Heading & Search Bar */}
      <AlertsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterClick={() => setShowTypeFilters((prev) => !prev)}
        isFilterOpen={showTypeFilters}
        totalAlertsCount={allAlerts.length}
      />

      {/* 5. Compact Summary Metrics Row (Urgent, Upcoming, Overdue) */}
      <AlertsOverviewMetrics
        urgentCount={urgentCount}
        upcomingCount={upcomingCount}
        overdueCount={overdueCount}
        activeFilter={activeFilter}
        onSelectFilter={handleSelectQuickMetric}
      />

      {/* 6 & 7. Status Filter Pills, Type Filters, and Grouped/Filtered Cards */}
      <AlertsList
        searchQuery={searchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        showTypeFilters={showTypeFilters}
        onResetFilters={handleResetFilters}
      />

      {/* Floating Action Button (FAB) for continuous AI Assistant access */}
      <Link
        id="alerts-ai-fab-btn"
        href="/assistant"
        aria-label="Ask PolicyLens AI"
        className="fixed right-6 bottom-20 md:bottom-8 z-40 flex items-center gap-2 rounded-full bg-[#16273B] text-white px-4 py-3 shadow-xl transition-all hover:scale-105 hover:bg-[#243B53] active:scale-95 group border border-white/20"
      >
        <div className="flex size-6 items-center justify-center rounded-full bg-[#2563EB] text-white">
          <Bot className="size-3.5" />
        </div>
        <span className="text-xs font-bold tracking-tight pr-1">
          Ask PolicyLens
        </span>
      </Link>
    </div>
  );
}
