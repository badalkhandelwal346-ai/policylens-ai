import { FileEdit, PenSquare } from "lucide-react";
import type { ElementType } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActionVariant = "primary" | "outline";

type ActionItem = {
  id: string;
  icon: ElementType;
  title: string;
  description: string;
  cta: string;
  variant: ActionVariant;
};

const actions: ActionItem[] = [
  {
    id: "approve-final-draft",
    icon: PenSquare,
    title: "Approve Final Draft: Q4 Regulatory Response",
    description: "Due in 2 days • Needs Executive Signature",
    cta: "Review Now",
    variant: "primary",
  },
  {
    id: "update-compliance-metadata",
    icon: FileEdit,
    title: "Update Compliance Metadata",
    description: "3 policies missing impact categorization",
    cta: "Resolve",
    variant: "outline",
  },
];

export function ActionRequired() {
  return (
    <section className="px-4 pt-8 pb-4">
      <h2 className="mb-3 text-xl font-bold tracking-tight text-brand-navy">
        Action Required
      </h2>

      <div className="flex flex-col gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <div
              key={action.id}
              className="flex items-center gap-4 rounded-2xl border border-[oklch(0.91_0.008_250)] bg-white p-4 shadow-sm"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-muted">
                <Icon
                  className="size-5 text-brand-muted-foreground"
                  aria-hidden="true"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="text-sm font-semibold leading-snug text-brand-navy">
                  {action.title}
                </p>
                <p className="text-xs leading-snug text-brand-muted-foreground">
                  {action.description}
                </p>
              </div>

              <Button
                id={`action-${action.id}-btn`}
                className={cn(
                  "h-12 shrink-0 rounded-xl px-4 text-sm font-semibold",
                  action.variant === "primary"
                    ? "bg-brand-navy text-white hover:bg-brand-navy/90"
                    : "border-[oklch(0.91_0.008_250)] bg-white text-brand-navy hover:bg-brand-muted",
                )}
                variant={action.variant === "primary" ? "default" : "outline"}
              >
                {action.cta}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
