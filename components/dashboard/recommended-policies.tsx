"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { PolicyCard } from "@/components/dashboard/policy-card";
import policiesData from "@/data/policies.json";

type RecommendedPoliciesProps = {
  policies: typeof policiesData.recommendedPolicies;
};

export function RecommendedPolicies({ policies }: RecommendedPoliciesProps) {
  return (
    <section aria-label="Recommended Policies Section">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#7899B8]/20 text-[#16273B]">
            <Sparkles className="size-4" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-[#16273B]">
            Recommended Policies
          </h2>
        </div>

        <Link
          href="/policies"
          className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
        >
          View all
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {policies.length === 0 ? (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center text-xs text-muted-foreground">
          No matching policies found for your current filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policies.map((policy) => (
            <PolicyCard
              key={policy.id}
              id={policy.id}
              badge={policy.badge}
              title={policy.title}
              description={policy.description}
              category={policy.category}
              benefits={policy.benefits}
              deadline={policy.deadline}
              readTime={policy.readTime}
              showExplore={policy.showExplore}
            />
          ))}
        </div>
      )}
    </section>
  );
}

