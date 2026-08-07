import { Bot, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ActionButtons() {
  return (
    <div className="flex flex-wrap gap-3 px-4 pb-6">
      <Button
        id="policy-view-official-btn"
        className="h-11 gap-2 rounded-xl bg-brand-navy px-5 text-sm font-semibold text-white hover:bg-brand-navy/90"
      >
        <ExternalLink className="size-4" aria-hidden="true" />
        View Official Notification
      </Button>

      <Button
        id="policy-ask-ai-btn"
        variant="outline"
        className="h-11 gap-2 rounded-xl border-[oklch(0.91_0.008_250)] bg-white px-5 text-sm font-semibold text-brand-navy hover:bg-brand-muted"
      >
        <Bot className="size-4" aria-hidden="true" />
        Ask AI
      </Button>
    </div>
  );
}
