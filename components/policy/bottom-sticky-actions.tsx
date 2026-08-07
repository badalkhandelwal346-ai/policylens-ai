import { Bot, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BottomStickyActions() {
  return (
    <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 bg-white/95 p-4 backdrop-blur-md border-t border-[oklch(0.91_0.008_250)] flex flex-col gap-2.5 sm:hidden">
      <Button
        id="mobile-view-official-btn"
        className="h-11 w-full gap-2 rounded-xl bg-brand-navy text-sm font-semibold text-white hover:bg-brand-navy/90"
      >
        <ExternalLink className="size-4" aria-hidden="true" />
        View Official Notification
      </Button>

      <Button
        id="mobile-ask-ai-btn"
        className="h-11 w-full gap-2 rounded-xl bg-[oklch(0.48_0.14_165)] text-sm font-semibold text-white hover:opacity-95"
      >
        <Bot className="size-4" aria-hidden="true" />
        Ask AI Assistant
      </Button>
    </div>
  );
}
