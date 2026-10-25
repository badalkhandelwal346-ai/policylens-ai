import { User } from "lucide-react";
import { formatRelativeTime } from "@/lib/chat-storage";

type UserMessageProps = {
  content: string;
  timestamp?: string;
};

export function UserMessage({ content, timestamp }: UserMessageProps) {
  const formattedTime = timestamp ? formatRelativeTime(timestamp) : "";

  return (
    <div className="flex w-full justify-end gap-3 items-start group">
      <div className="flex flex-col items-end max-w-[92%] sm:max-w-[82%]">
        <div className="rounded-2xl rounded-tr-sm bg-[#D8E3EA] p-4 text-sm leading-relaxed text-brand-navy shadow-2xs whitespace-pre-wrap">
          {content}
        </div>
        {formattedTime && (
          <span className="text-[11px] text-slate-400 mt-1 pr-1">
            {formattedTime}
          </span>
        )}
      </div>

      <div
        className="size-8 rounded-lg bg-[#7899B8]/20 border border-[#7899B8]/30 text-brand-navy flex items-center justify-center shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <User className="size-4" />
      </div>
    </div>
  );
}
