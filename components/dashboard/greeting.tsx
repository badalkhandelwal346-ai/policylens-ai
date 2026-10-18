"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { BUSINESS_PROFILE_KEY, readLocalStorageItem } from "@/lib/local-storage";

type GreetingProps = {
  name: string;
  subtitle?: ReactNode;
};

type BusinessProfile = {
  businessName?: string;
  industry?: string;
  stateOfOperation?: string;
};

export function Greeting({
  name,
  subtitle = "Here is your policy intelligence overview for today.",
}: GreetingProps) {
  const [displayName, setDisplayName] = useState(name);
  const [displaySubtitle, setDisplaySubtitle] = useState<ReactNode>(subtitle);

  useEffect(() => {
    const profile = readLocalStorageItem<BusinessProfile>(BUSINESS_PROFILE_KEY);
    if (profile?.businessName && profile.businessName.trim().length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayName(profile.businessName.trim());
    }
    if (profile?.industry || profile?.stateOfOperation) {
      const parts = [profile.industry, profile.stateOfOperation].filter(Boolean);
      setDisplaySubtitle(
        `Active regulatory tracking for ${parts.join(" • ")}.`
      );
    }
  }, []);

  return (
    <div className="px-4 pt-6 pb-2">
      <h1 className="text-2xl font-semibold tracking-tight text-brand-navy">
        Good Morning, {displayName}.
      </h1>
      <p className="mt-1.5 text-base leading-snug text-brand-muted-foreground">
        {displaySubtitle}
      </p>
    </div>
  );
}
