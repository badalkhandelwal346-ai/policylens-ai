import { Bot, Sparkles } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center px-4">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-brand-muted text-brand-navy mb-4">
        <Bot className="size-8" />
      </div>
      <h3 className="text-lg font-semibold text-brand-navy mb-1">
        Start a Conversation
      </h3>
      <p className="text-sm text-brand-muted-foreground max-w-xs mb-4">
        Ask a question about legislative changes or pick one of the suggested prompts below.
      </p>
      <div className="flex items-center gap-1.5 text-xs text-brand-navy font-medium bg-slate-100 px-3 py-1.5 rounded-full">
        <Sparkles className="size-3.5" />
        <span>Powered by PolicyLens AI</span>
      </div>
    </div>
  );
}
