import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="mt-8 px-6">
      <Link href="/business">
        <Button
          size="lg"
          className="h-14 w-full gap-2 rounded-xl bg-brand-navy text-base font-semibold hover:bg-brand-navy/90"
        >
          Get Started
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </Link>
      <Link
        href="/dashboard"
        className="mt-4 block w-full text-center text-sm font-semibold text-brand-navy"
      >
        Sign In
      </Link>
    </section>
  );
}
