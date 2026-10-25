"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  Calendar,
  FileText,
  Home,
  Building2,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { PolicyLensWordmark } from "@/components/ui/policy-lens-wordmark";
import { BUSINESS_PROFILE_KEY, readLocalStorageItem } from "@/lib/local-storage";

type BusinessProfile = {
  businessName?: string;
  industry?: string;
  stateOfOperation?: string;
};

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Policies", href: "/policies", icon: FileText },
  { name: "Alerts & Deadlines", href: "/alerts", icon: Calendar },
  { name: "AI Assistant", href: "/assistant", icon: Bot },
];

export function Sidebar() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<BusinessProfile | null>(null);

  useEffect(() => {
    const saved = readLocalStorageItem<BusinessProfile>(BUSINESS_PROFILE_KEY);
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(saved);
    }
  }, []);

  const businessName = profile?.businessName?.trim() || "My Business Profile";
  const businessSubtitle =
    profile?.industry || profile?.stateOfOperation
      ? [profile.industry, profile.stateOfOperation].filter(Boolean).join(" • ")
      : "Complete setup";

  const initials = profile?.businessName
    ? profile.businessName
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "B";

  return (
    <aside className="hidden md:flex flex-col w-[260px] border-r border-[#2E465F]/15 bg-[#7899B8] shrink-0 min-h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="flex h-16 items-center px-6 border-b border-[#2E465F]/15 bg-[#7899B8]">
        <Link href="/dashboard" className="flex items-center" aria-label="PolicyLens-Ai Home">
          <PolicyLensWordmark size="lg" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-3.5 flex flex-col gap-1.5" aria-label="Sidebar Navigation">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard" || pathname === "/"
              : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150",
                isActive
                  ? "bg-white text-[#16273B] shadow-sm"
                  : "text-[#16273B]/85 hover:bg-white/20 hover:text-[#16273B]"
              )}
            >
              <item.icon
                className={cn(
                  "size-5 transition-colors shrink-0",
                  isActive ? "text-[#2563EB]" : "text-[#16273B]/80"
                )}
                aria-hidden="true"
              />
              <span className="flex-1 truncate">{item.name}</span>
              {isActive && (
                <span
                  className="size-1.5 rounded-full bg-[#2563EB]"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User / Business Profile Section Anchored at Bottom */}
      <div className="p-3.5 border-t border-[#2E465F]/15 bg-[#7899B8]">
        <div className="rounded-2xl bg-white/95 p-3 border border-white/60 shadow-xs">
          <Link
            href="/profile"
            className="flex items-center gap-3 group"
            aria-label="View Business Profile"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#16273B] text-white font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
              {profile?.businessName ? initials : <Building2 className="size-4 text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#16273B] truncate leading-tight">
                {businessName}
              </p>
              <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
                {businessSubtitle}
              </p>
            </div>
            <ChevronRight className="size-4 text-slate-400 group-hover:text-[#16273B] transition-colors shrink-0" />
          </Link>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <Link
              href="/business"
              className="text-[#2563EB] hover:underline font-semibold inline-flex items-center gap-1"
            >
              <SlidersHorizontal className="size-3" />
              <span>Settings</span>
            </Link>
            <span className="text-[10px] text-slate-400 font-medium">Enterprise</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

