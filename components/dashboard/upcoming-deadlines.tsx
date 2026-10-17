"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUpcomingDeadlines, parseDate } from "@/lib/policies";

export function UpcomingDeadlines() {
  const router = useRouter();
  const upcomingAlerts = getUpcomingDeadlines(3);

  return (
    <section className="px-4 pt-6 pb-2 lg:px-0 lg:pt-0 lg:pb-0">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-brand-navy">
          Upcoming Deadlines
        </h2>
        <Link
          href="/alerts"
          className="text-sm font-semibold text-primary-blue hover:text-primary-blue/80"
        >
          View all
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        {upcomingAlerts.length === 0 ? (
          <div className="p-6 text-center text-sm text-brand-muted-foreground">
            No upcoming deadlines.
          </div>
        ) : (
          upcomingAlerts.map((item, index) => {
            const dateObj = parseDate(item.date);
            const month = dateObj
              ? dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase()
              : "DUE";
            const day = dateObj ? dateObj.getDate().toString() : "--";
            const targetHref = item.hasPolicy ? `/policy?id=${item.policyId}` : "/alerts";

            return (
              <div key={item.id} className="relative">
                {index < upcomingAlerts.length - 1 && (
                  <div className="absolute top-[3.5rem] bottom-[-1rem] left-[2.5rem] w-px bg-border" />
                )}
                <Link
                  href={targetHref}
                  aria-label={`View deadline for ${item.title}`}
                  className="relative z-10 flex items-center gap-4 p-4 transition-colors hover:bg-brand-muted/50 block group"
                >
                  <div className="flex w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-white border border-border/50 py-2 text-center shadow-sm group-hover:border-primary-blue/30 transition-colors">
                    <span className="text-[10px] font-bold tracking-widest text-brand-muted-foreground uppercase">
                      {month}
                    </span>
                    <span className="text-xl font-bold leading-tight text-brand-navy group-hover:text-primary-blue transition-colors">
                      {day}
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="text-sm font-semibold text-brand-navy line-clamp-1 group-hover:text-primary-blue transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-brand-muted-foreground line-clamp-1">
                      {item.message}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })
        )}

        <div className="p-4 pt-2 border-t border-border/40">
          <Button
            id="view-calendar-btn"
            variant="outline"
            onClick={() => router.push("/alerts")}
            className="h-11 w-full rounded-xl border-border bg-white text-sm font-semibold text-primary-blue hover:text-primary-blue/80 hover:bg-brand-muted transition-transform active:scale-95 cursor-pointer"
          >
            View All Alerts & Deadlines
          </Button>
        </div>
      </div>
    </section>
  );
}
