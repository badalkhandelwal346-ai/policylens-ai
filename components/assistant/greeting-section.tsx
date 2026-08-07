import { Bot } from "lucide-react";

export function GreetingSection() {
  return (
    <div className="flex flex-col items-center text-center pt-2 pb-6 px-4">
      <div
        id="assistant-robot-icon"
        className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-brand-navy text-white shadow-sm sm:size-16"
        aria-hidden="true"
      >
        <Bot className="size-8 stroke-[2.25px]" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
        Policy Assistant
      </h1>

      <p className="mt-2 max-w-xs text-sm leading-relaxed text-brand-muted-foreground sm:max-w-md">
        Ask me anything about the latest legislative updates or policy summaries.
      </p>
    </div>
  );
}
