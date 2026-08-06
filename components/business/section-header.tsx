import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  icon: LucideIcon;
  title: string;
  className?: string;
};

export function SectionHeader({ icon: Icon, title, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex size-8 items-center justify-center rounded-lg bg-business-field border border-business-field-border">
        <Icon className="size-4 text-business-heading" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h2 className="text-sm font-semibold text-business-heading">{title}</h2>
    </div>
  );
}
