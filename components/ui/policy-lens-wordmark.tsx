"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PolicyLensWordmarkProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * Standard PolicyLens-Ai Wordmark
 *
 * Rules:
 * - Text: `PolicyLens-Ai`
 * - `PolicyLens` in dark navy (#16273B / brand-navy)
 * - `-Ai` in blue accent (#2563EB)
 * - Identical typography, weight, capitalization, hyphen, and color treatment across all views
 */
export function PolicyLensWordmark({
  className,
  size = "xl",
}: PolicyLensWordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-extrabold tracking-tight select-none",
        size === "sm" && "text-base sm:text-lg",
        size === "md" && "text-lg sm:text-xl",
        size === "lg" && "text-xl sm:text-2xl",
        size === "xl" && "text-2xl sm:text-[28px] lg:text-[30px]",
        className
      )}
    >
      <span className="text-[#16273B]">PolicyLens</span>
      <span className="text-[#2563EB]">-Ai</span>
    </span>
  );
}
