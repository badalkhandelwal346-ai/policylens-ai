import Link from "next/link";
import { ArrowLeft, Bot, Calendar, ChevronRight, Clock, Building2 } from "lucide-react";
import type { Policy } from "@/lib/policies";

interface PolicyDetailHeaderProps {
  policy: Policy;
  deadlineStatus?: string;
  daysRemaining?: number;
}

export function PolicyDetailHeader({
  policy,
  deadlineStatus,
  daysRemaining,
}: PolicyDetailHeaderProps) {
  const isUrgent = deadlineStatus === "urgent" || policy.badge === "high-impact";
  const isOverdue = deadlineStatus === "overdue";
  const isCompleted = deadlineStatus === "completed";

  return (
    <header className="flex flex-col gap-5 border-b border-border/60 pb-8">
      {/* Breadcrumbs & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-brand-muted-foreground">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
          <Link
            href="/dashboard"
            className="hover:text-primary-blue transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="size-3.5 text-slate-400" aria-hidden="true" />
          <Link
            href="/policies"
            className="hover:text-primary-blue transition-colors"
          >
            Policies
          </Link>
          <ChevronRight className="size-3.5 text-slate-400" aria-hidden="true" />
          <span className="font-semibold text-brand-navy truncate max-w-[200px] sm:max-w-xs">
            {policy.title}
          </span>
        </nav>

        <Link
          href="/policies"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted-foreground hover:text-brand-navy transition-colors"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          <span>Back to directory</span>
        </Link>
      </div>

      {/* Badges & Meta pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-brand-navy border border-slate-200">
          {policy.category}
        </span>

        {policy.status && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary-blue border border-blue-200">
            {policy.status}
          </span>
        )}

        {isUrgent && (
          <span className="rounded-full bg-status-amber/15 text-status-amber px-3 py-1 text-xs font-bold uppercase tracking-wider border border-status-amber/30">
            Urgent Deadline
          </span>
        )}

        {isOverdue && (
          <span className="rounded-full bg-status-red/15 text-status-red px-3 py-1 text-xs font-bold uppercase tracking-wider border border-status-red/30">
            Past Deadline
          </span>
        )}

        {isCompleted && (
          <span className="rounded-full bg-status-green/15 text-status-green px-3 py-1 text-xs font-bold uppercase tracking-wider border border-status-green/30">
            Filing Completed
          </span>
        )}
      </div>

      {/* Main Title & Overview Lead */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-brand-navy leading-tight">
          {policy.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl font-normal">
          {policy.description}
        </p>
      </div>

      {/* Metadata Bar & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-slate-50 border border-slate-200/80 p-4 sm:p-5 mt-2">
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8 text-xs sm:text-sm">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Issuing Source
            </span>
            <span className="font-semibold text-brand-navy flex items-center gap-1.5 mt-0.5">
              <Building2 className="size-4 text-slate-500" aria-hidden="true" />
              {policy.source}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Key Deadline
            </span>
            <span className="font-semibold text-brand-navy flex items-center gap-1.5 mt-0.5">
              <Calendar className="size-4 text-slate-500" aria-hidden="true" />
              {policy.deadline ?? "No specific deadline"}
            </span>
            {daysRemaining !== undefined && !isCompleted && (
              <span className="text-[11px] font-medium text-slate-500 block mt-0.5">
                {daysRemaining < 0
                  ? `Passed ${Math.abs(daysRemaining)} days ago`
                  : daysRemaining === 0
                  ? "Due today"
                  : `${daysRemaining} days remaining`}
              </span>
            )}
          </div>

          {policy.readTime && (
            <div className="hidden md:block">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Briefing Length
              </span>
              <span className="font-medium text-brand-navy flex items-center gap-1.5 mt-0.5">
                <Clock className="size-4 text-slate-400" aria-hidden="true" />
                {policy.readTime}
              </span>
            </div>
          )}
        </div>

        {/* Action: Ask AI about this policy */}
        <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
          <Link
            id="policy-header-ask-ai-btn"
            href={`/assistant?policyId=${policy.id}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-ai-cyan text-white px-5 py-2.5 text-sm font-bold shadow-xs hover:bg-ai-cyan/90 transition-transform active:scale-95 cursor-pointer"
          >
            <Bot className="size-4" aria-hidden="true" />
            <span>Ask AI about this policy</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
