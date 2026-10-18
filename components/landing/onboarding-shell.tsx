"use client";

import React from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { PolicyLensWordmark } from "@/components/ui/policy-lens-wordmark";
import { cn } from "@/lib/utils";

/* =========================================================================
   Shared Onboarding Layout Components
   Provides unified desktop & mobile sizing, panel proportions, and branding
   ========================================================================= */

export interface OnboardingCardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function OnboardingCardShell({
  children,
  className,
}: OnboardingCardShellProps) {
  return (
    <div className="onboarding-page-shell">
      <div className={cn("onboarding-card-container", className)}>
        {children}
      </div>
    </div>
  );
}

export interface OnboardingLeftPanelProps {
  stepText: string;
  headline: string;
  description: string;
  children: React.ReactNode;
  footerBadge?: string;
  className?: string;
}

export function OnboardingLeftPanel({
  stepText,
  headline,
  description,
  children,
  footerBadge = "ENTERPRISE AI",
  className,
}: OnboardingLeftPanelProps) {
  return (
    <section
      className={cn("onboarding-panel-left", className)}
      aria-label="Product introduction and regulatory overview"
    >
      {/* Top Header Group: Wordmark, Step Badge, Title & Description */}
      <div>
        <div className="flex items-center">
          <PolicyLensWordmark className="text-2xl sm:text-[28px] font-black tracking-tight" />
        </div>

        {/* Step Badge Pill */}
        <div className="mt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 border border-white/60 shadow-xs text-[10px] font-bold uppercase tracking-wider text-[#16273B]">
            <span className="size-2 rounded-full bg-[#2563EB]" aria-hidden="true" />
            {stepText}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold tracking-tight text-[#16273B] leading-[1.25] mt-6 sm:mt-8">
          {headline}
        </h1>

        {/* Supporting Description */}
        <p className="text-sm sm:text-[15px] font-normal leading-relaxed text-[#243B53]/90 mt-3.5 max-w-md">
          {description}
        </p>
      </div>

      {/* Middle Group: Feature Preview / Illustration */}
      <div className="my-auto py-6 sm:py-8 flex items-center justify-center w-full">
        {children}
      </div>

      {/* Bottom Group: Trust Indicator & Enterprise Badge */}
      <div className="pt-6 border-t border-[#16273B]/15 flex items-center justify-between gap-3 mt-auto shrink-0">
        <div className="inline-flex items-center gap-2">
          <div className="size-5 rounded-full bg-[#16273B] text-white flex items-center justify-center shrink-0">
            <Check className="size-3 stroke-[3]" aria-hidden="true" />
          </div>
          <span className="text-xs font-semibold text-[#16273B] tracking-tight">
            Policy intelligence for businesses
          </span>
        </div>

        <span className="px-3 py-1 rounded-full bg-white/35 border border-white/50 text-[10px] font-bold tracking-wider text-[#16273B] uppercase">
          {footerBadge}
        </span>
      </div>
    </section>
  );
}

export interface OnboardingRightPanelProps {
  stepNumber: 1 | 2;
  language: string;
  onLanguageChange: (language: string) => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function OnboardingRightPanel({
  stepNumber,
  language,
  onLanguageChange,
  children,
  footer,
  className,
}: OnboardingRightPanelProps) {
  return (
    <section
      className={cn("onboarding-panel-right", className)}
      aria-label="Onboarding configuration and entry form"
    >
      {/* Top Bar: Progress Indicator & Language Selector */}
      <div className="flex items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Step {stepNumber} of 2
          </span>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {stepNumber === 1 ? (
              <>
                <span className="h-1.5 w-10 rounded-full bg-[#2563EB]" />
                <span className="h-1.5 w-7 rounded-full bg-slate-200" />
              </>
            ) : (
              <>
                <span className="h-1.5 w-7 rounded-full bg-[#16273B]" />
                <span className="h-1.5 w-10 rounded-full bg-[#2563EB]" />
              </>
            )}
          </div>
        </div>

        {/* Language Selector */}
        <div className="relative inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 hover:bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-colors focus-within:ring-2 focus-within:ring-[#243B53]/20">
          <Languages className="size-3.5 text-slate-500" aria-hidden="true" />
          <span>{language === "Hindi" ? "Hindi" : "English (US)"}</span>
          <ChevronDown className="size-3 text-slate-400" aria-hidden="true" />
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            aria-label="Select language"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full appearance-none"
          >
            <option value="English">English (US)</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      </div>

      {/* Main Form / Content Slot */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        {children}
      </div>

      {/* Optional Bottom Footer Slot */}
      {footer && (
        <div className="pt-6 border-t border-slate-100 mt-auto shrink-0">
          {footer}
        </div>
      )}
    </section>
  );
}
