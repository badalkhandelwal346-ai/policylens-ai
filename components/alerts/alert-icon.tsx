"use client";

import { Calendar, FileCheck, FileText, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
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

  if (normStatus === "overdue") {
    return (
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-200/60",
          className
        )}
      >
        <AlertTriangle className="size-4" aria-hidden="true" />
      </div>
    );
  }

  if (normStatus === "urgent" || normType === "warning") {
    return (
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60",
          className
        )}
      >
        <AlertTriangle className="size-4" aria-hidden="true" />
      </div>
    );
  }

  if (normStatus === "completed") {
    return (
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60",
          className
        )}
      >
        <CheckCircle2 className="size-4" aria-hidden="true" />
      </div>
    );
  }

  if (normType === "deadline") {
    return (
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#7899B8]/15 text-[#16273B] border border-[#7899B8]/30",
          className
        )}
      >
        <Calendar className="size-4" aria-hidden="true" />
      </div>
    );
  }

  if (normType === "filing") {
    return (
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200",
          className
        )}
      >
        <FileCheck className="size-4" aria-hidden="true" />
      </div>
    );
  }

  if (normType === "application") {
    return (
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-200/60",
          className
        )}
      >
        <Clock className="size-4" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200",
        className
      )}
    >
      <FileText className="size-4" aria-hidden="true" />
    </div>
  );
}
