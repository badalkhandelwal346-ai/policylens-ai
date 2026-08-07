import Image from "next/image";
import { AlertCard, type AlertCardData } from "./alert-card";

const alertItems: AlertCardData[] = [
  {
    id: "gst-update",
    iconType: "document",
    title: "New GST Update",
    priority: "HIGH PRIORITY",
    description:
      "Significant changes to Input Tax Credit (ITC) norms for tech service providers effective from the next fiscal quarter. Potential impact on operational margins exceeds 2.4%.",
    impactScore: "8.5/10",
    deadline: "15 Oct 2024",
    category: "Taxation",
    aiConfidence: "98% Match",
    primaryActionLabel: "View Analysis",
    secondaryActionLabel: "Dismiss",
  },
  {
    id: "msme-scheme",
    iconType: "bot",
    title: "New MSME Scheme",
    priority: "STANDARD",
    description:
      "Ministry of Micro, Small and Medium Enterprises announces digital transformation grants for registered entities in the manufacturing sector.",
    impactScore: "4.2/10",
    deadline: "30 Nov 2024",
    category: "Grants",
    aiConfidence: "72% Match",
    primaryActionLabel: "Apply Now",
    secondaryActionLabel: "Save for later",
  },
  {
    id: "data-privacy-amendment",
    iconType: "shield",
    title: "Data Privacy Amendment",
    priority: "HIGH PRIORITY",
    description:
      "Proposed amendments to the Digital Personal Data Protection Act focus on cross-border data transfer compliance. Requires immediate legal audit for international operations.",
    impactScore: "9.1/10",
    deadline: "05 Oct 2024",
    category: "Legal",
    aiConfidence: "100% Match",
    primaryActionLabel: "Audit Checklist",
    secondaryActionLabel: "Dismiss",
  },
];

export function AlertsList() {
  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-2">
      {alertItems.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}

      {/* Contextual Insights Banner Card */}
      <div className="relative overflow-hidden rounded-2xl shadow-xs aspect-4/3 sm:aspect-16/9 w-full mt-1">
        <Image
          src="/images/policy-office.jpg"
          alt="Contextual Insights"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent flex flex-col justify-end p-5">
          <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase mb-1">
            CONTEXTUAL INSIGHTS
          </span>
          <h4 className="text-base font-bold text-white leading-snug max-w-[95%]">
            Stay ahead of the legislative curve with AI-driven compliance tracking.
          </h4>
        </div>
      </div>
    </div>
  );
}
