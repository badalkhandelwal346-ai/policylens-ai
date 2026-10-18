"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Lightweight Page Transition Wrapper
 *
 * Applies a subtle 180ms fade-in with a 4px rise when navigating between pages.
 * Respects prefers-reduced-motion to prevent disorientation.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className={cn("page-transition-enter flex-1 flex flex-col w-full min-w-0", className)}
    >
      {children}
    </div>
  );
}
