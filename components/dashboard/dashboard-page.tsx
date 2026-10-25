"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Bot, Flame, X, ArrowRight } from "lucide-react";

import { ActionRequired } from "@/components/dashboard/action-required";
import { BottomNavigation } from "@/components/dashboard/bottom-navigation";
import { Greeting } from "@/components/dashboard/greeting";
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics";
import { RecommendedPolicies } from "@/components/dashboard/recommended-policies";
import { SearchBar } from "@/components/dashboard/search-bar";
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines";
import { UrgentPolicyCard } from "@/components/dashboard/urgent-policy-card";
import { AiAssistantCard } from "@/components/dashboard/ai-assistant-card";
import { TrackingSummaryCard } from "@/components/dashboard/tracking-summary-card";
import policiesData from "@/data/policies.json";

function matchesPolicy(policy: Record<string, string | undefined>, term: string) {
  return Object.values(policy).some(
    (value) => value?.toLowerCase().includes(term)
  );
}

export function DashboardPage() {
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLowerCase();

  const filteredUrgentPolicies = useMemo(() => {
    if (!normalizedSearch) {
      return policiesData.urgentPolicies;
    }

    return policiesData.urgentPolicies.filter((policy) =>
      matchesPolicy(
        {
          title: policy.title,
          description: policy.description,
          category: policy.category,
          badge: policy.badge,
          status: policy.status,
          source: policy.source,
          eligibility: policy.eligibility,
          benefits: policy.benefits,
          deadline: policy.deadline,
        },
        normalizedSearch
      )
    );
  }, [normalizedSearch]);

  const filteredRecommendedPolicies = useMemo(() => {
    if (!normalizedSearch) {
      return policiesData.recommendedPolicies;
    }

    return policiesData.recommendedPolicies.filter((policy) =>
      matchesPolicy(
        {
          title: policy.title,
          description: policy.description,
          category: policy.category,
          badge: policy.badge,
          status: policy.status,
          source: policy.source,
          eligibility: policy.eligibility,
          benefits: policy.benefits,
          deadline: policy.deadline,
        },
        normalizedSearch
      )
    );
  }, [normalizedSearch]);

  const totalResultsCount = filteredUrgentPolicies.length + filteredRecommendedPolicies.length;

  return (
    <div className="relative mx-auto flex min-h-full w-full max-w-[1240px] flex-col bg-white pb-28 md:pb-16 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* 3. Dashboard greeting and short business context */}
      <Greeting />

      {/* 4. Compact overview metrics (3 in a single consistent row on desktop) */}
      <DashboardMetrics />

      {/* 5. Actions requiring attention (primary action area) */}
      <ActionRequired />

      {/* 6. Upcoming deadlines and AI assistant in a balanced secondary section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <UpcomingDeadlines />
        <AiAssistantCard />
      </div>

      {/* Dashboard Filter / Search */}
      <div className="pt-2">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Filter policies by title, category, regulation, or keyword..."
        />
        {normalizedSearch && (
          <div className="pt-2 px-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing {totalResultsCount} {totalResultsCount === 1 ? "result" : "results"} for &ldquo;{search}&rdquo;
            </span>
            <button
              onClick={() => setSearch("")}
              className="text-[#2563EB] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              Clear filter
              <X className="size-3" />
            </button>
          </div>
        )}
      </div>

      {/* 7. Urgent / Priority Policies */}
      <section aria-label="Urgent Policies Section">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-rose-50 text-rose-700">
              <Flame className="size-4" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-[#16273B]">
              Urgent & Priority Policies
            </h2>
            {filteredUrgentPolicies.length > 0 && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-[#16273B]">
                {filteredUrgentPolicies.length}
              </span>
            )}
          </div>
          <Link
            href="/policies"
            id="urgent-view-all-btn"
            className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
          >
            View all
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {filteredUrgentPolicies.length === 0 ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center text-xs text-muted-foreground">
            No urgent policies match your current filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUrgentPolicies.map((policy) => (
              <UrgentPolicyCard
                key={policy.id}
                id={policy.id}
                badge={policy.badge as "high-impact" | "strategic" | "ai-analysis"}
                title={policy.title}
                description={policy.description}
                status={policy.status}
                deadline={policy.deadline}
                readTime={policy.readTime}
                source={policy.source}
              />
            ))}
          </div>
        )}
      </section>

      {/* 8. Recommended Policies */}
      <RecommendedPolicies policies={filteredRecommendedPolicies} />

      {/* 9. Policy tracking overview */}
      <TrackingSummaryCard />

      {/* Floating Action Button (FAB) for AI Assistant */}
      <Link
        id="dashboard-fab-btn"
        href="/assistant"
        aria-label="Open AI Assistant"
        className="fixed right-6 bottom-20 md:bottom-8 z-40 flex items-center gap-2 rounded-full bg-[#16273B] text-white px-4 py-3 shadow-xl transition-all hover:scale-105 hover:bg-[#243B53] active:scale-95 group border border-white/20"
      >
        <div className="flex size-6 items-center justify-center rounded-full bg-[#2563EB] text-white">
          <Bot className="size-3.5" />
        </div>
        <span className="text-xs font-bold tracking-tight pr-1">
          Ask PolicyLens
        </span>
      </Link>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavigation />
    </div>
  );
}

