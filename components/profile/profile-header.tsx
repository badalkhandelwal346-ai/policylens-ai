"use client";

import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";

import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";

export function ProfileHeader() {
  return (
    <header className="flex items-center justify-between px-4 pt-4 pb-2">
      <Link href="/dashboard">
        <Button
          id="profile-back-btn"
          variant="ghost"
          size="icon"
          className="size-9 text-brand-navy hover:bg-brand-muted cursor-pointer"
          aria-label="Go back to dashboard"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Button>
      </Link>

      <Logo />

      <Link href="/alerts">
        <Button
          id="profile-bell-btn"
          variant="ghost"
          size="icon"
          className="size-9 text-brand-navy hover:bg-brand-muted cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="size-5" aria-hidden="true" />
        </Button>
      </Link>
    </header>
  );
}
