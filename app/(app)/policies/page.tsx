"use client";

import { useState, useMemo } from "react";
import { Filter, X, FileText, RotateCcw } from "lucide-react";
import { getAllPolicies, Policy } from "@/lib/policies";
import policiesData from "@/data/policies.json";

import { PoliciesOverviewMetrics } from "@/components/policies/policies-overview-metrics";
import { PoliciesSearch } from "@/components/policies/policies-search";
import { PoliciesFilter } from "@/components/policies/policies-filter";
import { DiscoveryPolicyCard } from "@/components/policies/discovery-policy-card";
import { Button } from "@/components/ui/button";

// Master policy dataset
const allPolicies: Policy[] = getAllPolicies();

export default function PoliciesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<"all" | "urgent" | "standard">("all");
  const [selectedDeadlineOnly, setSelectedDeadlineOnly] = useState(false);
  const [activeQuickFilter, setActiveQuickFilter] = useState<"all" | "urgent" | "recommended" | "deadlines" | null>("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Derive counts for overview metrics
  const totalCount = allPolicies.length;
  const urgentCount = useMemo(() => {
    return allPolicies.filter(
      (p) =>
        p.badge?.toLowerCase() === "high-impact" ||
        p.badge?.toLowerCase() === "strategic" ||
        p.status.toLowerCase().includes("urgent") ||
        policiesData.urgentPolicies.some((up) => up.id === p.id)
    ).length;
  }, []);

  const recommendedCount = useMemo(() => {
    return allPolicies.filter(
      (p) =>
        p.status.toLowerCase() === "recommended" ||
        policiesData.recommendedPolicies.some((rp) => rp.id === p.id)
    ).length;
  }, []);

  const deadlinesCount = useMemo(() => {
    return allPolicies.filter((p) => Boolean(p.deadline)).length;
  }, []);

  // Unique categories with counts
  const categoriesWithOptions = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of allPolicies) {
      if (p.category) {
        map.set(p.category, (map.get(p.category) || 0) + 1);
      }
    }
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Unique statuses with counts
  const statusesWithOptions = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of allPolicies) {
      if (p.status) {
        map.set(p.status, (map.get(p.status) || 0) + 1);
      }
    }
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Quick filter handler
  const handleSelectQuickFilter = (filter: "all" | "urgent" | "recommended" | "deadlines") => {
    if (activeQuickFilter === filter && filter !== "all") {
      // Toggle off
      setActiveQuickFilter("all");
      setSelectedPriority("all");
      setSelectedStatuses([]);
      setSelectedDeadlineOnly(false);
      return;
    }

    setActiveQuickFilter(filter);

    if (filter === "all") {
      setSelectedPriority("all");
      setSelectedStatuses([]);
      setSelectedDeadlineOnly(false);
    } else if (filter === "urgent") {
      setSelectedPriority("urgent");
      setSelectedStatuses([]);
      setSelectedDeadlineOnly(false);
    } else if (filter === "recommended") {
      setSelectedPriority("all");
      setSelectedStatuses(["Recommended"]);
      setSelectedDeadlineOnly(false);
    } else if (filter === "deadlines") {
      setSelectedPriority("all");
      setSelectedDeadlineOnly(true);
    }
  };

  // Filter and search logic
  const filteredPolicies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allPolicies.filter((policy) => {
      // 1. Search query
      if (q) {
        const searchableText = [
          policy.title,
          policy.description,
          policy.category,
          policy.status,
          policy.source,
          policy.benefits,
          policy.eligibility,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(q)) {
          return false;
        }
      }

      // 2. Category matching
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(policy.category)) {
          return false;
        }
      }

      // 3. Status matching
      if (selectedStatuses.length > 0) {
        if (!selectedStatuses.includes(policy.status)) {
          return false;
        }
      }

      // 4. Priority matching
      const isUrgent =
        policy.badge?.toLowerCase() === "high-impact" ||
        policy.badge?.toLowerCase() === "strategic" ||
        policy.status.toLowerCase().includes("urgent") ||
        policiesData.urgentPolicies.some((up) => up.id === policy.id);

      if (selectedPriority === "urgent" && !isUrgent) {
        return false;
      }
      if (selectedPriority === "standard" && isUrgent) {
        return false;
      }

      // 5. Deadlines matching
      if (selectedDeadlineOnly && !policy.deadline) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedCategories,
    selectedStatuses,
    selectedPriority,
    selectedDeadlineOnly,
  ]);

  // Handlers for toggles
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSelectedPriority("all");
    setSelectedDeadlineOnly(false);
    setActiveQuickFilter("all");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategories.length > 0 ||
    selectedStatuses.length > 0 ||
    selectedPriority !== "all" ||
    selectedDeadlineOnly;

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    selectedCategories.length +
    selectedStatuses.length +
    (selectedPriority !== "all" ? 1 : 0) +
    (selectedDeadlineOnly ? 1 : 0);

  return (
    <div className="relative mx-auto flex min-h-full w-full max-w-[1240px] flex-col bg-white pb-28 md:pb-16 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* 2 & 3. Page Heading and Result Count */}
      <div className="pt-6 pb-1 border-b border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#16273B]">
            Policies
          </h1>
          <p className="mt-1 text-sm sm:text-base text-[#243B53]/80">
            Discover policies relevant to your business.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold text-[#16273B] border border-slate-200/60 shadow-2xs">
            {filteredPolicies.length}{" "}
            {filteredPolicies.length === 1 ? "policy" : "policies"} found
          </span>
        </div>
      </div>

      {/* 4. Compact Overview Row */}
      <PoliciesOverviewMetrics
        totalCount={totalCount}
        urgentCount={urgentCount}
        recommendedCount={recommendedCount}
        deadlinesCount={deadlinesCount}
        activeQuickFilter={activeQuickFilter}
        onSelectQuickFilter={handleSelectQuickFilter}
      />

      {/* 5. Search Bar & Mobile Filter Trigger */}
      <div className="flex items-center gap-3">
        <PoliciesSearch
          value={searchQuery}
          onChange={setSearchQuery}
        />

        <Button
          variant="outline"
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden h-11 px-4 rounded-xl border-slate-200/80 bg-white text-xs font-semibold text-[#16273B] shadow-xs hover:bg-[#FAF8F5] cursor-pointer shrink-0 flex items-center gap-1.5"
        >
          <Filter className="size-4 text-[#7899B8]" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-[#2563EB] text-white size-4.5 flex items-center justify-center text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Main Discovery Workspace (Sidebar Filters + Results Area) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Filter Sidebar (3 cols on desktop) */}
        <div className="lg:col-span-3 w-full">
          <PoliciesFilter
            categories={categoriesWithOptions}
            statuses={statusesWithOptions}
            selectedCategories={selectedCategories}
            selectedStatuses={selectedStatuses}
            selectedPriority={selectedPriority}
            selectedDeadlineOnly={selectedDeadlineOnly}
            onCategoryChange={toggleCategory}
            onStatusChange={toggleStatus}
            onPriorityChange={setSelectedPriority}
            onDeadlineOnlyChange={setSelectedDeadlineOnly}
            onClearAll={clearAllFilters}
            hasActiveFilters={hasActiveFilters}
            isMobileOpen={isMobileFilterOpen}
            onMobileClose={() => setIsMobileFilterOpen(false)}
          />
        </div>

        {/* Right Policy Results Area (9 cols on desktop) */}
        <div className="lg:col-span-9 min-w-0 flex flex-col gap-4 w-full">
          {/* Active Filter Pills Bar */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
              <span className="font-semibold text-slate-500 mr-1">
                Active filters:
              </span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1 rounded-md bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-[#16273B] shadow-2xs">
                  Keyword: &ldquo;{searchQuery}&rdquo;
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-slate-400 hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                    aria-label="Remove search filter"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}

              {selectedPriority !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-md bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-[#16273B] shadow-2xs capitalize">
                  Priority: {selectedPriority}
                  <button
                    type="button"
                    onClick={() => setSelectedPriority("all")}
                    className="text-slate-400 hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                    aria-label="Remove priority filter"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}

              {selectedDeadlineOnly && (
                <span className="inline-flex items-center gap-1 rounded-md bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-[#16273B] shadow-2xs">
                  Active Deadlines Only
                  <button
                    type="button"
                    onClick={() => setSelectedDeadlineOnly(false)}
                    className="text-slate-400 hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                    aria-label="Remove deadline filter"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}

              {selectedCategories.map((cat) => (
                <span
                  key={`pill-cat-${cat}`}
                  className="inline-flex items-center gap-1 rounded-md bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-[#16273B] shadow-2xs"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className="text-slate-400 hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                    aria-label={`Remove category filter ${cat}`}
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}

              {selectedStatuses.map((stat) => (
                <span
                  key={`pill-stat-${stat}`}
                  className="inline-flex items-center gap-1 rounded-md bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-[#16273B] shadow-2xs"
                >
                  {stat}
                  <button
                    type="button"
                    onClick={() => toggleStatus(stat)}
                    className="text-slate-400 hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                    aria-label={`Remove status filter ${stat}`}
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}

              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-semibold text-[#2563EB] hover:underline ml-auto flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="size-3" />
                <span>Clear all</span>
              </button>
            </div>
          )}

          {/* Results Grid / List */}
          {filteredPolicies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              {filteredPolicies.map((policy) => (
                <DiscoveryPolicyCard
                  key={policy.id}
                  id={policy.id}
                  title={policy.title}
                  description={policy.description}
                  status={policy.status}
                  category={policy.category}
                  source={policy.source}
                  deadline={policy.deadline}
                  badge={policy.badge}
                  benefits={policy.benefits}
                />
              ))}
            </div>
          ) : (
            /* 10. Clean Empty State */
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-[#FAF8F5]/50 p-12 text-center w-full my-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#7899B8]/15 text-[#16273B] mb-3">
                <FileText className="size-6 text-[#7899B8]" />
              </div>
              <h3 className="text-base font-bold text-[#16273B]">
                No policies match your filters
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
                We couldn&apos;t find any regulatory policies matching your current search terms and criteria. Try clearing some filters or searching for broader keywords.
              </p>
              {hasActiveFilters && (
                <Button
                  onClick={clearAllFilters}
                  className="mt-4 h-9 rounded-xl px-4 text-xs font-semibold bg-[#16273B] text-white hover:bg-[#243B53] shadow-xs cursor-pointer"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
