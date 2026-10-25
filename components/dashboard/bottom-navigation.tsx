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
  { id: "nav-home", label: "Dashboard", icon: Home, href: "/dashboard" },
  { id: "nav-policies", label: "Policies", icon: FileText, href: "/policies" },
  { id: "nav-assistant", label: "Assistant", icon: Bot, href: "/assistant" },
  { id: "nav-alerts", label: "Alerts", icon: Bell, href: "/alerts" },
  { id: "nav-profile", label: "Profile", icon: User, href: "/profile" },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border/80 bg-white/95 backdrop-blur px-2 py-1 shadow-lg"
    >
      <ul className="flex items-center justify-around" role="list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard" || pathname === "/"
              : pathname?.startsWith(item.href);

          return (
            <li key={item.id} className="flex-1">
              <Link
                id={item.id}
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 py-1 text-[11px] font-semibold transition-colors relative",
                  isActive
                    ? "text-[#2563EB]"
                    : "text-[#2E465F]/70 hover:text-[#16273B]"
                )}
              >
                <div className={cn(
                  "flex size-8 items-center justify-center rounded-xl transition-colors",
                  isActive ? "bg-[#7899B8]/20" : ""
                )}>
                  <Icon
                    className={cn(
                      "size-5",
                      isActive ? "text-[#2563EB] stroke-[2.25px]" : "text-[#7899B8]"
                    )}
                    aria-hidden="true"
                  />
                </div>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


