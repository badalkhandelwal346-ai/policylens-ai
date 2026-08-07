import { Lightbulb } from "lucide-react";

export function WhyPolicyExists() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-brand-card p-4">
      <div className="flex items-center gap-2">
        <Lightbulb
          className="size-4 shrink-0 text-brand-navy"
          aria-hidden="true"
        />
        <h2 className="text-sm font-semibold text-brand-navy">
          Why This Policy Exists
        </h2>
      </div>

      <p className="text-sm leading-relaxed text-brand-muted-foreground">
        Following a 42% increase in financial data breaches in the previous
        fiscal year, the Department of Digital Infrastructure identified
        systemic vulnerabilities in legacy API protocols. This update aims to
        standardize security across the entire ecosystem.
      </p>
    </div>
  );
}
