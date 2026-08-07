import { Calendar } from "lucide-react";

const timelineItems = [
  {
    date: "SEP 15, 2024",
    title: "Initial Registration Deadline",
    description: "Formal declaration of intent required by all fintech entities.",
    active: true,
  },
  {
    date: "OCT 12, 2024",
    title: "Full Enforcement Period Begins",
    description: "Non-compliant entities will face active penalties.",
    active: false,
  },
];

export function Timeline() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-brand-card p-4">
      <div className="flex items-center gap-2">
        <Calendar
          className="size-4 shrink-0 text-brand-navy"
          aria-hidden="true"
        />
        <h2 className="text-sm font-semibold text-brand-navy">
          Timeline for Deadlines
        </h2>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2.5 before:bottom-2.5 before:w-0.5 before:bg-[oklch(0.88_0.01_250)]">
        {timelineItems.map((item, idx) => (
          <div key={idx} className="relative flex flex-col gap-0.5">
            {/* Timeline node icon */}
            <span
              className={`absolute -left-6 top-1 size-2.5 rounded-full ${
                item.active
                  ? "bg-brand-navy ring-4 ring-brand-card"
                  : "border-2 border-brand-navy bg-white ring-4 ring-brand-card"
              }`}
              aria-hidden="true"
            />
            <span className="text-[10px] font-bold tracking-wider text-brand-muted-foreground uppercase">
              {item.date}
            </span>
            <h3 className="text-sm font-bold text-brand-navy">{item.title}</h3>
            <p className="text-xs leading-relaxed text-brand-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
