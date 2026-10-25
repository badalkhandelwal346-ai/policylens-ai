"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUpcomingDeadlines, parseDate } from "@/lib/policies";

export function UpcomingDeadlines() {
  const router = useRouter();
  const upcomingAlerts = getUpcomingDeadlines(4);

  return (
    <section className="flex flex-col h-full" aria-label="Upcoming Deadlines Panel">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
            <Calendar className="size-4" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-[#16273B]">
            Upcoming Deadlines
          </h2>
        </div>
        <Link
          href="/alerts"
          className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-0.5"
        >
          View all
          <ChevronRight className="size-3.5" />
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden flex-1 flex flex-col justify-between">
        {upcomingAlerts.length === 0 ? (
          <div className="p-6 text-center text-xs text-muted-foreground bg-[#FAF8F5]/40">
            <Calendar className="size-8 text-[#7899B8] mx-auto mb-2 opacity-50" />
            <p className="font-semibold text-[#16273B]">No Upcoming Deadlines</p>
            <p className="mt-1">All monitored statutory schedules are currently clear.</p>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {upcomingAlerts.map((item) => {
              const dateObj = parseDate(item.date);
              const month = dateObj
                ? dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase()
                : "DUE";
              const day = dateObj ? dateObj.getDate().toString() : "--";
              const targetHref = item.hasPolicy ? `/policy?id=${item.policyId}` : "/alerts";
              const isUrgent = item.calculatedStatus === "urgent";

              return (
                <Link
                  key={item.id}
                  href={targetHref}
                  aria-label={`View deadline for ${item.title}`}
                  className="flex items-start gap-3.5 p-3.5 transition-colors hover:bg-[#FAF8F5]/80 group"
                >
                  {/* Calendar Tile */}
                  <div className="flex w-11 shrink-0 flex-col items-center justify-center rounded-xl border border-border/80 bg-[#FAF8F5] py-1.5 text-center shadow-xs group-hover:border-[#7899B8] transition-colors">
                    <span className="text-[9px] font-extrabold tracking-wider text-[#7899B8] uppercase">
                      {month}
                    </span>
                    <span className="text-base font-black leading-tight text-[#16273B] group-hover:text-[#2563EB] transition-colors">
                      {day}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-[#16273B] line-clamp-1 group-hover:text-[#2563EB] transition-colors">
                        {item.title}
                      </p>
                      {isUrgent && (
                        <span className="shrink-0 rounded px-1.5 py-0.2 text-[9px] font-bold text-[#D97706] bg-[#D97706]/10 uppercase">
                          Urgent
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-muted-foreground line-clamp-1 leading-snug">
                      {item.message}
                    </p>

                    {item.daysRemaining !== undefined && (
                      <span className="text-[10px] font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                        <Clock className="size-3 text-[#7899B8]" />
                        {item.daysRemaining <= 0
                          ? "Due today"
                          : `Due in ${item.daysRemaining} days`}
                      </span>
                    )}
                  </div>

                  <ChevronRight className="size-4 text-muted-foreground group-hover:text-[#16273B] transition-colors shrink-0 self-center" />
                </Link>
              );
            })}
          </div>
        )}

        <div className="p-3 border-t border-border/60 bg-[#FAF8F5]/50">
          <Button
            id="view-calendar-btn"
            variant="outline"
            onClick={() => router.push("/alerts")}
            className="h-9 w-full rounded-xl border-border bg-white text-xs font-semibold text-[#16273B] hover:bg-[#FAF8F5] hover:text-[#2563EB] transition-colors cursor-pointer"
          >
            View Statutory Calendar & Alerts
          </Button>
        </div>
      </div>
    </section>
  );
}

