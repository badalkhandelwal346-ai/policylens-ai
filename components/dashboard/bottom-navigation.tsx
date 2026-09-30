"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Bot, FileText, Home, User } from "lucide-react";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";

type NavItem = {
  id: string;
  label: string;
  icon: ElementType;
  href: string;
};

const navItems: NavItem[] = [
  { id: "nav-home", label: "Home", icon: Home, href: "/dashboard" },
  { id: "nav-policies", label: "Policies", icon: FileText, href: "/policies" },
  { id: "nav-assistant", label: "Assistant", icon: Bot, href: "/assistant" },
  { id: "nav-alerts", label: "Alerts", icon: Bell, href: "/alerts" },
  { id: "nav-profile", label: "Profile", icon: User, href: "/profile" },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="md:hidden fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-border bg-white px-2 pb-safe"
    >
      <ul className="flex items-center justify-around py-2" role="list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard" || pathname === "/"
              : pathname?.startsWith(item.href);

          return (
            <li key={item.id}>
              <Link
                id={item.id}
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium transition-colors",
                  isActive
                    ? "text-primary-blue"
                    : "text-brand-muted-foreground hover:text-primary-blue/80",
                )}
              >
                <Icon
                  className={cn(
                    "size-5",
                    isActive && "stroke-[2.25px]",
                  )}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

