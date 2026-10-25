"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, SlidersHorizontal } from "lucide-react";
import { BUSINESS_PROFILE_KEY, readLocalStorageItem } from "@/lib/local-storage";

type BusinessProfile = {
  businessName?: string;
  industry?: string;
  stateOfOperation?: string;
};

function getSalutation() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function Greeting() {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [salutation] = useState<string>(getSalutation);

  useEffect(() => {
    const saved = readLocalStorageItem<BusinessProfile>(BUSINESS_PROFILE_KEY);
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(saved);
    }
  }, []);


  const businessName = profile?.businessName?.trim();
  const industry = profile?.industry?.trim();
  const state = profile?.stateOfOperation?.trim();

  const hasContext = industry || state;
  const contextParts = [industry, state].filter(Boolean);
  const businessContext = hasContext ? contextParts.join(" • ") : "Retail • New York";

  return (
    <section className="px-4 pt-6 pb-2 md:px-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7899B8]/15 px-3 py-1 text-xs font-semibold text-[#16273B] border border-[#7899B8]/30">
              <span className="size-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
              Your policy overview
            </span>

            {hasContext && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                <Building2 className="size-3.5 text-[#7899B8]" aria-hidden="true" />
                {contextParts.join(" • ")}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#16273B]">
            {businessName ? `${salutation}, ${businessName}.` : "Welcome to PolicyLens AI."}
          </h1>

          <div className="mt-1.5 max-w-2xl">
            <p className="text-sm sm:text-base font-medium text-[#243B53] leading-snug">
              Active policy intelligence for{" "}
              <span className="font-semibold text-[#16273B]">
                {businessContext}
              </span>
              .
            </p>
            <p className="mt-1 text-xs sm:text-sm font-normal text-slate-500 leading-relaxed">
              Highlights relevant regulatory updates and upcoming compliance deadlines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0 shrink-0">
          <Link
            href="/business"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3.5 py-2 text-xs font-semibold text-[#16273B] shadow-xs hover:bg-[#FAF8F5] transition-colors"
          >
            <SlidersHorizontal className="size-3.5 text-[#7899B8]" />
            <span>{businessName ? "Update Profile" : "Configure Profile"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

