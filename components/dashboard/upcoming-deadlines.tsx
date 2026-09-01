"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import alertsData from "@/data/alerts.json";


export function UpcomingDeadlines() {
  const router = useRouter();

  return (
    <section className="px-4 pt-6 pb-2 lg:px-0 lg:pt-0 lg:pb-0">
      <h2 className="mb-3 text-xl font-bold tracking-tight text-brand-navy">
        Upcoming Deadlines
      </h2>

      <div className="rounded-2xl border border-border bg-white shadow-sm">
        {alertsData.upcomingDeadlines.map((item, index) => (
          <div key={item.title} className="relative">
            {index < alertsData.upcomingDeadlines.length - 1 && (
              <div className="absolute top-[3.5rem] bottom-[-1rem] left-[2.5rem] w-px bg-border" />
            )}
            <div className="relative z-10 flex items-center gap-4 p-4 transition-colors hover:bg-brand-muted/50">
              <div className="flex w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-white border border-border/50 py-2 text-center shadow-sm">
                <span className="text-[10px] font-bold tracking-widest text-brand-muted-foreground uppercase">
                  {item.month}
                </span>
                <span className="text-xl font-bold leading-tight text-brand-navy">
                  {item.day}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-brand-navy">
                  {item.title}
                </p>
                <p className="text-xs text-brand-muted-foreground">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="p-4 pt-2">
          <Button
            id="view-calendar-btn"
            variant="outline"
            onClick={() => router.push("/alerts")}
            className="h-11 w-full rounded-xl border-border bg-white text-sm font-semibold text-brand-navy hover:bg-brand-muted transition-transform active:scale-95"
          >
            View Calendar
          </Button>
        </div>
      </div>
    </section>
  );
}
