import { ChevronDown, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/logo";

export function Header() {
  return (
    <header className="relative flex items-center justify-center px-6 pt-6 pb-2">
      <Logo />
      <Button
        variant="secondary"
        size="sm"
        className="absolute right-6 h-9 gap-1.5 rounded-full bg-brand-muted px-3.5 text-brand-navy shadow-none hover:bg-brand-muted/80"
      >
        <Globe className="size-3.5" aria-hidden="true" />
        <span className="text-sm font-medium">English</span>
        <ChevronDown className="size-3.5 opacity-60" aria-hidden="true" />
      </Button>
    </header>
  );
}
