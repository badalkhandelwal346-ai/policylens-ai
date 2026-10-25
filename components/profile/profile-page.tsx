"use client";

import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, X } from "lucide-react";

import { ProfileHeader } from "./profile-header";
import { AccountOverviewCard } from "./account-overview-card";
import {
  BusinessInfoCard,
  type BusinessProfileData,
} from "./business-info-card";
import { PersonalizationPreferencesCard } from "./personalization-preferences-card";
import { ProfileReadinessCard } from "./profile-readiness-card";
import { AccountSettingsCard } from "./account-settings-card";
import {
  BUSINESS_PROFILE_KEY,
  readLocalStorageItem,
  saveLocalStorageItem,
} from "@/lib/local-storage";

const DEFAULT_PROFILE: BusinessProfileData = {
  businessName: "Acme Retail Solutions",
  businessType: "Limited Liability Company",
  industry: "Retail",
  stateOfOperation: "New York",
  primaryLanguage: "English",
  businessSize: "11-50 employees",
  userEmail: "compliance@acmeretail.com",
  notificationPreferences: [
    "High-Priority Legislative Alerts",
    "Weekly Policy Digest",
  ],
};

export function ProfilePage() {
  const [profile, setFormData] = useState<BusinessProfileData>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Restore stored business profile on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = readLocalStorageItem<BusinessProfileData>(BUSINESS_PROFILE_KEY);
      if (saved) {
        setFormData((prev) => ({
          ...prev,
          ...saved,
          businessName: saved.businessName || prev.businessName,
          industry: saved.industry || prev.industry,
          stateOfOperation: saved.stateOfOperation || prev.stateOfOperation,
          businessType: saved.businessType || prev.businessType,
          primaryLanguage: saved.primaryLanguage || prev.primaryLanguage,
          businessSize: saved.businessSize || prev.businessSize,
          notificationPreferences:
            saved.notificationPreferences || prev.notificationPreferences,
        }));
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save changes to profile
  const handleSaveProfile = useCallback((updated: BusinessProfileData): boolean => {
    const success = saveLocalStorageItem(BUSINESS_PROFILE_KEY, updated);
    if (success) {
      setFormData(updated);
      setIsEditing(false);
      setSaveSuccessMessage(
        "Profile updated successfully. Personalization parameters are active across your Dashboard, Policies, and AI Assistant."
      );
      setTimeout(() => {
        setSaveSuccessMessage(null);
      }, 5000);
      return true;
    }
    return false;
  }, []);

  // Toggle notification preference
  const handleTogglePreference = useCallback(
    (prefTitle: string) => {
      const current = profile.notificationPreferences || [
        "High-Priority Legislative Alerts",
      ];
      const updatedPreferences = current.includes(prefTitle)
        ? current.filter((p) => p !== prefTitle)
        : [...current, prefTitle];

      const updatedProfile = {
        ...profile,
        notificationPreferences: updatedPreferences,
      };

      setFormData(updatedProfile);
      saveLocalStorageItem(BUSINESS_PROFILE_KEY, updatedProfile);
    },
    [profile]
  );

  // Language switch
  const handleLanguageChange = useCallback(
    (newLang: string) => {
      const updatedProfile = {
        ...profile,
        primaryLanguage: newLang,
      };
      setFormData(updatedProfile);
      saveLocalStorageItem(BUSINESS_PROFILE_KEY, updatedProfile);
    },
    [profile]
  );

  return (
    <div className="relative mx-auto flex min-h-full w-full max-w-[1240px] flex-col bg-white pb-28 md:pb-16 px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
      {/* Page Title & Breadcrumb Header */}
      <ProfileHeader
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing((prev) => !prev)}
      />

      {/* Success Notification Banner */}
      {saveSuccessMessage && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 text-xs sm:text-sm text-status-green shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="size-4 shrink-0 text-status-green" />
            <span className="font-medium text-emerald-900">{saveSuccessMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSaveSuccessMessage(null)}
            className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Main Responsive Grid Layout: Content Column & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Account Overview, Business Information, Personalization */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section A — Account Overview */}
          <AccountOverviewCard
            businessName={profile.businessName}
            industry={profile.industry}
            stateOfOperation={profile.stateOfOperation}
            userEmail={profile.userEmail}
            isEditing={isEditing}
            onEditClick={() => setIsEditing((prev) => !prev)}
          />

          {/* Section B — Business Information */}
          <BusinessInfoCard
            profile={profile}
            isEditing={isEditing}
            onStartEdit={() => setIsEditing(true)}
            onSave={handleSaveProfile}
            onCancel={() => setIsEditing(false)}
          />

          {/* Section C — Policy Personalization Preferences */}
          <PersonalizationPreferencesCard
            profile={profile}
            onTogglePreference={handleTogglePreference}
            onLanguageChange={handleLanguageChange}
          />
        </div>

        {/* Right Column (4 cols): Profile Completeness & Account Settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* Section E — Profile Completeness & Personalization Status */}
          <ProfileReadinessCard
            profile={profile}
            onCompleteClick={() => setIsEditing(true)}
          />

          {/* Section D — Application & Account Settings */}
          <AccountSettingsCard />
        </div>
      </div>
    </div>
  );
}
