import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="mt-8 px-6">
      <Button
        size="lg"
        className="h-14 w-full gap-2 rounded-xl bg-brand-navy text-base font-semibold hover:bg-brand-navy/90"
      >
        Get Started
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
      <button
        type="button"
        className="mt-4 w-full text-center text-sm font-semibold text-brand-navy"
      >
        Sign In
      </button>
    </section>
  );
}
