import { ArrowLeft, Bell } from "lucide-react";

import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";

export function PolicyHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-4">
      <Button
        id="policy-back-btn"
        variant="ghost"
        size="icon"
        className="size-9 text-brand-navy hover:bg-brand-muted"
        aria-label="Go back"
      >
        <ArrowLeft className="size-5" aria-hidden="true" />
      </Button>

      <Logo />

      <Button
        id="policy-bell-btn"
        variant="ghost"
        size="icon"
        className="size-9 text-brand-navy hover:bg-brand-muted"
        aria-label="Notifications"
      >
        <Bell className="size-5" aria-hidden="true" />
      </Button>
    </header>
  );
}
