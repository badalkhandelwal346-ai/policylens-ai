"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { PolicyCard } from "@/components/dashboard/policy-card";
import policies from "@/data/policies.json";

type RecommendedPoliciesProps = {
  policies: typeof policies.recommendedPolicies;
};

export function RecommendedPolicies({ policies }: RecommendedPoliciesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 220;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-4 pt-6 pb-2 lg:px-0 lg:pt-0 lg:pb-0">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-brand-navy">
          Recommended Policies
        </h2>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="recommended-prev-btn"
            aria-label="Scroll left"
            onClick={() => scroll("left")}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-white text-brand-navy shadow-sm transition-colors hover:bg-brand-muted hover:text-primary-blue"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            id="recommended-next-btn"
            aria-label="Scroll right"
            onClick={() => scroll("right")}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-white text-brand-navy shadow-sm transition-colors hover:bg-brand-muted hover:text-primary-blue"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto lg:grid lg:grid-cols-2 lg:overflow-visible pb-2 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {policies.map((policy) => (
          <PolicyCard
            key={policy.id}
            id={policy.id}
            badge={policy.badge}
            title={policy.title}
            description={policy.description}
            readTime={policy.readTime}
            showExplore={policy.showExplore}
          />
        ))}
      </div>
    </section>
  );
}
