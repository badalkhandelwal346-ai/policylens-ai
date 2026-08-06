import { ScanSearch } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ScanSearch
        className="size-5 text-brand-navy"
        strokeWidth={2.25}
        aria-hidden="true"
      />
      <span className="text-base font-semibold tracking-tight text-brand-navy">
        PolicyLens AI
      </span>
    </div>
  );
}
