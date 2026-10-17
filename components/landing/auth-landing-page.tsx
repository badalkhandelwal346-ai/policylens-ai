"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, ChevronDown, Languages, ScanSearch } from "lucide-react";

import {
  BUSINESS_PROFILE_KEY,
  readLocalStorageItem,
  saveLocalStorageItem,
} from "@/lib/local-storage";
import { PolicyIllustration } from "@/components/landing/policy-illustration";

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
    if (mode === "signup") {
      router.push("/business");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-[#F9F7F1]/80 text-foreground">
      {/* Centered Two-Panel Authentication Card */}
      <div className="relative w-full max-w-5xl rounded-[28px] md:rounded-[32px] overflow-hidden bg-white shadow-2xl shadow-slate-900/10 border border-slate-200/80 flex flex-col md:flex-row transition-all">
        
        {/* Left Panel: Brand & Product Introduction */}
        <section
          className="relative bg-[#7899B8] p-6 sm:p-8 lg:p-12 flex flex-col justify-between md:w-[48%] lg:w-[46%] shrink-0 text-[#16273B] overflow-hidden"
          aria-label="Product introduction"
        >
          {/* Top: Logo & Wordmark in rounded container */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/95 rounded-2xl px-4 py-2 shadow-xs border border-white/70">
              <ScanSearch className="size-4 text-[#16273B]" strokeWidth={2.5} aria-hidden="true" />
              <span className="text-base font-bold tracking-tight text-[#16273B]">
                PolicyLens
              </span>
              <span className="bg-[#16273B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                AI
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#16273B] leading-[1.25] mt-8 sm:mt-12">
              Understand Government Policies with Confidence.
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-[15px] font-normal leading-relaxed text-[#243B53]/90 mt-3.5 max-w-sm">
              Empowering MSMEs and businesses to understand relevant policies, simplify
              regulations, and make informed decisions.
            </p>
          </div>

          {/* Middle: Document & Verified Policy Vector Illustration */}
          <div className="my-8 sm:my-10">
            <PolicyIllustration />
          </div>

          {/* Bottom: Subtle Divider & Product Descriptor */}
          <div className="pt-6 border-t border-[#16273B]/15 flex items-center justify-between gap-3 mt-auto">
            <div className="inline-flex items-center gap-2">
              <div className="size-5 rounded-full bg-[#16273B] text-white flex items-center justify-center shrink-0">
                <Check className="size-3 stroke-[3]" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold text-[#16273B] tracking-tight">
                Policy intelligence for businesses
              </span>
            </div>

            <span className="px-3 py-1 rounded-full bg-white/35 border border-white/50 text-[10px] font-bold tracking-wider text-[#16273B] uppercase">
              ENTERPRISE AI
            </span>
          </div>
        </section>

        {/* Right Panel: Account & Entry Form */}
        <section
          className="relative bg-white p-6 sm:p-10 lg:p-14 flex flex-col justify-between flex-1 md:w-[52%] lg:w-[54%]"
          aria-label="Account sign in and registration"
        >
          {/* Top-Right: Language Selector */}
          <div className="flex justify-end">
            <div className="relative inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/70 hover:bg-slate-100/80 px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-colors focus-within:ring-2 focus-within:ring-brand-navy/30">
              <Languages className="size-3.5 text-slate-500" aria-hidden="true" />
              <span>{language === "English" ? "English (US)" : "Hindi"}</span>
              <ChevronDown className="size-3 text-slate-400" aria-hidden="true" />
              <select
                value={language}
                onChange={(event) => handleLanguageChange(event.target.value)}
                aria-label="Select language"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full appearance-none"
              >
                <option value="English">English (US)</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="my-auto py-6 sm:py-8 w-full max-w-[390px] mx-auto">
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

          {/* Bottom Navigation Links */}
          <div className="pt-6 text-center text-xs sm:text-sm text-slate-500">
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
                  className="font-medium text-slate-600 hover:text-brand-navy hover:underline"
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
        </section>
      </div>
    </div>
  );
}
