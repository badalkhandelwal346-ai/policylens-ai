"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Search, SlidersHorizontal, X } from "lucide-react";

import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";

interface AlertsHeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onFilterClick?: () => void;
  isFilterOpen?: boolean;
}

export function AlertsHeader({
  searchQuery = "",
  onSearchChange,
  onFilterClick,
  isFilterOpen = false,
}: AlertsHeaderProps) {
  return (
    <div className="flex flex-col gap-5 px-4 pt-4 pb-2">
      {/* Top Bar: Back Button, Logo, Bell */}
      <header className="flex items-center justify-between">
        <Link href="/dashboard">
          <Button
            id="alerts-back-btn"
            variant="ghost"
            size="icon"
            className="size-9 text-brand-navy hover:bg-brand-muted"
            aria-label="Go back to dashboard"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </Button>
        </Link>

        <Logo />

        <Link href="/alerts">
          <Button
            id="alerts-bell-btn"
            variant="ghost"
            size="icon"
            className="size-9 text-brand-navy hover:bg-brand-muted"
            aria-label="Notifications"
          >
            <Bell className="size-5" aria-hidden="true" />
          </Button>
        </Link>
      </header>

      {/* Page Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">
          Alerts & Deadlines
        </h1>
        <p className="text-sm font-normal text-brand-navy/70 sm:text-base">
          Track critical compliance deadlines and high-priority legislative updates.
        </p>
      </div>

      {/* Search Bar & Filter Button */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="alerts-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search alerts, policies, or topics..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#527884] focus:outline-hidden"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange?.("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <button
          id="alerts-filter-btn"
          type="button"
          onClick={onFilterClick}
          aria-label="Filter alerts"
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors cursor-pointer ${
            isFilterOpen
              ? "bg-[#527884] text-white border-[#527884]"
              : "border-slate-200 bg-white text-brand-navy hover:bg-slate-50"
          }`}
        >
          <SlidersHorizontal className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
