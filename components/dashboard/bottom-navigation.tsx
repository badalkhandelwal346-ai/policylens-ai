import { Bell, Bot, FileText, Home, User } from "lucide-react";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";

type NavItem = {
  id: string;
  label: string;
  icon: ElementType;
  active?: boolean;
};

const navItems: NavItem[] = [
  { id: "nav-home", label: "Home", icon: Home, active: true },
  { id: "nav-policies", label: "Policies", icon: FileText },
  { id: "nav-assistant", label: "Assistant", icon: Bot },
  { id: "nav-alerts", label: "Alerts", icon: Bell },
  { id: "nav-profile", label: "Profile", icon: User },
];

export function BottomNavigation() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-[oklch(0.91_0.008_250)] bg-white px-2 pb-safe"
    >
      <ul className="flex items-center justify-around py-2" role="list">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.id}>
              <button
                id={item.id}
                aria-label={item.label}
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium transition-colors",
                  item.active
                    ? "text-brand-navy"
                    : "text-brand-muted-foreground hover:text-brand-navy",
                )}
              >
                <Icon
                  className={cn(
                    "size-5",
                    item.active && "stroke-[2.25px]",
                  )}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
