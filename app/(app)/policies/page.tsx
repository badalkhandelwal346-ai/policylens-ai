"use client";

import { useState, useMemo } from "react";
import { Filter, X } from "lucide-react";
import data from "@/data/policies.json";

import { PoliciesSearch } from "@/components/policies/policies-search";
import { PoliciesFilter } from "@/components/policies/policies-filter";
import { DiscoveryPolicyCard } from "@/components/policies/discovery-policy-card";

// Extract all policies
const allPolicies = [...data.urgentPolicies, ...data.recommendedPolicies];

export default function PoliciesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Derive unique filter options
  const categories = useMemo(() => {
    const cats = new Set(allPolicies.map((p) => p.category));
    return Array.from(cats).sort();
  }, []);

  const statuses = useMemo(() => {
    const stats = new Set(allPolicies.map((p) => p.status));
    return Array.from(stats).sort();
  }, []);

  // Filter logic
  const filteredPolicies = useMemo(() => {
    return allPolicies.filter((policy) => {
      // 1. Search matching
      const matchesSearch =
        searchQuery === "" ||
        [policy.title, policy.description, policy.category, policy.source]
          .some((field) =>
            field?.toLowerCase().includes(searchQuery.toLowerCase())
          );

      // 2. Category matching (OR logic within categories)
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(policy.category);

      // 3. Status matching (OR logic within statuses)
      const matchesStatus =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(policy.status);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategories, selectedStatuses]);

  // Handlers
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
  };

  const removeCategory = (category: string) => toggleCategory(category);
  const removeStatus = (status: string) => toggleStatus(status);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategories.length > 0 ||
    selectedStatuses.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Area */}
      <div className="bg-white border-b border-border px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-brand-navy mb-2">
              Policies
            </h1>
            <p className="text-brand-muted-foreground text-lg">
              Discover policies relevant to your business.
            </p>
          </div>
          <div className="flex items-center text-sm font-medium text-brand-muted-foreground bg-brand-muted px-4 py-2 rounded-full self-start">
            {filteredPolicies.length}{" "}
            {filteredPolicies.length === 1 ? "policy" : "policies"} found
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Search & Mobile Filter Trigger */}
        <div className="flex items-center gap-4 mb-8">
          <PoliciesSearch value={searchQuery} onChange={setSearchQuery} />
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex shrink-0 items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-bold text-brand-navy shadow-sm hover:bg-muted transition-colors"
          >
            <Filter className="size-5" />
            <span>Filter</span>
          </button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Filters (Desktop Sidebar / Mobile Drawer) */}
          <div className="lg:col-span-3 w-full">
            <PoliciesFilter
              categories={categories}
              statuses={statuses}
              selectedCategories={selectedCategories}
              selectedStatuses={selectedStatuses}
              onCategoryChange={toggleCategory}
              onStatusChange={toggleStatus}
              isMobileOpen={isMobileFilterOpen}
              onMobileClose={() => setIsMobileFilterOpen(false)}
            />
          </div>

          {/* Results Area */}
          <div className="lg:col-span-9 min-w-0 flex flex-col gap-6 w-full">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pb-2">
                <span className="text-sm font-medium text-brand-muted-foreground mr-2">
                  Active:
                </span>
                {selectedCategories.map((cat) => (
                  <span
                    key={`cat-${cat}`}
                    className="flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm text-brand-navy shadow-sm"
                  >
                    {cat}
                    <button
                      onClick={() => removeCategory(cat)}
                      className="text-brand-muted-foreground hover:text-status-red transition-colors ml-1"
                    >
                      <X className="size-3.5" />
                    </button>
                  </span>
                ))}
                {selectedStatuses.map((stat) => (
                  <span
                    key={`stat-${stat}`}
                    className="flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-sm text-brand-navy shadow-sm"
                  >
                    {stat}
                    <button
                      onClick={() => removeStatus(stat)}
                      className="text-brand-muted-foreground hover:text-status-red transition-colors ml-1"
                    >
                      <X className="size-3.5" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-sm font-medium text-primary-blue hover:text-primary-blue/80 underline-offset-4 hover:underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Policy Cards Grid/List */}
            {filteredPolicies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24 lg:pb-8 w-full">
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
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white p-12 text-center shadow-sm w-full">
                <div className="rounded-full bg-brand-muted p-4 mb-4">
                  <Filter className="size-8 text-brand-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">
                  No policies found.
                </h3>
                <p className="text-brand-muted-foreground mb-6 max-w-sm">
                  Try adjusting your filters.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="rounded-lg bg-primary-blue px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-primary-blue/90 transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
