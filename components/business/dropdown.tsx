import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  onChange?: (value: string) => void;
  className?: string;
};

export function Dropdown({
  label,
  value,
  options,
  onChange,
  className,
}: DropdownProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-medium text-business-label">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-business-field-border bg-business-field px-3.5 text-sm text-business-field-text outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-business-label"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
