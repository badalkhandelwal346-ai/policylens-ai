"use client";

import { AccountSection } from "./account-section";
import { BottomNavigation } from "./bottom-navigation";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileHeader } from "./profile-header";
import { ProfileMenu } from "./profile-menu";
import { ProfileStats } from "./profile-stats";
import { SettingsSection } from "./settings-section";
import { UserInfoCard } from "./user-info-card";

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-28 pt-2">
      <main className="relative mx-auto min-h-screen w-full max-w-md bg-white shadow-xl sm:rounded-3xl sm:border sm:border-slate-100 overflow-hidden">
        {/* Header */}
        <ProfileHeader />

        {/* Profile Avatar & User Information */}
        <ProfileAvatar />
        <UserInfoCard />

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
