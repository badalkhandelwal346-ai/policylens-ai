import { Bell, BrainCircuit, FileCheck } from "lucide-react";

import { FeatureCard } from "@/components/landing/feature-card";

const features = [
  {
    icon: FileCheck,
    title: "Verified Information",
    description: "Access accurate, cross-referenced policy data.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Insights",
    description: "Get smart summaries of legislative changes.",
  },
  {
    icon: Bell,
    title: "Timely Alerts",
    description: "Never miss a critical regulatory deadline.",
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="mt-10 flex flex-col gap-3 px-6">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </section>
  );
}
