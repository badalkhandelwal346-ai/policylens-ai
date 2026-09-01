"use client";

import { FileEdit, PenSquare } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  return (
    <section className="px-4 pt-6 lg:px-0 lg:pt-0">
      <h2 className="mb-3 text-xl font-bold tracking-tight text-brand-navy">
        Action Required
      </h2>

      <div className="flex flex-col rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        {actions.map((action, i) => {
          const Icon = action.icon;

          return (
            <div
              key={action.id}
              className={cn(
                "flex flex-col sm:flex-row sm:items-center gap-4 p-4 transition-colors hover:bg-brand-muted/30",
                i !== 0 && "border-t border-border",
                action.variant === "primary" ? "bg-red-50/30" : "bg-white"
              )}
            >
              <div className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl",
                action.variant === "primary" ? "bg-red-100 text-red-700" : "bg-brand-muted text-brand-muted-foreground"
              )}>
                <Icon
                  className="size-5"
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
                onClick={() => router.push("/policy")}
                className={cn(
                  "h-11 shrink-0 rounded-xl px-5 text-sm font-semibold transition-transform active:scale-95",
                  action.variant === "primary"
                    ? "bg-red-600 text-white hover:bg-red-700 shadow-sm"
                    : "border-border bg-white text-brand-navy hover:bg-brand-muted",
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
