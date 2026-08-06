import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type DropdownProps = {
  label: string;
  value: string;
  className?: string;
};

export function Dropdown({ label, value, className }: DropdownProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-medium text-business-label">
        {label}
      </span>
      <div className="flex h-11 w-full items-center justify-between rounded-xl border border-business-field-border bg-business-field px-3.5">
        <span className="text-sm text-business-field-text">{value}</span>
        <ChevronDown
          className="size-4 text-business-label"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
