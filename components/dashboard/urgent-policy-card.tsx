import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

import { cn } from "@/lib/utils";

type PolicyBadgeVariant = "high-impact" | "strategic" | "ai-analysis";

type UrgentPolicyCardProps = {
  badge: PolicyBadgeVariant;
  title: string;
  deadline: string;
  readTime: string;
  source?: string;
  className?: string;
};

const badgeConfig: Record<
  PolicyBadgeVariant,
  { label: string; className: string; cardClassName: string; iconClassName: string }
> = {
  "high-impact": {
    label: "HIGH IMPACT",
    className: "text-brand-navy",
    cardClassName: "border-l-4 border-l-brand-navy bg-white border-y border-r border-border rounded-r-xl shadow-sm",
    iconClassName: "text-brand-muted-foreground hover:text-brand-navy",
  },
  strategic: {
    label: "STRATEGIC",
    className: "text-brand-muted-foreground",
    cardClassName: "border-l-4 border-l-brand-muted-foreground bg-white border-y border-r border-border rounded-r-xl shadow-sm",
    iconClassName: "text-brand-muted-foreground hover:text-brand-navy",
  },
  "ai-analysis": {
    label: "AI ANALYSIS",
    className: "text-[oklch(0.72_0.12_195)]",
    cardClassName: "border-l-4 border-l-[oklch(0.72_0.12_195)] bg-white border-y border-r border-border rounded-r-xl shadow-sm",
    iconClassName: "text-[oklch(0.72_0.12_195)] hover:text-[oklch(0.72_0.12_195)]/80",
  },
};

export function UrgentPolicyCard({
  badge,
  title,
  deadline,
  source,
  className,
}: UrgentPolicyCardProps) {
  const badgeCfg = badgeConfig[badge];

  return (
    <Link href="/policy" aria-label={`Open ${title}`} className="block">
      <article
        className={cn(
          "relative flex flex-col gap-4 rounded-2xl p-4 transition-all hover:shadow-md",
          badgeCfg.cardClassName,
          className,
        )}
      >
        <div className="flex items-start justify-between">
          <span
            className={cn(
              "text-xs font-bold tracking-wider uppercase",
              badgeCfg.className,
            )}
          >
            {badgeCfg.label}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "flex size-8 items-center justify-center rounded-full transition-colors",
              badgeCfg.iconClassName
            )}
          >
            <ArrowRight className="size-4" />
          </span>
        </div>

        <h2 className="text-xl font-bold leading-tight tracking-tight text-brand-navy">
          {title}
        </h2>

        <div className="flex flex-col gap-1.5 border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-brand-muted-foreground">
              <Calendar className="size-3.5 shrink-0" aria-hidden="true" />
              <span>Deadline: {deadline}</span>
            </div>
            {source && (
              <span className="text-xs text-brand-muted-foreground bg-brand-muted/30 px-2 py-0.5 rounded-md">
                {source}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
