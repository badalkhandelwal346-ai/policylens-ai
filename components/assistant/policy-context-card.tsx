import Link from "next/link";
import { FileText, Calendar, ArrowRight, X } from "lucide-react";

type PolicyContextCardProps = {
  id: string;
  title: string;
  category: string;
  status: string;
  deadline?: string;
  description?: string;
  onClearContext?: () => void;
};

export function PolicyContextCard({
  id,
  title,
  category,
  status,
  deadline,
  description,
  onClearContext,
}: PolicyContextCardProps) {
  return (
    <div className="border-b border-slate-200/80 bg-slate-50/70 px-4 py-3 sm:px-6">
      <div className="max-w-3xl mx-auto flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="size-8 rounded-lg bg-ai-cyan/10 border border-ai-cyan/20 text-ai-cyan flex items-center justify-center shrink-0 mt-0.5">
            <FileText className="size-4" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Policy Research Context
              </span>
              <span className="inline-flex items-center rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                {category}
              </span>
              <span className="inline-flex items-center rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                {status}
              </span>
              {deadline && (
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 border border-amber-200/60 px-2 py-0.5 text-[11px] font-medium text-status-amber">
                  <Calendar className="size-3" />
                  <span>Due: {deadline}</span>
                </span>
              )}
            </div>

            <h3 className="text-sm font-bold text-brand-navy truncate">
              {title}
            </h3>

            {description && (
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                {description}
              </p>
            )}

            <div className="flex items-center gap-3 mt-1.5">
              <Link
                href={`/policy?id=${id}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary-blue hover:text-primary-blue/80 transition-colors group"
              >
                <span>View policy details</span>
                <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {onClearContext && (
          <button
            type="button"
            onClick={onClearContext}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors shrink-0 cursor-pointer"
            title="Detach policy context"
            aria-label="Detach policy context"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
