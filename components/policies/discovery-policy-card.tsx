import Link from "next/link";
import { ArrowRight, Calendar, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type DiscoveryPolicyCardProps = {
  id: string;
  title: string;
  description: string;
  status: string;
  category: string;
  source: string;
  deadline?: string;
  badge?: string;
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
}: DiscoveryPolicyCardProps) {
  const isUrgent = badge === "high-impact" || badge === "strategic" || status.toLowerCase().includes("urgent");
  const isRecommended = status.toLowerCase() === "recommended";

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {isUrgent && (
              <span className="flex items-center gap-1 rounded-md bg-status-red/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-status-red">
                <AlertCircle className="size-3.5" />
                Urgent
              </span>
            )}
            {!isUrgent && isRecommended && (
              <span className="flex items-center gap-1 rounded-md bg-status-green/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-status-green">
                Recommended
              </span>
            )}
            <span
              className={cn(
                "rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wider",
                !isUrgent && !isRecommended
                  ? "bg-brand-muted text-brand-muted-foreground"
                  : "bg-transparent text-brand-muted-foreground"
              )}
            >
              {status}
            </span>
          </div>
          <span className="shrink-0 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand-navy">
            {category}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-bold leading-snug tracking-tight text-brand-navy">
          {title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-brand-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        {deadline ? (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-brand-muted-foreground uppercase tracking-wider">
              Deadline
            </span>
            <div className="flex items-center gap-1.5 text-sm font-medium text-brand-navy">
              <Calendar className="size-4 text-status-amber" />
              {deadline}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-brand-muted-foreground uppercase tracking-wider">
              Deadline
            </span>
            <div className="flex items-center gap-1.5 text-sm text-brand-muted-foreground">
              Not specified
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="text-sm font-medium text-brand-muted-foreground truncate pr-4">
            {source}
          </div>
          <Link
            href={`/policy?id=${id}`}
            className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary-blue hover:text-primary-blue/80 transition-colors group"
          >
            View policy
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
