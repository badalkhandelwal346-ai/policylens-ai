import { Bot, FileText, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertIconType = "document" | "bot" | "shield" | string;

interface AlertIconProps {
  type: AlertIconType;
  className?: string;
}

export function AlertIcon({ type, className }: AlertIconProps) {
  if (type === "bot") {
    return (
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-xl border border-slate-100 bg-white text-[#527884] shadow-xs",
          className
        )}
      >
        <Bot className="size-5" aria-hidden="true" />
      </div>
    );
  }

  if (type === "shield") {
    return (
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-xl bg-[#527884] text-white shadow-xs",
          className
        )}
      >
        <Shield className="size-5" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-xl bg-[#527884] text-white shadow-xs",
        className
      )}
    >
      <FileText className="size-5" aria-hidden="true" />
    </div>
  );
}
