import Link from "next/link";
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
    <Link
      href="/policy"
      aria-label={showExplore ? `Explore ${title}` : `Open ${title}`}
      className="block shrink-0 group"
    >
      <article
        className={cn(
          "flex h-64 lg:h-auto lg:min-h-56 w-52 lg:w-auto flex-col justify-between rounded-2xl border border-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md",
          className,
        )}
      >
        <div className="flex flex-col gap-3">
          {badge && (
            <span className="self-start rounded-md bg-ai-cyan/10 px-2.5 py-1 text-[10px] font-bold tracking-widest text-ai-cyan uppercase">
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
            <span className="flex items-center gap-1 text-sm font-semibold text-primary-blue group-hover:text-primary-blue/80">
              Explore
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
          ) : readTime ? (
            <div className="flex items-center gap-1.5 text-sm text-brand-muted-foreground">
              <Clock className="size-3.5" aria-hidden="true" />
              <span>{readTime}</span>
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
