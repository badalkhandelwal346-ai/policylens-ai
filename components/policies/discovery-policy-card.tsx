"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Calendar, Building2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type DiscoveryPolicyCardProps = {
  id: string;
  title: string;
  description: string;
  status: string;
  category: string;
  source: string;
  deadline?: string;
  badge?: string;
  benefits?: string;
  className?: string;
};

export function DiscoveryPolicyCard({
  id,
  title,
  description,
  status,
  category,
  source,
  deadline,
  badge,
  benefits,
  className,
}: DiscoveryPolicyCardProps) {
  const router = useRouter();

  // Normalized priority badge configuration
  const normalizedBadge = badge?.toLowerCase();
  const isHighImpact = normalizedBadge === "high-impact";
  const isStrategic = normalizedBadge === "strategic";
  const isAiAnalysis = normalizedBadge === "ai-analysis" || badge === "AI ANALYSIS";

  const targetHref = `/policy?id=${id}`;
  const assistantHref = `/assistant?policyId=${id}`;

  return (
    <article
      className={cn(
        "group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5",
        className
      )}
    >
      <div>
        {/* Top Badges Row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Priority Badge */}
            {isHighImpact && (
              <span className="rounded-md border border-rose-200/60 bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-700">
                HIGH IMPACT
              </span>
            )}
            {isStrategic && (
              <span className="rounded-md border border-blue-200/60 bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                STRATEGIC
              </span>
            )}
            {isAiAnalysis && (
              <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                AI ANALYSIS
              </span>
            )}

            {/* Separate Policy Status Badge */}
            <span className="rounded-md border border-slate-200/70 bg-[#FAF8F5] px-2 py-0.5 text-[10px] font-semibold text-slate-700">
              {status}
            </span>
          </div>

          {/* Category Pill */}
          <span className="shrink-0 rounded-md border border-slate-200/60 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
            {category}
          </span>
        </div>

        {/* Policy Title */}
        <Link href={targetHref} className="block group-hover:text-[#2563EB] transition-colors">
          <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-[#16273B]">
            {title}
          </h3>
        </Link>

        {/* Description Clamped */}
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#243B53]/80 line-clamp-2">
          {description}
        </p>

        {/* Key Benefit if supported in dataset */}
        {benefits && (
          <p className="mt-2 text-[11px] text-emerald-700 bg-emerald-50/80 px-2.5 py-1.5 rounded-lg border border-emerald-100 line-clamp-1">
            <span className="font-semibold">Key Benefit:</span> {benefits}
          </p>
        )}
      </div>

      {/* Metadata & Actions */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col gap-3">
        {/* Source & Deadline */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium truncate max-w-[200px]" title={source}>
            <Building2 className="size-3.5 text-[#7899B8] shrink-0" aria-hidden="true" />
            <span className="truncate">{source}</span>
          </div>

          {deadline ? (
            <div className="flex items-center gap-1.5 font-medium text-slate-600 shrink-0">
              <Calendar className="size-3.5 text-[#7899B8] shrink-0" aria-hidden="true" />
              <span>Deadline: {deadline}</span>
            </div>
          ) : (
            <span className="text-[11px] text-slate-400">Ongoing framework</span>
          )}
        </div>

        {/* Actions Row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(assistantHref)}
            className="h-8.5 px-3 text-xs font-semibold text-[#7899B8] hover:text-[#16273B] hover:bg-[#7899B8]/15 rounded-xl cursor-pointer flex items-center gap-1.5"
            title="Ask AI Assistant about this policy"
          >
            <Bot className="size-3.5 text-[#2563EB]" />
            <span>Ask AI</span>
          </Button>

          <Button
            size="sm"
            onClick={() => router.push(targetHref)}
            className="h-8.5 rounded-xl px-4 text-xs font-semibold bg-[#16273B] text-white hover:bg-[#243B53] shadow-xs cursor-pointer flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <span>View policy</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </article>
  );
}
