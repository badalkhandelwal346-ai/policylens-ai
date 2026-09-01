"use client";

import { useEffect, useState } from "react";

import { AccountSection } from "./account-section";
import { BottomNavigation } from "./bottom-navigation";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileHeader } from "./profile-header";
import { ProfileMenu } from "./profile-menu";
import { ProfileStats } from "./profile-stats";
import { SettingsSection } from "./settings-section";
import { UserInfoCard } from "./user-info-card";
import {
  BUSINESS_PROFILE_KEY,
  readLocalStorageItem,
} from "@/lib/local-storage";

type BusinessProfile = {
  businessName?: string;
  businessType?: string;
  industry?: string;
  stateOfOperation?: string;
  primaryLanguage?: string;
  businessSize?: string;
};

export function ProfilePage() {
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);

  useEffect(() => {
    const profile = readLocalStorageItem<BusinessProfile>(BUSINESS_PROFILE_KEY);
    if (profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBusinessProfile(profile);
    }
  }, []);

  const businessName = businessProfile?.businessName?.trim();
  const businessTitle = businessProfile?.industry && businessProfile?.stateOfOperation
    ? `${businessProfile.industry} · ${businessProfile.stateOfOperation}`
    : undefined;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-28 pt-2">
      <main className="relative mx-auto min-h-screen w-full max-w-md bg-white shadow-xl sm:rounded-3xl sm:border sm:border-slate-100 overflow-hidden">
        {/* Header */}
        <ProfileHeader />

        {/* Profile Avatar & User Information */}
        <ProfileAvatar alt={businessName ?? undefined} />
        <UserInfoCard name={businessName ?? undefined} title={businessTitle ?? undefined} />

        {/* Content Body */}
        <div className="flex flex-col gap-5 px-4 pb-8">
          {/* Business Completion Score */}
          <ProfileStats />

          {/* Account, Preferences & Support Menus */}
          <ProfileMenu>
            <AccountSection />
            <SettingsSection />
          </ProfileMenu>

          {/* App Version & Tier Footer */}
          <div className="pt-4 pb-6 text-center">
            <p className="text-xs font-bold tracking-tight text-slate-400">
              PolicyLens AI v2.4.0
            </p>
            <p className="mt-0.5 text-xs font-medium text-slate-400">
              Enterprise Compliance Tier
            </p>
          </div>
        </div>

        {/* Shared Bottom Navigation */}
        <BottomNavigation />
      </main>
    </div>
  );
}
