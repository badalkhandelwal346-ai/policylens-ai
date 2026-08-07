import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";

import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";

export function AssistantHeader() {
  return (
    <header className="relative flex items-center justify-between px-4 py-4 sm:px-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard" aria-label="Go back to dashboard">
          <Button
            id="assistant-back-btn"
            variant="ghost"
            size="icon"
            className="size-9 text-brand-navy hover:bg-brand-muted cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </Button>
        </Link>
        <div className="hidden sm:block">
          <Logo />
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 sm:hidden">
        <Logo />
      </div>

      <Link href="/alerts">
        <Button
          id="assistant-bell-btn"
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
