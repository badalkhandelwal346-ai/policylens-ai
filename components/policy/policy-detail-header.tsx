import Link from "next/link";
import { ArrowLeft, Calendar, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type PolicyDetailHeaderProps = {
  title: string;
  description: string;
  status: string;
  category: string;
  source: string;
  deadline?: string;
  badge?: string;
};

export function PolicyDetailHeader({
  title,
  description,
  status,
  category,
  source,
  deadline,
  badge,
}: PolicyDetailHeaderProps) {
  const isUrgent = badge === "high-impact" || badge === "strategic" || status.toLowerCase().includes("urgent");
  const isRecommended = status.toLowerCase() === "recommended";

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/policies"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted-foreground hover:text-brand-navy transition-colors w-fit"
      >
        <ArrowLeft className="size-4" />
        Back to policies
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="shrink-0 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand-navy">
            {category}
          </span>
          {isUrgent && (
            <span className="flex items-center gap-1 rounded-md bg-status-red/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-status-red">
              <AlertCircle className="size-3.5" />
              Urgent
            </span>
          )}
          {!isUrgent && isRecommended && (
            <span className="flex items-center gap-1 rounded-md bg-status-green/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-status-green">
              Recommended
            </span>
          )}
          <span
            className={cn(
              "rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wider",
              !isUrgent && !isRecommended
                ? "bg-brand-muted text-brand-muted-foreground"
                : "bg-transparent text-brand-muted-foreground"
            )}
          >
            {status}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-navy mb-4">
          {title}
        </h1>
        
        <p className="text-lg leading-relaxed text-brand-muted-foreground mb-6">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 border-y border-border py-4">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-brand-muted-foreground" />
            <span className="text-sm font-medium text-brand-navy">
              Source: <span className="font-normal text-brand-muted-foreground">{source}</span>
            </span>
          </div>
          
          {deadline && (
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-status-amber" />
              <span className="text-sm font-medium text-brand-navy">
                Deadline: <span className="font-normal text-brand-muted-foreground">{deadline}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
