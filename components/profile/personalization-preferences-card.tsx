"use client";

import { Check, Sliders, Sparkles } from "lucide-react";
import type { BusinessProfileData } from "./business-info-card";

interface PersonalizationPreferencesCardProps {
  profile: BusinessProfileData;
  onTogglePreference: (prefTitle: string) => void;
  onLanguageChange: (lang: string) => void;
}

const NOTIFICATION_OPTIONS = [
  {
    title: "High-Priority Legislative Alerts",
    description: "Immediate notification for statutory changes and mandates directly impacting your industry.",
    badge: "Urgent & High",
  },
  {
    title: "Weekly Policy Digest",
    description: "A synthesized weekly summary of state legislative movements and regulatory shifts.",
    badge: "Weekly Summary",
  },
  {
    title: "AI Assistant Monthly Insights",
    description: "Predictive policy analysis and upcoming compliance dates tailored to your business profile.",
    badge: "AI Synthesis",
  },
];

export function PersonalizationPreferencesCard({
  profile,
  onTogglePreference,
  onLanguageChange,
}: PersonalizationPreferencesCardProps) {
  const activePreferences = profile.notificationPreferences || [
    "High-Priority Legislative Alerts",
  ];

  return (
    <section
      aria-label="Personalization Preferences"
      className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs space-y-5"
    >
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Sliders className="size-4 text-brand-navy" aria-hidden="true" />
          <h2 className="text-base font-bold text-brand-navy">
            Personalization & Notification Channels
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Configure how PolicyLens AI alerts your business about newly enacted policies and upcoming deadlines.
        </p>
      </div>

      {/* Language Preference Quick Switcher */}
      <div className="rounded-xl bg-slate-50/70 border border-slate-200/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-brand-navy block">
            Interface & Explanation Language
          </span>
          <p className="text-[11px] text-slate-500">
            Preferred language for AI policy explanations and compliance summaries.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs shrink-0">
          {["English", "Hindi"].map((lang) => {
            const isSelected = (profile.primaryLanguage || "English") === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => onLanguageChange(lang)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-brand-navy text-white shadow-xs"
                    : "text-slate-600 hover:text-brand-navy hover:bg-slate-100"
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification Preferences List */}
      <div className="space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
          Active Alert Subscriptions
        </span>

        <div className="grid grid-cols-1 gap-2.5">
          {NOTIFICATION_OPTIONS.map((item) => {
            const isChecked = activePreferences.includes(item.title);

            return (
              <div
                key={item.title}
                onClick={() => onTogglePreference(item.title)}
                className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isChecked
                    ? "bg-[#7899B8]/5 border-[#7899B8]/40 shadow-2xs"
                    : "bg-white border-slate-200 hover:bg-slate-50/80"
                }`}
              >
                {/* Custom Checkbox */}
                <div
                  className={`size-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors border ${
                    isChecked
                      ? "bg-brand-navy border-brand-navy text-white"
                      : "bg-white border-slate-300 text-transparent"
                  }`}
                  aria-hidden="true"
                >
                  <Check className="size-3.5 stroke-[2.5]" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-0.5">
                    <span className="text-xs sm:text-sm font-semibold text-brand-navy">
                      {item.title}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-white border border-slate-200/80 px-2 py-0.5 text-[10px] font-medium text-slate-600 shadow-2xs">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
        <Sparkles className="size-3.5 text-ai-cyan shrink-0" />
        <span>Preferences immediately personalize policy matching on your Dashboard and Alerts.</span>
      </div>
    </section>
  );
}
