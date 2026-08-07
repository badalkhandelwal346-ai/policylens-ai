import { ArrowRight, Calendar, Clock } from "lucide-react";

import { cn } from "@/lib/utils";

type PolicyBadgeVariant = "high-impact" | "strategic" | "ai-analysis";

type UrgentPolicyCardProps = {
  badge: PolicyBadgeVariant;
  title: string;
  deadline: string;
  readTime: string;
  className?: string;
};

const badgeConfig: Record<
  PolicyBadgeVariant,
  { label: string; className: string }
> = {
  "high-impact": {
    label: "HIGH IMPACT",
    className: "bg-brand-navy text-white",
  },
  strategic: {
    label: "STRATEGIC",
    className: "bg-brand-navy text-white",
  },
  "ai-analysis": {
    label: "AI ANALYSIS",
    className: "bg-[oklch(0.72_0.12_195)] text-white",
  },
};

export function UrgentPolicyCard({
  badge,
  title,
  deadline,
  readTime,
  className,
}: UrgentPolicyCardProps) {
  const badgeCfg = badgeConfig[badge];

  return (
    <article
      className={cn(
        "relative flex flex-col gap-4 rounded-2xl p-4",
        badge === "high-impact"
          ? "bg-[oklch(0.88_0.02_220)]"
          : "bg-brand-card",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "rounded-md px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase",
            badgeCfg.className,
          )}
        >
          {badgeCfg.label}
        </span>
        <button
          aria-label={`Open ${title}`}
          className="flex size-8 items-center justify-center rounded-full bg-white/60 text-brand-navy transition-colors hover:bg-white"
        >
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      <h2 className="text-xl font-bold leading-tight tracking-tight text-brand-navy">
        {title}
      </h2>

      <div className="flex flex-col gap-1.5 border-t border-brand-muted-foreground/15 pt-3">
        <div className="flex items-center gap-1.5 text-sm text-brand-muted-foreground">
          <Calendar className="size-3.5 shrink-0" aria-hidden="true" />
          <span>Deadline: {deadline}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-brand-muted-foreground">
          <Clock className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{readTime}</span>
        </div>
      </div>
    </article>
  );
}
