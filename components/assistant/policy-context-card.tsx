import Link from "next/link";
import { FileText, Calendar, ArrowRight } from "lucide-react";

type PolicyContextCardProps = {
  id: string;
  title: string;
  category: string;
  status: string;
  deadline?: string;
  description?: string;
};

export function PolicyContextCard({
  id,
  title,
  category,
  status,
  deadline,
  description,
}: PolicyContextCardProps) {
  return (
    <div className="bg-brand-muted/30 border-b border-slate-100/60 p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <FileText className="size-4 text-ai-cyan" />
        <span className="text-xs font-semibold text-brand-navy uppercase tracking-wider">
          Discussing Policy Context
        </span>
      </div>
      
      <div>
        <h3 className="text-sm font-bold text-brand-navy mb-1">{title}</h3>
        {description && (
          <p className="text-xs text-brand-muted-foreground line-clamp-2 mb-2">
            {description}
          </p>
        )}
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-brand-navy bg-white border border-slate-200 px-2 py-1 rounded-md shadow-sm">
            <span>{category}</span>
            <span className="text-slate-300">•</span>
            <span>{status}</span>
          </div>
          
          {deadline && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-status-amber bg-status-amber/10 border border-status-amber/20 px-2 py-1 rounded-md">
              <Calendar className="size-3.5" />
              <span>Deadline: {deadline}</span>
            </div>
          )}
        </div>
      </div>
      
      <Link
        href={`/policy?id=${id}`}
        className="inline-flex items-center gap-1 text-xs font-bold text-primary-blue hover:text-primary-blue/80 transition-colors w-fit mt-1 group"
      >
        View policy details
        <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}
