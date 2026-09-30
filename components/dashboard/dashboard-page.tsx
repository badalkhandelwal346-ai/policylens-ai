"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Bell, User } from "lucide-react";

import { ActionRequired } from "@/components/dashboard/action-required";
import { BottomNavigation } from "@/components/dashboard/bottom-navigation";
import { Greeting } from "@/components/dashboard/greeting";
import { RecommendedPolicies } from "@/components/dashboard/recommended-policies";
import { SearchBar } from "@/components/dashboard/search-bar";
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines";
import { UrgentPolicyCard } from "@/components/dashboard/urgent-policy-card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/logo";
import policies from "@/data/policies.json";

function matchesPolicy(policy: Record<string, string | undefined>, term: string) {
  return Object.values(policy).some(
    (value) => value?.toLowerCase().includes(term),
  );
}

export function DashboardPage() {
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLowerCase();

  const filteredUrgentPolicies = useMemo(() => {
    if (!normalizedSearch) {
      return policies.urgentPolicies;
    }

    return policies.urgentPolicies.filter((policy) =>
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
        normalizedSearch,
      ),
    );
  }, [normalizedSearch]);

  const filteredRecommendedPolicies = useMemo(() => {
    if (!normalizedSearch) {
      return policies.recommendedPolicies;
    }

    return policies.recommendedPolicies.filter((policy) =>
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
        normalizedSearch,
      ),
    );
  }, [normalizedSearch]);

  return (
    <div className="relative mx-auto flex min-h-full w-full max-w-[1400px] flex-col bg-background pb-24 md:px-8 xl:px-12">
      {/* Header */}
      <header className="md:hidden flex items-center justify-between px-4 pt-5 pb-2">
        <Logo />
        <div className="flex items-center gap-3">
          <Link href="/alerts">
            <Button
              id="dashboard-bell-btn"
              variant="ghost"
              size="icon"
              className="size-9 text-brand-navy hover:bg-brand-muted"
              aria-label="Notifications"
            >
              <Bell className="size-5" aria-hidden="true" />
            </Button>
          </Link>

          <Link
            id="dashboard-avatar-btn"
            href="/profile"
            aria-label="Profile"
            className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-brand-navy text-white"
          >
            <User className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </header>

      {/* Greeting */}
      <Greeting name="Rajesh" />

      {/* Search */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Main Grid Layout */}
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 lg:px-4 lg:pb-8 mt-4 lg:mt-8">
        {/* Main Column */}
        <div className="flex flex-col lg:col-span-8 lg:gap-8">
          {/* Action Required */}
          <ActionRequired />

          {/* Urgent Policies */}
          <section className="px-4 pt-6 lg:px-0 lg:pt-0">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-brand-navy" aria-hidden="true">
                  ⚡
                </span>
                <h2 className="text-xl font-bold tracking-tight text-brand-navy">
                  Urgent Policies
                </h2>
              </div>
              <Link
                href="/policy"
                id="urgent-view-all-btn"
                className="text-sm font-semibold text-primary-blue hover:text-primary-blue/80"
              >
                View all
              </Link>
            </div>

            <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
              {filteredUrgentPolicies.map((policy) => (
                <UrgentPolicyCard
                  key={policy.id}
                  badge={policy.badge as "high-impact" | "strategic" | "ai-analysis"}
                  title={policy.title}
                  deadline={policy.deadline}
                  readTime={policy.readTime}
                  source={policy.source}
                />
              ))}
            </div>
          </section>

          {/* Recommended Policies */}
          <RecommendedPolicies policies={filteredRecommendedPolicies} />
        </div>

        {/* Side Column */}
        <div className="flex flex-col lg:col-span-4 lg:gap-8">
          {/* Upcoming Deadlines */}
          <UpcomingDeadlines />
        </div>
      </div>

      {/* FAB */}
      <Link
        id="dashboard-fab-btn"
        href="/assistant"
        aria-label="Open AI assistant"
        className="fixed right-4 bottom-24 z-50 flex size-14 items-center justify-center rounded-full bg-ai-cyan shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <span className="grid grid-cols-3 gap-[3px]" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-white/80"
            />
          ))}
        </span>
      </Link>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
