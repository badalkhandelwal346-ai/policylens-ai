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

const urgentPolicies = [
  {
    id: "digital-markets-act",
    badge: "high-impact" as const,
    title: "Digital Markets Act: Section 4 Amendment",
    deadline: "Oct 24, 2023",
    readTime: "8 min read",
  },
  {
    id: "national-ai-safety",
    badge: "strategic" as const,
    title: "National AI Safety Framework 2.0",
    deadline: "Oct 30, 2023",
    readTime: "12 min read",
  },
];

export function DashboardPage() {
  return (
    <div className="relative mx-auto flex min-h-full w-full max-w-md flex-col bg-white pb-24 sm:max-w-lg">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-5 pb-2">
        <Logo />
        <div className="flex items-center gap-3">
          <Button
            id="dashboard-bell-btn"
            variant="ghost"
            size="icon"
            className="size-9 text-brand-navy hover:bg-brand-muted"
            aria-label="Notifications"
          >
            <Bell className="size-5" aria-hidden="true" />
          </Button>

          <button
            id="dashboard-avatar-btn"
            aria-label="Profile"
            className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-brand-navy text-white"
          >
            <User className="size-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Greeting */}
      <Greeting name="Rajesh" />

      {/* Search */}
      <SearchBar />

      {/* Urgent Policies */}
      <section className="px-4 pt-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-brand-navy" aria-hidden="true">
              ⚡
            </span>
            <h2 className="text-xl font-bold tracking-tight text-brand-navy">
              Urgent Policies
            </h2>
          </div>
          <button
            id="urgent-view-all-btn"
            className="text-sm font-medium text-brand-muted-foreground hover:text-brand-navy"
          >
            View all
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {urgentPolicies.map((policy) => (
            <UrgentPolicyCard
              key={policy.id}
              badge={policy.badge}
              title={policy.title}
              deadline={policy.deadline}
              readTime={policy.readTime}
            />
          ))}
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <UpcomingDeadlines />

      {/* Recommended Policies */}
      <RecommendedPolicies />

      {/* Action Required */}
      <ActionRequired />

      {/* FAB */}
      <button
        id="dashboard-fab-btn"
        aria-label="Open AI assistant"
        className="fixed right-4 bottom-24 z-50 flex size-14 items-center justify-center rounded-full bg-brand-navy shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <span className="grid grid-cols-3 gap-[3px]" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-white/80"
            />
          ))}
        </span>
      </button>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
