import Image from "next/image";
import { ArrowLeft, Bell, ScanSearch } from "lucide-react";

import { BusinessForm } from "@/components/business/business-form";
import { Button } from "@/components/ui/button";

export default function BusinessPage() {
  return (
    <div className="mx-auto min-h-full w-full max-w-md bg-white sm:max-w-lg">
      <header className="relative flex items-center justify-between px-4 py-4">
        <Button
          variant="ghost"
          size="icon"
          className="size-9 text-brand-navy hover:bg-brand-muted"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Button>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          <ScanSearch
            className="size-4 text-brand-navy"
            strokeWidth={2.25}
            aria-hidden="true"
          />
          <span className="text-sm font-semibold tracking-tight text-brand-navy">
            PolicyLens
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="size-9 text-brand-navy hover:bg-brand-muted"
        >
          <Bell className="size-5" aria-hidden="true" />
        </Button>
      </header>

      <main className="px-4 pb-10">
        <div className="overflow-hidden rounded-2xl bg-business-section">
          <Image
            src="/images/bussiness.png"
            alt="Business owner at a retail counter"
            width={320}
            height={200}
            className="h-auto w-full"
            priority
          />
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-xl font-bold tracking-tight text-brand-navy">
            Let&apos;s set up your business profile
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-brand-muted-foreground">
            Tell us a bit about your operations. PolicyLens AI uses this to
            filter relevant legislative updates and compliance requirements
            specific to your industry and location.
          </p>
        </div>

        <div className="mt-8">
          <BusinessForm />
        </div>
      </main>
    </div>
  );
}
