"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, BellRing, Store } from "lucide-react";

import { BusinessInput } from "@/components/business/business-input";
import { Dropdown } from "@/components/business/dropdown";
import { NotificationCard } from "@/components/business/notification-card";
import { SectionHeader } from "@/components/business/section-header";
import { Button } from "@/components/ui/button";
import { BUSINESS_PROFILE_KEY, saveLocalStorageItem } from "@/lib/local-storage";

const notificationPreferences = [
  {
    title: "High-Priority Legislative Alerts",
    description:
      "Immediate notification for bills that directly impact your industry.",
    selected: true,
  },
  {
    title: "Weekly Policy Digest",
    description:
      "A summary of the week's legislative movements and analysis.",
    selected: false,
  },
  {
    title: "AI Assistant Monthly Insights",
    description:
      "Predictive analysis of upcoming policy trends tailored to your size.",
    selected: false,
  },
] as const;

type BusinessProfile = {
  businessName: string;
  businessType: string;
  industry: string;
  stateOfOperation: string;
  primaryLanguage: string;
  businessSize: string;
};

const businessTypes = [
  "Sole Proprietorship",
  "Limited Liability Company",
  "Corporation",
  "Partnership",
];

const industries = [
  "Technology",
  "Retail",
  "Healthcare",
  "Manufacturing",
  "Finance",
];

const states = [
  "California",
  "New York",
  "Texas",
  "Florida",
  "Illinois",
];

const languages = ["English", "Spanish", "French", "German"];

const businessSizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201+ employees",
];

export function BusinessForm() {
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState(businessTypes[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [stateOfOperation, setStateOfOperation] = useState(states[0]);
  const [primaryLanguage, setPrimaryLanguage] = useState(languages[0]);
  const [businessSize, setBusinessSize] = useState(businessSizes[0]);

  const handleContinue = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const profile: BusinessProfile = {
      businessName,
      businessType,
      industry,
      stateOfOperation,
      primaryLanguage,
      businessSize,
    };

    const saved = saveLocalStorageItem(BUSINESS_PROFILE_KEY, profile);

    if (!saved) {
      event.preventDefault();
      console.warn("Unable to save business profile to localStorage.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4 rounded-2xl bg-business-section p-4">
        <SectionHeader icon={Store} title="Business Identity" />
        <BusinessInput
          label="Business Name"
          placeholder="e.g. Blue Sky Consulting"
          value={businessName}
          onChange={setBusinessName}
        />
        <Dropdown
          label="Business Type"
          value={businessType}
          options={businessTypes}
          onChange={setBusinessType}
        />
      </section>

      <section className="flex flex-col gap-4 rounded-2xl bg-business-section p-4">
        <SectionHeader icon={BarChart3} title="Operational Context" />
        <Dropdown
          label="Industry"
          value={industry}
          options={industries}
          onChange={setIndustry}
        />
        <Dropdown
          label="State of Operation"
          value={stateOfOperation}
          options={states}
          onChange={setStateOfOperation}
        />
        <Dropdown
          label="Primary Language"
          value={primaryLanguage}
          options={languages}
          onChange={setPrimaryLanguage}
        />
        <Dropdown
          label="Business Size"
          value={businessSize}
          options={businessSizes}
          onChange={setBusinessSize}
        />
      </section>

      <section className="flex flex-col gap-4 rounded-2xl bg-business-section p-4">
        <SectionHeader icon={BellRing} title="Notification Preferences" />
        <div className="flex flex-col gap-2.5">
          {notificationPreferences.map((preference) => (
            <NotificationCard key={preference.title} {...preference} />
          ))}
        </div>
      </section>

      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          className="h-12 flex-1 rounded-xl border-business-field-border bg-business-field text-sm font-semibold text-business-heading hover:bg-business-field/80"
        >
          Back
        </Button>
        <Link
          href="/dashboard"
          className="flex-[1.4]"
          onClick={handleContinue}
        >
          <Button className="h-12 w-full rounded-xl bg-brand-navy text-sm font-semibold hover:bg-brand-navy/90">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
}
