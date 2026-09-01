"use client";

import { ChevronDown, Globe } from "lucide-react";
import { useEffect, useState } from "react";

import { BUSINESS_PROFILE_KEY, readLocalStorageItem, saveLocalStorageItem } from "@/lib/local-storage";
import { Logo } from "@/components/landing/logo";

type BusinessProfile = {
  primaryLanguage?: string;
  [key: string]: unknown;
};

const languages = ["English", "Hindi"];

export function Header() {
  const [language, setLanguage] = useState<string>(languages[0]);

  useEffect(() => {
    const savedProfile = readLocalStorageItem<BusinessProfile>(BUSINESS_PROFILE_KEY);
    if (savedProfile?.primaryLanguage && languages.includes(savedProfile.primaryLanguage)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(savedProfile.primaryLanguage);
    }
  }, []);

  const setPersistedLanguage = (value: string) => {
    setLanguage(value);

    const savedProfile = readLocalStorageItem<BusinessProfile>(BUSINESS_PROFILE_KEY) ?? {};
    saveLocalStorageItem(BUSINESS_PROFILE_KEY, {
      ...savedProfile,
      primaryLanguage: value,
    });
  };

  return (
    <header className="relative flex items-center justify-center px-6 pt-6 pb-2">
      <Logo />
      <div className="absolute right-6">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <Globe className="size-3.5 text-brand-navy" aria-hidden="true" />
          </div>
          <select
            value={language}
            onChange={(event) => setPersistedLanguage(event.target.value)}
            aria-label="Select language"
            className="h-9 rounded-full bg-brand-muted pl-11 pr-9 text-sm font-medium text-brand-navy shadow-none outline-none appearance-none"
          >
            {languages.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-3.5 opacity-60 text-brand-navy"
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
}
