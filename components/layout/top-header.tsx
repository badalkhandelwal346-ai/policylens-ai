"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Search, User, X, FileText, Calendar } from "lucide-react";
import { PolicyLensWordmark } from "@/components/ui/policy-lens-wordmark";
import { Button } from "@/components/ui/button";
import { getAllPolicies, getAlerts, getActionRequiredAlerts } from "@/lib/policies";
import { BUSINESS_PROFILE_KEY, readLocalStorageItem } from "@/lib/local-storage";

type BusinessProfile = {
  businessName?: string;
  industry?: string;
};

export function TopHeader() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const urgentCount = getActionRequiredAlerts().length;

  useEffect(() => {
    const saved = readLocalStorageItem<BusinessProfile>(BUSINESS_PROFILE_KEY);
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(saved);
    }
  }, []);


  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchingPolicies = normalizedQuery
    ? getAllPolicies()
        .filter(
          (p) =>
            p.title.toLowerCase().includes(normalizedQuery) ||
            p.description.toLowerCase().includes(normalizedQuery) ||
            p.category.toLowerCase().includes(normalizedQuery)
        )
        .slice(0, 3)
    : [];

  const matchingAlerts = normalizedQuery
    ? getAlerts()
        .filter(
          (a) =>
            a.title.toLowerCase().includes(normalizedQuery) ||
            a.message.toLowerCase().includes(normalizedQuery)
        )
        .slice(0, 2)
    : [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && normalizedQuery) {
      setIsDropdownOpen(false);
      setIsMobileSearchOpen(false);
      router.push(`/policies?search=${encodeURIComponent(normalizedQuery)}`);
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  const handleSelectPolicy = (policyId: string) => {
    setIsDropdownOpen(false);
    setIsMobileSearchOpen(false);
    router.push(`/policy?id=${policyId}`);
  };

  const initials = profile?.businessName
    ? profile.businessName
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "B";

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border/60 bg-white/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-white/80 md:px-8">
      {/* Brand Wordmark (mobile) */}
      <div className="flex items-center gap-3 md:hidden">
        <Link href="/dashboard" aria-label="PolicyLens-Ai Home">
          <PolicyLensWordmark size="md" />
        </Link>
      </div>

      {/* Desktop Search */}
      <div
        ref={searchContainerRef}
        className="hidden md:flex flex-1 items-center max-w-md relative"
      >
        <div className="relative w-full">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => {
              if (normalizedQuery) setIsDropdownOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search policies, updates, deadlines..."
            className="w-full h-10 rounded-xl border border-border bg-[#FAF8F5]/80 pl-10 pr-9 text-sm text-[#16273B] placeholder:text-muted-foreground outline-none transition-all focus:border-[#7899B8] focus:bg-white focus:ring-2 focus:ring-[#7899B8]/20"
            aria-label="Search policies, updates, deadlines"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setIsDropdownOpen(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results Dropdown */}
        {isDropdownOpen && normalizedQuery && (
          <div className="absolute top-12 left-0 w-full rounded-2xl border border-border bg-white shadow-xl py-2 z-50 overflow-hidden">
            <div className="px-3.5 py-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Matching Policies
            </div>
            {matchingPolicies.length > 0 ? (
              matchingPolicies.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPolicy(p.id)}
                  className="w-full text-left px-3.5 py-2 hover:bg-[#7899B8]/10 flex items-start gap-2.5 transition-colors cursor-pointer"
                >
                  <FileText className="size-4 text-[#7899B8] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#16273B] truncate">
                      {p.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {p.category} • {p.status}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3.5 py-1.5 text-xs text-muted-foreground">
                No matching policies found.
              </div>
            )}

            {matchingAlerts.length > 0 && (
              <>
                <div className="px-3.5 py-1 pt-2 border-t border-border/50 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Upcoming Deadlines & Alerts
                </div>
                {matchingAlerts.map((a) => (
                  <Link
                    key={a.id}
                    href={a.hasPolicy ? `/policy?id=${a.policyId}` : "/alerts"}
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#7899B8]/10 flex items-start gap-2.5 transition-colors block cursor-pointer"
                  >
                    <Calendar className="size-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#16273B] truncate">
                        {a.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {a.formattedDate} • {a.calculatedStatus}
                      </p>
                    </div>
                  </Link>
                ))}
              </>
            )}

            <div className="p-2 border-t border-border/50 bg-[#FAF8F5]/80">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  router.push(`/policies?search=${encodeURIComponent(normalizedQuery)}`);
                }}
                className="w-full text-center text-xs font-semibold text-[#2563EB] hover:underline py-1"
              >
                View all search results in Policies →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Actions: Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        {/* Mobile Search Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          className="md:hidden size-9 text-[#16273B] hover:bg-[#7899B8]/15"
          aria-label="Toggle search"
        >
          <Search className="size-4" aria-hidden="true" />
        </Button>

        {/* Notifications Bell with real Action Alert count */}
        <Link href="/alerts" aria-label="Alerts and deadlines">
          <Button
            variant="ghost"
            size="icon"
            className="relative size-9 text-[#16273B] hover:bg-[#7899B8]/15 rounded-xl cursor-pointer"
            aria-label={`Notifications: ${urgentCount} urgent actions`}
          >
            <Bell className="size-4" aria-hidden="true" />
            {urgentCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-[#DC2626] text-[10px] font-bold text-white shadow-xs">
                {urgentCount}
              </span>
            )}
          </Button>
        </Link>

        {/* User / Business Profile Avatar */}
        <Link
          href="/profile"
          aria-label="Business Profile"
          className="flex items-center gap-2.5 rounded-xl p-1 transition-colors hover:bg-[#7899B8]/15 group"
        >
          <div className="flex size-9 items-center justify-center overflow-hidden rounded-xl bg-[#16273B] text-white text-xs font-bold shadow-xs group-hover:scale-105 transition-transform">
            {profile?.businessName ? initials : <User className="size-4 text-white" aria-hidden="true" />}
          </div>
          <span className="hidden xl:inline text-xs font-semibold text-[#16273B] max-w-[120px] truncate">
            {profile?.businessName || "Profile"}
          </span>
        </Link>
      </div>

      {/* Mobile Search Expanded Bar */}
      {isMobileSearchOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-border p-3 shadow-md md:hidden flex items-center gap-2 z-50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search policies or deadlines..."
              autoFocus
              className="w-full h-10 rounded-xl border border-border bg-[#FAF8F5] pl-9 pr-4 text-sm outline-none focus:border-[#7899B8]"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileSearchOpen(false)}
            aria-label="Close search"
          >
            <X className="size-5" />
          </Button>
        </div>
      )}
    </header>
  );
}

