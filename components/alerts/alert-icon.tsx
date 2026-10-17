import { Bot, Calendar, FileCheck, FileText, Shield, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertIconType = "deadline" | "application" | "filing" | "document" | "bot" | "shield" | "warning" | string;

interface AlertIconProps {
  type: AlertIconType;
  status?: string;
  className?: string;
}

export function AlertIcon({ type, status, className }: AlertIconProps) {
  const normType = type?.toLowerCase() || "";
  const normStatus = status?.toLowerCase() || "";

  if (normStatus === "urgent" || normType === "warning") {
    return (
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-xl bg-status-amber/15 text-status-amber shadow-xs",
          className
        )}
      >
        <AlertTriangle className="size-5" aria-hidden="true" />
      </div>
    );
  }

  if (normType === "bot") {
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

  if (normType === "shield") {
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

  if (normType === "deadline") {
    return (
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-xl bg-[#527884] text-white shadow-xs",
          className
        )}
      >
        <Calendar className="size-5" aria-hidden="true" />
      </div>
    );
  }

  if (normType === "filing") {
    return (
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-xl bg-slate-700 text-white shadow-xs",
          className
        )}
      >
        <FileCheck className="size-5" aria-hidden="true" />
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
