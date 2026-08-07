"use client";

import type { ElementType } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type ProfileMenuItemProps = {
  id?: string;
  icon: ElementType;
  label: string;
  value?: string;
  isDestructive?: boolean;
  showChevron?: boolean;
  onClick?: () => void;
};

export function ProfileMenuItem({
  id,
  icon: Icon,
  label,
  value,
  isDestructive = false,
  showChevron = true,
  onClick,
}: ProfileMenuItemProps) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium transition-colors hover:bg-black/5 active:bg-black/10 cursor-pointer",
        isDestructive ? "text-red-500" : "text-slate-800",
      )}
    >
      <div className="flex items-center gap-3.5">
        <Icon
          className={cn(
            "size-5 shrink-0",
            isDestructive ? "text-red-500" : "text-slate-600",
          )}
          aria-hidden="true"
        />
        <span>{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {value && (
          <span className="text-sm font-normal text-slate-500">{value}</span>
        )}
        {showChevron && (
          <ChevronRight
            className="size-4 shrink-0 text-slate-400"
            aria-hidden="true"
          />
        )}
      </div>
    </button>
  );
}
