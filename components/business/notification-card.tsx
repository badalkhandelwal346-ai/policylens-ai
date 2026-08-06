import { CheckCircle2, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

type NotificationCardProps = {
  title: string;
  description: string;
  selected?: boolean;
  className?: string;
};

export function NotificationCard({
  title,
  description,
  selected = false,
  className,
}: NotificationCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-business-field-border bg-business-field p-3.5",
        className
      )}
    >
      {selected ? (
        <CheckCircle2
          className="mt-0.5 size-5 shrink-0 text-brand-navy/70"
          aria-hidden="true"
        />
      ) : (
        <Circle
          className="mt-0.5 size-5 shrink-0 text-brand-muted-foreground/40"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-business-heading">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-business-label">
          {description}
        </p>
      </div>
    </div>
  );
}
