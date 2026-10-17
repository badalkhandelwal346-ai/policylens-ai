"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, CheckCircle2, HelpCircle, Sparkles, UserCheck } from "lucide-react";
import type { Policy } from "@/lib/policies";
import { BUSINESS_PROFILE_KEY, readLocalStorageItem } from "@/lib/local-storage";

interface PolicyBusinessImpactProps {
  policy: Policy;
}

type BusinessProfile = {
  businessName?: string;
  businessType?: string;
  industry?: string;
  stateOfOperation?: string;
  primaryLanguage?: string;
  businessSize?: string;
};

export function PolicyBusinessImpact({ policy }: PolicyBusinessImpactProps) {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);

  useEffect(() => {
    const saved = readLocalStorageItem<BusinessProfile>(BUSINESS_PROFILE_KEY);
    if (saved && (saved.businessName || saved.industry)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(saved);
    }
  }, []);

  const businessName = profile?.businessName?.trim();
  const industry = profile?.industry?.trim();
  const businessSize = profile?.businessSize?.trim();
  const stateOfOperation = profile?.stateOfOperation?.trim();

  // Evaluate industry alignment carefully without over-claiming
  const isDirectSector =
    industry &&
    (policy.category.toLowerCase().includes(industry.toLowerCase()) ||
      industry.toLowerCase().includes(policy.category.toLowerCase()) ||
      (policy.id === "digital-markets-act" &&
        ["technology", "e-commerce", "retail", "digital services", "software"].some((k) =>
          industry.toLowerCase().includes(k)
        )) ||
      (policy.id === "national-ai-safety" &&
        ["technology", "finance", "healthcare", "software", "consulting"].some((k) =>
          industry.toLowerCase().includes(k)
        )) ||
      (policy.id === "sustainable-finance" &&
        ["finance", "banking", "investment", "fintech"].some((k) =>
          industry.toLowerCase().includes(k)
        )) ||
      (policy.id === "net-zero" &&
        ["energy", "manufacturing", "construction", "infrastructure", "agriculture"].some((k) =>
          industry.toLowerCase().includes(k)
        )) ||
      (policy.id === "digital-trade" &&
        ["e-commerce", "trade", "logistics", "retail", "export"].some((k) =>
          industry.toLowerCase().includes(k)
        )));

  return (
    <section className="flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex items-center gap-2 border-b border-border/60 pb-3">
        <Building2 className="size-5 text-primary-blue" aria-hidden="true" />
        <h2 className="text-xl font-bold tracking-tight text-brand-navy">
          Why This Matters to Your Business
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col gap-6">
        {/* Profile Personalization Banner */}
        {profile ? (
          <div className="rounded-xl bg-blue-50/70 border border-blue-200/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <UserCheck className="size-5 text-primary-blue shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary-blue">
                  Tailored Perspective for {businessName || "Your Business"}
                </p>
                <p className="text-sm font-semibold text-brand-navy mt-0.5">
                  {[industry, businessSize, stateOfOperation].filter(Boolean).join(" • ")}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {isDirectSector
                    ? `Potential Direct Relevance: Your registered sector (${industry}) closely mirrors the regulatory scope of this policy.`
                    : `General Relevance: While primary obligations target ${policy.category}, ${businessName || "your business"} may still be impacted via supply chains, vendor standards, or market competition.`}
                </p>
              </div>
            </div>

            <Link
              href="/business"
              className="text-xs font-semibold text-primary-blue hover:underline shrink-0 self-start sm:self-auto"
            >
              Edit Profile →
            </Link>
          </div>
        ) : (
          <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3.5 flex items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary-blue shrink-0" aria-hidden="true" />
              <span>
                Want tailored impact assessments? Complete your business profile to see sector-specific guidance.
              </span>
            </div>
            <Link
              href="/business"
              className="font-bold text-primary-blue hover:underline shrink-0"
            >
              Add Profile
            </Link>
          </div>
        )}

        {/* 3 Distinguishable Categorized Subsections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sub-block 1: Confirmed Facts */}
          <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/20 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-status-green shrink-0" aria-hidden="true" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                1. Confirmed Policy Facts
              </h3>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div>
                <span className="font-semibold text-brand-navy block text-xs">Eligibility Scope:</span>
                <p className="mt-0.5 leading-relaxed text-slate-600">
                  {policy.eligibility ?? "Consult standard regulatory eligibility criteria."}
                </p>
              </div>
              <div>
                <span className="font-semibold text-brand-navy block text-xs">Documented Benefits:</span>
                <p className="mt-0.5 leading-relaxed text-slate-600">
                  {policy.benefits ?? "Provides regulatory clarity and standardized procedural safeguards."}
                </p>
              </div>
            </div>
          </div>

          {/* Sub-block 2: Potential Business Implications */}
          <div className="rounded-xl border border-blue-200/80 bg-blue-50/20 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary-blue shrink-0" aria-hidden="true" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                2. Potential Implications
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-disc list-inside leading-relaxed">
              <li>Level playing field: prevents discriminatory commercial barriers from dominant players.</li>
              <li>Operational standards: requires technical compatibility for shared interfaces or filings.</li>
              <li>Vendor empowerment: small businesses gain protected distribution and dispute channels.</li>
            </ul>
          </div>

          {/* Sub-block 3: Information Requiring Confirmation */}
          <div className="rounded-xl border border-amber-200/80 bg-amber-50/20 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="size-4 text-status-amber shrink-0" aria-hidden="true" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                3. Requires Confirmation
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950 list-disc list-inside leading-relaxed">
              <li>Whether your annual turnover meets statutory thresholds for mandatory filing.</li>
              <li>State-level implementation variances or supplemental regional filings.</li>
              <li>Individual enterprise classification under final administrative rules.</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer on applicability */}
        <p className="text-xs text-slate-500 italic border-t border-slate-100 pt-3">
          * Note: Policy applicability depends on statutory thresholds, transaction volumes, and official jurisdictional definitions. PolicyLens AI does not declare formal legal liability.
        </p>
      </div>
    </section>
  );
}
