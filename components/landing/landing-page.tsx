import { CtaSection } from "@/components/landing/cta-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { HeroImage } from "@/components/landing/hero-image";
import { TrustFooter } from "@/components/landing/trust-footer";

export function LandingPage() {
  return (
    <main className="mx-auto w-full max-w-md bg-white sm:max-w-lg">
      <Header />
      <Hero />
      <HeroImage />
      <FeaturesSection />
      <CtaSection />
      <TrustFooter />
    </main>
  );
}
