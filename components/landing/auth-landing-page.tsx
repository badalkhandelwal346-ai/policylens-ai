"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Info, Loader2, X } from "lucide-react";

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
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

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

  const handleSocialSignIn = (provider: "Google" | "Apple") => {
    setSocialNotice(
      `${provider} Sign-In is not configured in this environment yet. Please use your Business Email or demo access below to continue.`
    );
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
                  onClick={() => {
                    setMode("signup");
                    setSocialNotice(null);
                  }}
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
                  onClick={() => {
                    setMode("signin");
                    setSocialNotice(null);
                  }}
                  className="font-semibold text-[#243B53] hover:underline cursor-pointer"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        }
      >
        <div className="my-auto py-5 sm:py-7 w-full max-w-[460px] sm:max-w-[475px] mx-auto">
          {/* Prominent Heading (Scaled to 30-34px on desktop) */}
          <h2 className="text-2xl sm:text-[30px] lg:text-[33px] font-extrabold tracking-tight text-[#16273B] leading-[1.2]">
            {mode === "signin" ? "Welcome to PolicyLens AI" : "Create Account"}
          </h2>

          <p className="text-sm sm:text-[15px] text-slate-500 mt-2 sm:mt-2.5 leading-relaxed">
            {mode === "signin"
              ? "Sign in to access your regulatory dashboard and policy intelligence."
              : "Empower your business with tailored policy analysis and alerts."}
          </p>

          {/* Social Sign-In Buttons: Google & Apple */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mt-6 sm:mt-7">
            {/* Google Sign-In */}
            <button
              type="button"
              onClick={() => handleSocialSignIn("Google")}
              className="h-11 sm:h-12 w-full rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/90 active:scale-[0.99] px-3.5 flex items-center justify-center gap-2.5 text-xs sm:text-[13px] font-semibold text-slate-700 shadow-xs hover:border-slate-300 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#243B53]/20"
              aria-label="Continue with Google"
            >
              <svg className="size-4.5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="truncate">Continue with Google</span>
            </button>

            {/* Apple Sign-In */}
            <button
              type="button"
              onClick={() => handleSocialSignIn("Apple")}
              className="h-11 sm:h-12 w-full rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/90 active:scale-[0.99] px-3.5 flex items-center justify-center gap-2.5 text-xs sm:text-[13px] font-semibold text-slate-700 shadow-xs hover:border-slate-300 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#243B53]/20"
              aria-label="Continue with Apple"
            >
              <svg
                className="size-4.5 shrink-0 fill-current text-slate-900"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.62 1.35-.57.65-1.06 1.72-.93 2.74 1 .08 2.02-.49 2.63-1.24z" />
              </svg>
              <span className="truncate">Continue with Apple</span>
            </button>
          </div>

          {/* Social Auth Notice (if provider not configured) */}
          {socialNotice && (
            <div
              role="status"
              className="mt-3.5 flex items-start justify-between gap-2.5 rounded-xl bg-slate-50 border border-slate-200/90 p-3 text-xs text-slate-700 animate-in fade-in duration-200"
            >
              <div className="flex items-start gap-2">
                <Info className="size-4 shrink-0 text-slate-500 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">{socialNotice}</span>
              </div>
              <button
                type="button"
                onClick={() => setSocialNotice(null)}
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
                aria-label="Dismiss notice"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Subtle "OR" Divider */}
          <div className="relative my-6 sm:my-7 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200/90" />
            </div>
            <div className="relative bg-white px-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              OR
            </div>
          </div>

          {/* Entry Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Full Name field in Create Account mode */}
            {mode === "signup" && (
              <div className="space-y-1.5">
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
                  className="w-full bg-transparent border-0 border-b border-slate-300 pb-3 pt-2 text-sm sm:text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#243B53] transition-colors"
                />
              </div>
            )}

            {/* Business Email */}
            <div className="space-y-1.5">
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
                className="w-full bg-transparent border-0 border-b border-slate-300 pb-3 pt-2 text-sm sm:text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#243B53] transition-colors"
              />
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
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
                className="w-full bg-transparent border-0 border-b border-slate-300 pb-3 pt-2 text-sm sm:text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#243B53] transition-colors"
              />
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 sm:h-12.5 bg-[#243B53] hover:bg-[#1A2C3E] active:scale-[0.99] text-white text-[15px] sm:text-base font-semibold py-3.5 px-6 rounded-xl shadow-md shadow-[#243B53]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    <span>{mode === "signin" ? "Signing In..." : "Creating Account..."}</span>
                  </>
                ) : (
                  <>
                    <span>
                      {mode === "signin" ? "Sign In to Dashboard" : "Create Account"}
                    </span>
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
