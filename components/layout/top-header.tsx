"use client";

import Link from "next/link";
import { Bell, Search, User } from "lucide-react";
import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";

export function TopHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border/50 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8">
      <div className="flex items-center gap-4 md:hidden">
        <Logo />
      </div>

      <div className="hidden md:flex flex-1 items-center max-w-md ml-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search policies, updates, deadlines..."
            className="w-full h-10 rounded-md border border-border bg-background pl-10 pr-4 text-sm outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <Link href="/alerts" className="hidden md:block">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-5" aria-hidden="true" />
          </Button>
        </Link>

        <Link
          href="/profile"
          aria-label="Profile"
          className="hidden md:flex size-9 items-center justify-center overflow-hidden rounded-full bg-brand-navy text-white transition-transform hover:scale-105"
        >
          <User className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
