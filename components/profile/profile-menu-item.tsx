"use client";

import type { ElementType } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type ProfileMenuItemProps = {
  id?: string;
  icon: ElementType;
  label: string;
  value?: string;
  isDestructive?: boolean;
  showChevron?: boolean;
  href?: string;
  onClick?: () => void;
};

export function ProfileMenuItem({
  id,
  icon: Icon,
  label,
  value,
  isDestructive = false,
  showChevron = true,
  href,
  onClick,
}: ProfileMenuItemProps) {
  const className = cn(
    "flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium transition-colors hover:bg-black/5 active:bg-black/10 cursor-pointer",
    isDestructive ? "text-red-500" : "text-slate-800",
  );

  const content = (
    <>
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
    </>
  );

  if (href) {
    return (
      <Link id={id} href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={className}
    >
      {content}
    </button>
  );
}
