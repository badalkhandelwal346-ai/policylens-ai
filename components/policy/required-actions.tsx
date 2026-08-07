import { ClipboardList } from "lucide-react";

const steps = [
  { step: "STEP 1", title: "Audit Current API Endpoints" },
  { step: "STEP 2", title: "Submit MFA Architecture Plan" },
  { step: "STEP 3", title: "Obtain Third-Party Validation" },
];

export function RequiredActions() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-brand-card p-4">
      <div className="flex items-center gap-2">
        <ClipboardList
          className="size-4 shrink-0 text-brand-navy"
          aria-hidden="true"
        />
        <h2 className="text-sm font-semibold text-brand-navy">
          Required Actions
        </h2>
      </div>

      <div className="flex flex-col gap-2.5">
        {steps.map((item) => (
          <div
            key={item.step}
            className="flex flex-col gap-1 rounded-xl bg-white p-3.5 border border-[oklch(0.94_0.005_250)] shadow-2xs"
          >
            <span className="text-[10px] font-bold tracking-wider text-brand-muted-foreground uppercase">
              {item.step}
            </span>
            <h3 className="text-sm font-bold text-brand-navy">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
