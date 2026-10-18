"use client";

import React from "react";
import { PolicyLensWordmark } from "@/components/ui/policy-lens-wordmark";
import { cn } from "@/lib/utils";

export interface LoadingIndicatorProps {
  message?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
  className?: string;
}

/**
 * Shared PolicyLens AI Loading Indicator
 *
 * Uses brand colors (dusty blue #7899B8, primary blue #2563EB, dark navy #16273B)
 * with a minimal, accessible spinner and optional PolicyLens-Ai wordmark.
 */
export function LoadingIndicator({
  message = "Loading...",
  showWordmark = false,
  size = "md",
  fullPage = false,
  className,
}: LoadingIndicatorProps) {
  const content = (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center text-center p-6 select-none",
        className
      )}
    >
      {showWordmark && (
        <div className="mb-3.5">
          <PolicyLensWordmark size="sm" />
        </div>
      )}

      {/* Smooth PolicyLens-styled Spinner */}
      <div
        className={cn(
          "relative flex items-center justify-center",
          size === "sm" && "size-5",
          size === "md" && "size-7",
          size === "lg" && "size-9"
        )}
      >
        <svg
          className="size-full animate-spin text-[#2563EB]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {/* Dusty blue / slate track */}
          <circle
            className="opacity-30 text-[#7899B8]"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          {/* Primary Blue active head */}
          <path
            className="opacity-95"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>

      {message && (
        <p className="mt-3 text-xs sm:text-sm font-medium text-slate-500 tracking-tight">
          {message}
        </p>
      )}

      <span className="sr-only">{message || "Loading content..."}</span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[50vh] flex-1 w-full flex items-center justify-center bg-transparent">
        {content}
      </div>
    );
  }

  return content;
}
