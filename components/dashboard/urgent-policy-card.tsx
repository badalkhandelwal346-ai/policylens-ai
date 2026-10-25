"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Calendar, Bot } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PolicyBadgeVariant = "high-impact" | "strategic" | "ai-analysis" | string;

type UrgentPolicyCardProps = {
  id?: string;
  badge?: PolicyBadgeVariant;
  title: string;
  description?: string;
  status?: string;
  deadline?: string;
  readTime?: string;
  source?: string;
  className?: string;
};

const badgeConfig: Record<
  string,
  { label: string; badgeStyle: string }
> = {
  "high-impact": {
    label: "HIGH IMPACT",
    badgeStyle: "bg-rose-50 text-rose-700 border-rose-200/60",
  },
  strategic: {
    label: "STRATEGIC",
    badgeStyle: "bg-blue-50 text-blue-700 border-blue-200/60",
  },
  "ai-analysis": {
    label: "AI ANALYSIS",
    badgeStyle: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

export function UrgentPolicyCard({
  id,
  badge = "high-impact",
  title,
  description,
  status,
  deadline,
  readTime,
  source,
  className,
}: UrgentPolicyCardProps) {
  const router = useRouter();
  const cfg = badgeConfig[badge] || badgeConfig["high-impact"];
  const targetHref = id ? `/policy?id=${id}` : "/policies";
  const assistantHref = id ? `/assistant?policyId=${id}` : "/assistant";

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5",
        className
      )}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={cn(
              "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
              cfg.badgeStyle
            )}
          >
            {cfg.label}
          </span>

          <div className="flex items-center gap-1.5 min-w-0">
            {status && (
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md truncate">
                {status}
              </span>
            )}
            {source && (
              <span className="text-[11px] font-medium text-slate-500 bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-border/60 truncate max-w-[130px]">
                {source}
              </span>
            )}
          </div>
        </div>


        {/* Title */}
        <Link href={targetHref} className="block group-hover:text-[#2563EB] transition-colors">
          <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-[#16273B]">
            {title}
          </h3>
        </Link>

        {/* Description */}
        {description && (
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#243B53]/80 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Metadata & Actions */}
      <div className="mt-4 pt-3.5 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {deadline && (
            <div className="flex items-center gap-1.5 font-medium text-slate-600">
              <Calendar className="size-3.5 text-[#7899B8]" aria-hidden="true" />
              <span>Deadline: {deadline}</span>
            </div>
          )}
          {readTime && (
            <span className="text-[11px] text-slate-400">
              • {readTime}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(assistantHref)}
            className="h-8 px-2.5 text-xs font-semibold text-[#7899B8] hover:text-[#16273B] hover:bg-[#7899B8]/15 rounded-xl cursor-pointer"
            title="Ask AI Assistant about this policy"
          >
            <Bot className="size-3.5 mr-1 text-[#2563EB]" />
            Ask AI
          </Button>

          <Button
            size="sm"
            onClick={() => router.push(targetHref)}
            className="h-8 rounded-xl px-3 text-xs font-semibold bg-[#16273B] text-white hover:bg-[#243B53] shadow-xs cursor-pointer flex items-center gap-1"
          >
            <span>View Policy</span>
            <ArrowRight className="size-3" />
          </Button>
        </div>
      </div>
    </article>
  );
}

