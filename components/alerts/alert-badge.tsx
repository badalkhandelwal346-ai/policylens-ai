import { cn } from "@/lib/utils";
import type { DeadlineStatus } from "@/lib/policies";

export type AlertPriority = DeadlineStatus | string;

interface AlertBadgeProps {
  priority: AlertPriority;
  className?: string;
}

export function AlertBadge({ priority, className }: AlertBadgeProps) {
  const norm = priority.toLowerCase();

  let styleClasses = "bg-slate-600 text-white";

  if (norm === "urgent") {
    styleClasses = "bg-status-amber text-white shadow-xs";
  } else if (norm === "upcoming") {
    styleClasses = "bg-[#527884] text-white shadow-xs";
  } else if (norm === "overdue") {
    styleClasses = "bg-status-red text-white shadow-xs";
  } else if (norm === "completed") {
    styleClasses = "bg-status-green text-white shadow-xs";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        styleClasses,
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-white/80" aria-hidden="true" />
      {priority}
    </span>
  );
}
