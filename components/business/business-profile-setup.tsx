"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  Loader2,
} from "lucide-react";

import { ComplianceMatrixCard } from "@/components/business/compliance-matrix-card";
import {
  OnboardingCardShell,
  OnboardingLeftPanel,
  OnboardingRightPanel,
} from "@/components/landing/onboarding-shell";
import {
  BUSINESS_PROFILE_KEY,
  readLocalStorageItem,
  saveLocalStorageItem,
} from "@/lib/local-storage";
import { cn } from "@/lib/utils";

export type BusinessProfileData = {
  businessName: string;
  businessType: string;
  industry: string;
  stateOfOperation: string;
  primaryLanguage: string;
  businessSize: string;
  notificationPreferences?: string[];
  [key: string]: unknown;
};

export const businessTypes = [
  "Private Limited Company (Pvt Ltd)",
  "Limited Liability Partnership (LLP / LLC)",
  "Sole Proprietorship",
  "Partnership Firm",
  "Public Limited Company",
  "Corporation",
];

export const industries = [
  "Technology & Software",
  "Retail & E-commerce",
  "Healthcare & Life Sciences",
  "Manufacturing & Production",
  "Finance & Banking",
  "Energy & Clean Tech",
];

// Indian states and union territories per application focus
export const states = [
  "Maharashtra",
  "Karnataka",
  "Delhi (NCT)",
  "Tamil Nadu",
  "Gujarat",
  "Telangana",
  "Uttar Pradesh",
  "Haryana",
  "West Bengal",
  "Rajasthan",
  "Kerala",
  "Andhra Pradesh",
  "Madhya Pradesh",
  "Punjab",
  "Bihar",
  "Odisha",
];

export const supportedLanguages = [
  { value: "English", label: "English (US)" },
  { value: "Hindi", label: "Hindi" },
];

export const notificationOptions = [
  {
    id: "high-priority",
    title: "High-Priority Legislative Alerts",
    cadenceBadge: "Immediate",
    badgeColor: "text-blue-600 bg-blue-50 border-blue-200/80",
    description:
      "Immediate notification for emergency bills and regulatory mandates directly impacting your jurisdiction.",
    defaultSelected: true,
  },
  {
    id: "weekly-digest",
    title: "Weekly Policy Digest",
    cadenceBadge: "Every Monday",
    badgeColor: "text-slate-600 bg-slate-100 border-slate-200/80",
    description:
      "Curated weekly executive brief summarizing legislative movements, gazette notifications, and committee votes.",
    defaultSelected: true,
  },
  {
    id: "deadline-reminders",
    title: "Important Deadline Reminders",
    cadenceBadge: "Monthly",
    badgeColor: "text-slate-600 bg-slate-100 border-slate-200/80",
    description:
      "Proactive reminders for statutory filings, mandatory submission windows, and annual compliance milestones.",
    defaultSelected: false,
  },
];

export function BusinessProfileSetup() {
  const router = useRouter();

  // Form states
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState(businessTypes[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const [stateOfOperation, setStateOfOperation] = useState(states[0]);
  const [primaryLanguage, setPrimaryLanguage] = useState("English");
  const [businessSize, setBusinessSize] = useState("11-50 employees");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([
    "High-Priority Legislative Alerts",
    "Weekly Policy Digest",
  ]);

  // Validation & UX states
  const [errors, setErrors] = useState<{ businessName?: string; businessType?: string }>({});
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Restore existing business profile on mount
  useEffect(() => {
    const saved = readLocalStorageItem<BusinessProfileData>(BUSINESS_PROFILE_KEY);
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved.businessName) setBusinessName(saved.businessName);
      if (saved.businessType) setBusinessType(saved.businessType);
      if (saved.industry) setIndustry(saved.industry);
      if (saved.stateOfOperation) setStateOfOperation(saved.stateOfOperation);
      if (saved.primaryLanguage) {
        setPrimaryLanguage(
          saved.primaryLanguage.includes("Hindi") ? "Hindi" : "English"
        );
      }
      if (saved.businessSize) setBusinessSize(saved.businessSize);
      if (Array.isArray(saved.notificationPreferences) && saved.notificationPreferences.length > 0) {
        setSelectedNotifications(saved.notificationPreferences);
      }
    }
  }, []);

  const handleLanguageChange = (newLang: string) => {
    setPrimaryLanguage(newLang);
    // Keep local storage in sync with user's language choice
    const saved = readLocalStorageItem<BusinessProfileData>(BUSINESS_PROFILE_KEY) ?? {
      businessName: "",
      businessType: "",
      industry: "",
      stateOfOperation: "",
      primaryLanguage: "",
      businessSize: "",
    };
    saveLocalStorageItem(BUSINESS_PROFILE_KEY, {
      ...saved,
      primaryLanguage: newLang,
    });
  };

  const toggleNotification = (title: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveError(null);

    // Validation
    const newErrors: { businessName?: string; businessType?: string } = {};
    if (!businessName.trim()) {
      newErrors.businessName = "Business name is required to personalize your regulatory intelligence.";
    }
    if (!businessType.trim()) {
      newErrors.businessType = "Please select a business type.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const nameInput = document.getElementById("businessName");
      if (nameInput) {
        nameInput.focus();
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const existingProfile =
        readLocalStorageItem<BusinessProfileData>(BUSINESS_PROFILE_KEY) ?? {
          businessName: "",
          businessType: "",
          industry: "",
          stateOfOperation: "",
          primaryLanguage: "",
          businessSize: "",
        };

      const updatedProfile: BusinessProfileData = {
        ...existingProfile,
        businessName: businessName.trim(),
        businessType: businessType.trim(),
        industry: industry.trim(),
        stateOfOperation: stateOfOperation.trim(),
        primaryLanguage,
        businessSize,
        notificationPreferences: selectedNotifications,
      };

      const saved = saveLocalStorageItem(BUSINESS_PROFILE_KEY, updatedProfile);

      if (!saved) {
        throw new Error("Local storage save failed");
      }

      // Small delay for smooth UX transition
      await new Promise((resolve) => setTimeout(resolve, 350));
      router.push("/dashboard");
    } catch {
      setSaveError("Unable to save your business profile. Please verify browser storage settings.");
      setIsSubmitting(false);
    }
  };

  return (
    <OnboardingCardShell>
      {/* Left Panel: Standard PolicyLens-Ai Wordmark, Step 2 Pill, Context & Compliance Preview */}
      <OnboardingLeftPanel
        stepText="Step 2 of 2 · Profile Setup"
        headline="Personalize your regulatory intelligence."
        description="Tell us about your business so PolicyLens AI can help you discover relevant policies, understand regulatory changes, and organize important deadlines."
        footerBadge="ENTERPRISE AI"
      >
        <div className="w-full max-w-[420px] mx-auto">
          <ComplianceMatrixCard />
        </div>
      </OnboardingLeftPanel>

      {/* Right Panel: Top Progress Indicator, Language Selector & 2-Column Profile Form */}
      <OnboardingRightPanel
        stepNumber={2}
        language={primaryLanguage}
        onLanguageChange={handleLanguageChange}
      >
        <div className="py-2 sm:py-4 w-full max-w-[760px] mx-auto">
          {/* Header */}
          <h2 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-[#16273B] leading-snug">
            Let&apos;s set up your business profile
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
            Tell us a bit about your operations. PolicyLens AI uses this to filter relevant
            legislative updates and compliance requirements specific to your industry and location.
          </p>

          {saveError && (
            <div
              className="mt-4 flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700"
              role="alert"
            >
              <AlertCircle className="size-4 shrink-0 text-rose-600" aria-hidden="true" />
              <span>{saveError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-6">
            {/* SECTION 1: BUSINESS IDENTITY (Two-column layout) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                  1
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Business Identity
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Business Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="businessName"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Business Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={businessName}
                    onChange={(e) => {
                      setBusinessName(e.target.value);
                      if (errors.businessName) {
                        setErrors((prev) => ({ ...prev, businessName: undefined }));
                      }
                    }}
                    placeholder="e.g. Blue Sky Consulting Group"
                    className={cn(
                      "h-11 w-full rounded-xl border bg-slate-50/70 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all",
                      errors.businessName
                        ? "border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                        : "border-slate-200 focus:bg-white focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/15"
                    )}
                    aria-invalid={!!errors.businessName}
                    aria-describedby={errors.businessName ? "businessName-error" : undefined}
                  />
                  {errors.businessName && (
                    <p
                      id="businessName-error"
                      className="text-[11px] font-medium text-rose-600 flex items-center gap-1"
                    >
                      <AlertCircle className="size-3 shrink-0" aria-hidden="true" />
                      {errors.businessName}
                    </p>
                  )}
                </div>

                {/* Business Type */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="businessType"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Business Type <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="businessType"
                      name="businessType"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-3.5 pr-9 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/15 cursor-pointer"
                    >
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: OPERATIONAL CONTEXT (Two-column layout) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                  2
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Operational Context
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Industry */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="industry"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Industry
                  </label>
                  <div className="relative">
                    <select
                      id="industry"
                      name="industry"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-3.5 pr-9 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/15 cursor-pointer"
                    >
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* State of Operation */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="stateOfOperation"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    State of Operation
                  </label>
                  <div className="relative">
                    <select
                      id="stateOfOperation"
                      name="stateOfOperation"
                      value={stateOfOperation}
                      onChange={(e) => setStateOfOperation(e.target.value)}
                      className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-3.5 pr-9 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/15 cursor-pointer"
                    >
                      {!states.includes(stateOfOperation) && stateOfOperation && (
                        <option value={stateOfOperation}>{stateOfOperation}</option>
                      )}
                      {states.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Primary Language */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="primaryLanguage"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Primary Language
                  </label>
                  <div className="relative">
                    <select
                      id="primaryLanguage"
                      name="primaryLanguage"
                      value={primaryLanguage}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-3.5 pr-9 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/15 cursor-pointer"
                    >
                      {supportedLanguages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Business Size */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="businessSize"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Business Size
                  </label>
                  <div className="relative">
                    <select
                      id="businessSize"
                      name="businessSize"
                      value={businessSize}
                      onChange={(e) => setBusinessSize(e.target.value)}
                      className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-3.5 pr-9 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:border-[#243B53] focus:ring-2 focus:ring-[#243B53]/15 cursor-pointer"
                    >
                      <option value="1-10 employees">1-10 employees</option>
                      <option value="11-50 employees">11-50 employees</option>
                      <option value="51-200 employees">51-200 employees</option>
                      <option value="201+ employees">201+ employees</option>
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: NOTIFICATION PREFERENCES (Full available width) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                  3
                </span>
                <Bell className="size-3.5 text-slate-500" aria-hidden="true" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Notification Cadence & Alert Triggers
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {notificationOptions.map((opt) => {
                  const isSelected = selectedNotifications.includes(opt.title);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleNotification(opt.title)}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          toggleNotification(opt.title);
                        }
                      }}
                      tabIndex={0}
                      role="checkbox"
                      aria-checked={isSelected}
                      className={cn(
                        "group flex items-start gap-3.5 rounded-xl border p-4 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-[#243B53]/20",
                        isSelected
                          ? "border-slate-800 bg-slate-50/70 shadow-xs"
                          : "border-slate-200 bg-white hover:bg-slate-50/50"
                      )}
                    >
                      {/* Checkbox */}
                      <div
                        className={cn(
                          "mt-0.5 size-4.5 rounded-md flex items-center justify-center shrink-0 transition-colors border",
                          isSelected
                            ? "bg-[#16273B] border-[#16273B] text-white"
                            : "border-slate-300 bg-white group-hover:border-slate-400"
                        )}
                      >
                        {isSelected && (
                          <Check className="size-3 stroke-[3]" aria-hidden="true" />
                        )}
                      </div>

                      {/* Content: Title, Cadence Badge & Full Width Description */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-[#16273B] leading-tight">
                            {opt.title}
                          </span>
                          <span
                            className={cn(
                              "shrink-0 rounded px-2.5 py-0.5 text-[10px] font-semibold border",
                              opt.badgeColor
                            )}
                          >
                            {opt.cadenceBadge}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto order-2 sm:order-1 text-center py-3.5 px-5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Back to Account Setup
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 order-1 sm:order-2 bg-[#243B53] hover:bg-[#1A2C3E] active:scale-[0.99] text-white text-sm font-semibold py-3.5 px-6 rounded-xl shadow-md shadow-[#243B53]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    <span>Saving Profile...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Setup & Launch Dashboard</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </OnboardingRightPanel>
    </OnboardingCardShell>
  );
}
