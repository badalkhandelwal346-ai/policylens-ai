"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import {
  BUSINESS_PROFILE_KEY,
  readLocalStorageItem,
  saveLocalStorageItem,
} from "@/lib/local-storage";
import { PolicyIllustration } from "@/components/landing/policy-illustration";
import {
  OnboardingCardShell,
  OnboardingLeftPanel,
  OnboardingRightPanel,
} from "@/components/landing/onboarding-shell";

type BusinessProfile = {
  businessName?: string;
  primaryLanguage?: string;
  [key: string]: unknown;
};

const languages = ["English", "Hindi"];

export function AuthLandingPage() {
  const router = useRouter();

  // Mode: "signin" (Welcome to PolicyLens AI) or "signup" (Create Account)
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [language, setLanguage] = useState<string>("English");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Restore saved language and business profile on mount
  useEffect(() => {
    const savedProfile = readLocalStorageItem<BusinessProfile>(BUSINESS_PROFILE_KEY);
    if (savedProfile) {
      if (savedProfile.primaryLanguage && languages.includes(savedProfile.primaryLanguage)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLanguage(savedProfile.primaryLanguage);
      }
      if (savedProfile.businessName) {
        setFullName(savedProfile.businessName);
      }
    }
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    const savedProfile = readLocalStorageItem<BusinessProfile>(BUSINESS_PROFILE_KEY) ?? {};
    saveLocalStorageItem(BUSINESS_PROFILE_KEY, {
      ...savedProfile,
      primaryLanguage: newLanguage,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Save profile state if name was supplied in create account view
    if (fullName.trim()) {
      const savedProfile = readLocalStorageItem<BusinessProfile>(BUSINESS_PROFILE_KEY) ?? {};
      saveLocalStorageItem(BUSINESS_PROFILE_KEY, {
        ...savedProfile,
        businessName: fullName.trim(),
        primaryLanguage: language,
      });
    }

    // Connect seamlessly to existing application routes
    const savedProfile = readLocalStorageItem<BusinessProfile>(BUSINESS_PROFILE_KEY);
    if (mode === "signup" || !savedProfile?.businessName) {
      router.push("/business");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <OnboardingCardShell>
      {/* Left Panel: Brand Wordmark, Step 1 Pill, Product Intro & Vector Illustration */}
      <OnboardingLeftPanel
        stepText="Step 1 of 2 · Account Setup"
        headline="Understand Government Policies with Confidence."
        description="Empowering MSMEs and businesses to understand relevant policies, simplify regulations, and make informed decisions."
        footerBadge="ENTERPRISE AI"
      >
        <PolicyIllustration />
      </OnboardingLeftPanel>

      {/* Right Panel: Progress Indicator, Language Switcher & Authentication Form */}
      <OnboardingRightPanel
        stepNumber={1}
        language={language}
        onLanguageChange={handleLanguageChange}
        footer={
          <div className="text-center text-xs sm:text-sm text-slate-500">
            {mode === "signin" ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <span>Don&apos;t have an account?</span>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-semibold text-[#243B53] hover:underline cursor-pointer"
                >
                  Create Account
                </button>
                <span className="hidden sm:inline text-slate-300">·</span>
                <Link
                  href="/business"
                  className="font-medium text-slate-600 hover:text-[#16273B] hover:underline"
                >
                  Set up Business Profile
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1.5">
                <span>Already have account?</span>
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="font-semibold text-[#243B53] hover:underline cursor-pointer"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        }
      >
        <div className="my-auto py-6 sm:py-8 w-full max-w-[420px] mx-auto">
          {/* Prominent Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#16273B]">
            {mode === "signin" ? "Welcome to PolicyLens AI" : "Create Account"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {mode === "signin"
              ? "Sign in to access your regulatory dashboard and policy intelligence."
              : "Empower your business with tailored policy analysis and alerts."}
          </p>

          {/* Entry Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Full Name field in Create Account mode */}
            {mode === "signup" && (
              <div className="space-y-1">
                <label
                  htmlFor="fullName"
                  className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="e.g. Alex Morgan"
                  autoComplete="name"
                  required={mode === "signup"}
                  className="w-full bg-transparent border-0 border-b border-slate-300 pb-2.5 pt-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#243B53] transition-colors"
                />
              </div>
            )}

            {/* Business Email */}
            <div className="space-y-1">
              <label
                htmlFor="businessEmail"
                className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase"
              >
                Business Email
              </label>
              <input
                id="businessEmail"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="alex@organization.com"
                autoComplete="email"
                className="w-full bg-transparent border-0 border-b border-slate-300 pb-2.5 pt-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#243B53] transition-colors"
              />
            </div>

            {/* Password field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase"
                >
                  Password
                </label>
                <span className="text-xs text-slate-400 font-normal">
                  {mode === "signup" ? "8+ characters" : "Demo access"}
                </span>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••••••"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                className="w-full bg-transparent border-0 border-b border-slate-300 pb-2.5 pt-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#243B53] transition-colors"
              />
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#243B53] hover:bg-[#1A2C3E] active:scale-[0.99] text-white text-sm font-semibold py-3.5 px-6 rounded-xl shadow-md shadow-[#243B53]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75"
              >
                <span>
                  {mode === "signin" ? "Sign In to Dashboard" : "Create Account"}
                </span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </OnboardingRightPanel>
    </OnboardingCardShell>
  );
}
