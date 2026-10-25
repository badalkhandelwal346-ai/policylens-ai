import { Bot } from "lucide-react";
import { FormattedMessage } from "./formatted-message";
import { formatRelativeTime } from "@/lib/chat-storage";

type AssistantMessageProps = {
  content: string;
  timestamp?: string;
};

export function AssistantMessage({ content, timestamp }: AssistantMessageProps) {
  const formattedTime = timestamp ? formatRelativeTime(timestamp) : "";

  return (
    <div className="flex w-full justify-start gap-3 items-start group">
      <div
        className="size-8 rounded-lg bg-brand-navy text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs"
        aria-hidden="true"
      >
        <Bot className="size-4" />
      </div>

      <div className="flex flex-col max-w-[92%] sm:max-w-[82%]">
        <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200/80 p-4 text-sm leading-relaxed text-slate-800 shadow-2xs">
          <FormattedMessage content={content} />
        </div>
        {formattedTime && (
          <span className="text-[11px] text-slate-400 mt-1 pl-1">
            {formattedTime}
          </span>
        )}
      </div>
    </div>
  );
}
