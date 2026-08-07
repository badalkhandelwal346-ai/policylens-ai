import { ArrowUpRight, Clock } from "lucide-react";

import { cn } from "@/lib/utils";

type PolicyCardProps = {
  badge?: string;
  title: string;
  description: string;
  readTime?: string;
  showExplore?: boolean;
  className?: string;
};

export function PolicyCard({
  badge,
  title,
  description,
  readTime,
  showExplore = false,
  className,
}: PolicyCardProps) {
  return (
    <article
      className={cn(
        "flex w-52 shrink-0 flex-col justify-between rounded-2xl bg-brand-card p-4",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        {badge && (
          <span className="self-start rounded-md bg-[oklch(0.72_0.12_195)] px-2.5 py-1 text-[10px] font-semibold tracking-widest text-white uppercase">
            {badge}
          </span>
        )}
        <h3 className="text-base font-bold leading-snug tracking-tight text-brand-navy">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-brand-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mt-4 border-t border-brand-muted-foreground/15 pt-3">
        {showExplore ? (
          <button
            aria-label={`Explore ${title}`}
            className="flex items-center gap-1 text-sm font-semibold text-brand-navy"
          >
            Explore
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </button>
        ) : readTime ? (
          <div className="flex items-center gap-1.5 text-sm text-brand-muted-foreground">
            <Clock className="size-3.5" aria-hidden="true" />
            <span>{readTime}</span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
