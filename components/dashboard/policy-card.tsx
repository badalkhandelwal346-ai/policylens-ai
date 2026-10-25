"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Clock, Bot, Calendar } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PolicyCardProps = {
  id?: string;
  badge?: string;
  title: string;
  description: string;
  category?: string;
  benefits?: string;
  deadline?: string;
  readTime?: string;
  showExplore?: boolean;
  className?: string;
};

export function PolicyCard({
  id,
  badge,
  title,
  description,
  category,
  benefits,
  deadline,
  readTime,
  showExplore = false,
  className,
}: PolicyCardProps) {
  const router = useRouter();
  const targetHref = id ? `/policy?id=${id}` : "/policies";
  const assistantHref = id ? `/assistant?policyId=${id}` : "/assistant";

  return (
    <article
      className={cn(
        "group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5",
        className
      )}
    >
      <div>
        {/* Category & Badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {badge && (
            <span className="rounded-md bg-[#7899B8]/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#16273B] uppercase border border-[#7899B8]/30">
              {badge}
            </span>
          )}
          {category && (
            <span className="text-[11px] font-medium text-slate-500 bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-slate-200/60">
              {category}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={targetHref} className="block group-hover:text-[#2563EB] transition-colors">
          <h3 className="text-base font-bold leading-snug tracking-tight text-[#16273B]">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#243B53]/80 line-clamp-2">
          {description}
        </p>

        {/* Benefits Preview if available */}
        {benefits && (
          <p className="mt-2 text-[11px] text-emerald-700 bg-emerald-50/80 px-2.5 py-1.5 rounded-lg border border-emerald-100 line-clamp-1">
            <span className="font-semibold">Key Benefit:</span> {benefits}
          </p>
        )}
      </div>

      {/* Footer Metadata & Actions */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {deadline ? (
            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <Calendar className="size-3 text-[#7899B8]" />
              <span>{deadline}</span>
            </div>
          ) : readTime ? (
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Clock className="size-3 text-[#7899B8]" />
              <span>{readTime}</span>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(assistantHref)}
            className="h-8 px-2.5 text-xs font-semibold text-[#7899B8] hover:text-[#16273B] hover:bg-[#7899B8]/15 rounded-xl cursor-pointer"
            title="Ask AI Assistant about this policy"
          >
            <Bot className="size-3.5 mr-1 text-[#2563EB]" />
            Ask AI
          </Button>

          <Button
            size="sm"
            onClick={() => router.push(targetHref)}
            className="h-8 rounded-xl px-3 text-xs font-semibold bg-[#16273B] text-white hover:bg-[#243B53] shadow-xs cursor-pointer flex items-center gap-1"
          >
            <span>{showExplore ? "Explore" : "Details"}</span>
            <ArrowUpRight className="size-3" />
          </Button>
        </div>
      </div>
    </article>
  );
}

