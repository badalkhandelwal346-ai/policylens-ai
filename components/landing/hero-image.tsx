import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";

export function HeroImage() {
  return (
    <div className="relative mx-6 mt-8 pb-1">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-navy/10">
        <Image
          src="/images/onboarding-hero.png"
          alt="Professional reviewing policy data on a holographic dashboard"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 480px"
        />
      </div>

      <div className="absolute -top-3 right-3 flex items-center gap-1.5 rounded-full bg-brand-navy px-3 py-1.5 shadow-md">
        <Sparkles className="size-3 text-white" aria-hidden="true" />
        <span className="text-[0.625rem] font-semibold tracking-wider text-white">
          AI ANALYSIS ACTIVE
        </span>
      </div>

      <div className="absolute -bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-md">
        <ShieldCheck
          className="size-3.5 text-brand-navy"
          aria-hidden="true"
        />
        <span className="text-xs font-medium text-brand-navy">
          Compliance Verified
        </span>
      </div>
    </div>
  );
}
