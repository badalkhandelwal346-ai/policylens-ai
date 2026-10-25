"use client";

import { cn } from "@/lib/utils";
import type { DeadlineStatus } from "@/lib/policies";

export type AlertPriority = DeadlineStatus | string;

interface AlertBadgeProps {
  priority: AlertPriority;
  className?: string;
}

export function AlertBadge({ priority, className }: AlertBadgeProps) {
  const norm = priority.toLowerCase();

  let styleClasses = "bg-slate-100 text-slate-700 border-slate-200";

  if (norm === "urgent") {
    styleClasses = "bg-amber-50 text-amber-800 border-amber-200/70";
  } else if (norm === "upcoming") {
    styleClasses = "bg-[#7899B8]/15 text-[#16273B] border-[#7899B8]/30";
  } else if (norm === "overdue") {
    styleClasses = "bg-rose-50 text-rose-700 border-rose-200/70";
  } else if (norm === "completed") {
    styleClasses = "bg-emerald-50 text-emerald-700 border-emerald-200/70";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
        styleClasses,
        className
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          norm === "urgent"
            ? "bg-amber-500"
            : norm === "overdue"
            ? "bg-rose-500"
            : norm === "completed"
            ? "bg-emerald-500"
            : "bg-[#7899B8]"
        )}
        aria-hidden="true"
      />
      {priority}
    </span>
  );
}
