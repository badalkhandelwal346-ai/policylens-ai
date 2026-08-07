"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { PolicyCard } from "@/components/dashboard/policy-card";

const recommendedPolicies = [
  {
    id: "sustainable-finance",
    title: "Sustainable Finance Disclosure Measures",
    description:
      "Key metrics for entities operating with sustainability mandates.",
    showExplore: true,
  },
  {
    id: "net-zero",
    badge: "AI ANALYSIS",
    title: "Net-Zero Infrastructure Act",
    description:
      "Critical infrastructure and incentive structures for carbon neutrality.",
    readTime: "18 min read",
    showExplore: false,
  },
  {
    id: "digital-trade",
    badge: "AI ANALYSIS",
    title: "Digital Trade Facilitation Act",
    description:
      "Streamlining cross-border e-commerce compliance and tax obligations.",
    readTime: "11 min read",
    showExplore: false,
  },
] as const;

export function RecommendedPolicies() {
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
    <section className="px-4 pt-8 pb-2">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-brand-navy">
          Recommended Policies
        </h2>

        <div className="flex items-center gap-2">
          <button
            id="recommended-prev-btn"
            aria-label="Scroll left"
            onClick={() => scroll("left")}
            className="flex size-9 items-center justify-center rounded-full border border-[oklch(0.91_0.008_250)] bg-white text-brand-navy shadow-sm transition-colors hover:bg-brand-muted"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            id="recommended-next-btn"
            aria-label="Scroll right"
            onClick={() => scroll("right")}
            className="flex size-9 items-center justify-center rounded-full border border-[oklch(0.91_0.008_250)] bg-white text-brand-navy shadow-sm transition-colors hover:bg-brand-muted"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {recommendedPolicies.map((policy) => (
          <PolicyCard
            key={policy.id}
            badge={"badge" in policy ? policy.badge : undefined}
            title={policy.title}
            description={policy.description}
            readTime={"readTime" in policy ? policy.readTime : undefined}
            showExplore={policy.showExplore}
          />
        ))}
      </div>
    </section>
  );
}
