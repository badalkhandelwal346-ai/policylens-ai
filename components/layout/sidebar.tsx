"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  Bot,
  Calendar,
  FileText,
  Home,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/landing/logo";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Policies", href: "/policies", icon: FileText },
  { name: "Alerts & Deadlines", href: "/alerts", icon: Calendar },
  { name: "AI Assistant", href: "/assistant", icon: Bot },
  { name: "Saved", href: "/saved", icon: Bookmark },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-[260px] border-r border-border bg-sidebar shrink-0 min-h-screen sticky top-0">
      <div className="flex h-16 items-center px-6 border-b border-border/50">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
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
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary-blue"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon
                className={cn("size-5", isActive ? "text-primary-blue" : "text-muted-foreground")}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
            pathname?.startsWith("/settings")
              ? "bg-primary/10 text-primary-blue"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <Settings className="size-5 text-muted-foreground" aria-hidden="true" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
