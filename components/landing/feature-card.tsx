import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-2xl bg-brand-card p-4",
        className
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
        <Icon className="size-5 text-brand-navy" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <div className="min-w-0 pt-0.5">
        <h3 className="text-sm font-semibold text-brand-navy">{title}</h3>
        <p className="mt-0.5 text-sm leading-relaxed text-brand-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
