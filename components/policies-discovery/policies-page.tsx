"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, FileText, Calendar, Building2, AlertCircle } from "lucide-react";


import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllPolicies } from "@/lib/policies";

// The prototype dataset combines urgent and recommended policies.
const allPolicies = getAllPolicies();

// Extract unique categories and statuses for dynamic filtering
const allCategories = Array.from(new Set(allPolicies.map((p) => p.category)));
const allStatuses = Array.from(new Set(allPolicies.map((p) => p.status)));

export function PoliciesDiscoveryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleCategory = (cat: string) => {
    const next = new Set(selectedCategories);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    setSelectedCategories(next);
  };

  const toggleStatus = (status: string) => {
    const next = new Set(selectedStatuses);
    if (next.has(status)) next.delete(status);
    else next.add(status);
    setSelectedStatuses(next);
  };

  const filteredPolicies = useMemo(() => {
    return allPolicies.filter((policy) => {
      // 1. Search (title, description, category, source)
      const q = search.toLowerCase();
      const matchesSearch =
        q === "" ||
        policy.title.toLowerCase().includes(q) ||
        policy.description.toLowerCase().includes(q) ||
        policy.category.toLowerCase().includes(q) ||
        (policy.source && policy.source.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      // 2. Filters (category, status)
      const matchesCategory =
        selectedCategories.size === 0 || selectedCategories.has(policy.category);
      const matchesStatus =
        selectedStatuses.size === 0 || selectedStatuses.has(policy.status);

      return matchesCategory && matchesStatus;
    });
  }, [search, selectedCategories, selectedStatuses]);

  return (
    <div className="relative mx-auto flex min-h-full w-full max-w-[1400px] flex-col bg-background pb-24 md:px-8 xl:px-12">
      <div className="px-4 py-8 md:px-0">
        <h1 className="text-3xl font-bold tracking-tight text-brand-navy">Policies</h1>
        <p className="mt-2 text-brand-muted-foreground">
          Discover and filter government policies affecting your business.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 px-4 lg:px-0 pb-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <Button
            variant="outline"
            className="w-full justify-center text-brand-navy font-semibold h-12 rounded-xl"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Sidebar Filters */}
        <aside
          className={cn(
            "flex flex-col gap-6 lg:col-span-3 lg:flex",
            isFilterOpen ? "flex" : "hidden"
          )}
        >
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-brand-navy mb-4">Filters</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-brand-navy mb-3">Category</h3>
              <div className="flex flex-col gap-2">
                {allCategories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group py-1">
                    <div className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded transition-colors",
                      selectedCategories.has(cat) 
                        ? "bg-primary-blue border border-primary-blue text-white" 
                        : "border border-input bg-background group-hover:border-primary-blue"
                    )}>
                      {selectedCategories.has(cat) && (
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-brand-muted-foreground group-hover:text-brand-navy transition-colors">{cat}</span>
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={selectedCategories.has(cat)} 
                      onChange={() => toggleCategory(cat)} 
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-brand-navy mb-3">Status</h3>
              <div className="flex flex-col gap-2">
                {allStatuses.map((status) => (
                  <label key={status} className="flex items-center gap-3 cursor-pointer group py-1">
                    <div className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded transition-colors",
                      selectedStatuses.has(status) 
                        ? "bg-primary-blue border border-primary-blue text-white" 
                        : "border border-input bg-background group-hover:border-primary-blue"
                    )}>
                      {selectedStatuses.has(status) && (
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-brand-muted-foreground group-hover:text-brand-navy transition-colors">{status}</span>
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={selectedStatuses.has(status)} 
                      onChange={() => toggleStatus(status)} 
                    />
                  </label>
                ))}
              </div>
            </div>
            
            {(selectedCategories.size > 0 || selectedStatuses.size > 0) && (
              <Button
                variant="ghost"
                className="w-full mt-6 text-sm text-brand-muted-foreground hover:text-brand-navy"
                onClick={() => {
                  setSelectedCategories(new Set());
                  setSelectedStatuses(new Set());
                }}
              >
                Clear all filters
              </Button>
            )}
          </div>
        </aside>

        {/* Results Area */}
        <div className="flex flex-col lg:col-span-9 gap-6">
          {/* Search */}
          <div className="relative flex items-center w-full">
            <Search className="absolute left-4 size-5 text-brand-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search policies by keyword, category, or source..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 w-full rounded-2xl border border-border bg-white pl-12 pr-4 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
            />
          </div>

          {/* Results Count & List */}
          <div>
            <p className="text-sm font-medium text-brand-muted-foreground mb-4 px-1">
              Showing {filteredPolicies.length} {filteredPolicies.length === 1 ? "policy" : "policies"}
            </p>
            
            {filteredPolicies.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-20 px-6 text-center">
                <FileText className="size-12 text-brand-muted/40 mb-4" />
                <h3 className="text-lg font-bold text-brand-navy">No policies found</h3>
                <p className="mt-2 text-sm text-brand-muted-foreground max-w-sm">
                  We couldn&apos;t find any policies matching your current search and filter criteria. Try adjusting your filters or search terms.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 font-semibold rounded-xl"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategories(new Set());
                    setSelectedStatuses(new Set());
                  }}
                >
                  Clear all criteria
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredPolicies.map((policy) => {
                  
                  let accentColor = "border-l-brand-muted";
                  let badgeColors = "text-brand-muted-foreground bg-brand-muted/20";
                  
                  if (policy.badge === "high-impact") {
                    accentColor = "border-l-status-red";
                    badgeColors = "text-status-red bg-status-red/10";
                  }
                  else if (policy.badge === "strategic") {
                    accentColor = "border-l-brand-navy";
                    badgeColors = "text-brand-navy bg-brand-navy/10";
                  }
                  else if (policy.badge === "AI ANALYSIS") {
                    accentColor = "border-l-ai-cyan";
                    badgeColors = "text-ai-cyan bg-ai-cyan/10";
                  }
                  
                  // For statuses without specific badge overrides
                  if (policy.status === "Recommended") accentColor = "border-l-status-green";
                  
                  return (
                    // Explicitly routing to the existing generic /policy Detail page
                    <Link href={`/policy`} key={policy.id} className="block group">
                      <article className={cn(
                        "relative flex flex-col gap-4 bg-white border-y border-r border-l-4 border-border rounded-r-2xl p-5 sm:p-6 transition-all hover:shadow-md",
                        accentColor
                      )}>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex flex-col gap-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              {policy.badge && (
                                <span className={cn("text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md", badgeColors)}>
                                  {policy.badge.replace("-", " ")}
                                </span>
                              )}
                              {policy.status && (
                                <span className="text-[10px] font-bold tracking-widest uppercase text-brand-navy bg-brand-navy/[0.04] px-2 py-0.5 rounded-md border border-brand-navy/10">
                                  {policy.status}
                                </span>
                              )}
                            </div>
                            <h2 className="text-xl font-bold leading-tight tracking-tight text-brand-navy group-hover:text-primary-blue transition-colors">
                              {policy.title}
                            </h2>
                            <p className="text-sm text-brand-muted-foreground line-clamp-2 leading-relaxed">
                              {policy.description}
                            </p>
                          </div>
                          
                          <div className="hidden sm:flex shrink-0 pt-1">
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-primary-blue transition-colors bg-primary-blue/5 px-3 py-1.5 rounded-lg group-hover:bg-primary-blue/10">
                              View policy <ArrowRight className="size-4" />
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-4 mt-2">
                          {policy.deadline && (
                            <div className="flex items-center gap-1.5 text-xs font-medium text-brand-muted-foreground">
                              <Calendar className="size-3.5 shrink-0" />
                              <span>Deadline: {policy.deadline}</span>
                            </div>
                          )}
                          {policy.category && (
                            <div className="flex items-center gap-1.5 text-xs font-medium text-brand-muted-foreground">
                              <AlertCircle className="size-3.5 shrink-0" />
                              <span>{policy.category}</span>
                            </div>
                          )}
                          {policy.source && (
                            <div className="flex items-center gap-1.5 text-xs font-medium text-brand-muted-foreground">
                              <Building2 className="size-3.5 shrink-0" />
                              <span>{policy.source}</span>
                            </div>
                          )}
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
