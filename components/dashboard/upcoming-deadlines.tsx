import { Button } from "@/components/ui/button";
import alertsData from "@/data/alerts.json";

type DeadlineItem = {
  month: string;
  day: string;
  title: string;
  subtitle: string;
};

export function UpcomingDeadlines() {
  return (
    <section className="px-4 pt-8 pb-2">
      <h2 className="mb-3 text-xl font-bold tracking-tight text-brand-navy">
        Upcoming Deadlines
      </h2>

      <div className="rounded-2xl border border-[oklch(0.91_0.008_250)] bg-white shadow-sm">
        {alertsData.upcomingDeadlines.map((item, index) => (
          <div key={item.title}>
            <div className="flex items-center gap-4 p-4">
              <div className="flex w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-card py-2 text-center">
                <span className="text-[10px] font-semibold tracking-widest text-brand-muted-foreground uppercase">
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

            {index < alertsData.upcomingDeadlines.length - 1 && (
              <div className="mx-4 border-t border-[oklch(0.93_0.006_250)]" />
            )}
          </div>
        ))}

        <div className="p-4 pt-2">
          <Button
            id="view-calendar-btn"
            variant="outline"
            className="h-11 w-full rounded-xl border-[oklch(0.91_0.008_250)] bg-white text-sm font-semibold text-brand-navy hover:bg-brand-muted"
          >
            View Calendar
          </Button>
        </div>
      </div>
    </section>
  );
}
