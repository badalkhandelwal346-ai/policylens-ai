import Image from "next/image";
import { AlertCard, type AlertCardData } from "./alert-card";
import alertsData from "@/data/alerts.json";

export function AlertsList() {
  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-2">
      {alertsData.alerts.map((alert: AlertCardData) => (
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
