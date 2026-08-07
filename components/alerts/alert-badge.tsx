import { cn } from "@/lib/utils";

export type AlertPriority = "HIGH PRIORITY" | "STANDARD" | "HIGH_PRIORITY" | string;

interface AlertBadgeProps {
  priority: AlertPriority;
  className?: string;
}

export function AlertBadge({ priority, className }: AlertBadgeProps) {
  const isHigh = priority.toUpperCase().includes("HIGH");
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white",
        isHigh ? "bg-[#527884]" : "bg-[#5B6B73]",
        className
      )}
    >
      {priority}
    </span>
  );
}
