"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Check,
  Globe,
  MapPin,
  Pencil,
  Store,
  Users,
  Briefcase,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export interface BusinessProfileData {
  businessName?: string;
  businessType?: string;
  industry?: string;
  stateOfOperation?: string;
  primaryLanguage?: string;
  businessSize?: string;
  userEmail?: string;
  notificationPreferences?: string[];
}

export const businessTypes = [
  "Sole Proprietorship",
  "Limited Liability Company",
  "Corporation",
  "Partnership",
];

export const industries = [
  "Technology",
  "Retail",
  "Healthcare",
  "Manufacturing",
  "Finance",
];

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
  "California",
  "New York",
];

export const languages = ["English", "Hindi"];

export const businessSizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201+ employees",
];

interface BusinessInfoCardProps {
  profile: BusinessProfileData;
  isEditing: boolean;
  onStartEdit: () => void;
  onSave: (updated: BusinessProfileData) => boolean;
  onCancel: () => void;
}

export function BusinessInfoCard({
  profile,
  isEditing,
  onStartEdit,
  onSave,
  onCancel,
}: BusinessInfoCardProps) {
  // Local edit form state
  const [formData, setFormData] = useState<BusinessProfileData>(profile);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleStartEditing = () => {
    setFormData(profile);
    setValidationError(null);
    onStartEdit();
  };

  const handleCancelEditing = () => {
    setFormData(profile);
    setValidationError(null);
    onCancel();
  };

  const handleFieldChange = (field: keyof BusinessProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName?.trim()) {
      setValidationError("Business name cannot be empty.");
      return;
    }

    const success = onSave(formData);
    if (!success) {
      setValidationError("Failed to save changes. Please try again.");
    }
  };

  return (
    <section
      aria-label="Business Information"
      className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Store className="size-4 text-brand-navy" aria-hidden="true" />
            <h2 className="text-base font-bold text-brand-navy">
              Business Information
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Core entity parameters used by PolicyLens AI to match state statutes, compliance deadlines, and recommendations.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            id="business-info-edit-btn"
            onClick={handleStartEditing}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-navy hover:bg-slate-50 hover:border-slate-300 transition-colors shrink-0 cursor-pointer shadow-2xs"
          >
            <Pencil className="size-3 text-slate-500" />
            <span>Edit</span>
          </button>
        )}
      </div>

      {validationError && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-status-red">
          <AlertCircle className="size-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* View Mode */}
      {!isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Field 1: Business Name */}
            <div className="rounded-xl bg-slate-50/70 border border-slate-200/60 p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Business Name
              </span>
              <p className="text-sm font-semibold text-brand-navy truncate">
                {profile.businessName || "Not configured"}
              </p>
            </div>

            {/* Field 2: Industry Category */}
            <div className="rounded-xl bg-slate-50/70 border border-slate-200/60 p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Industry Category
              </span>
              <div className="flex items-center gap-1.5">
                <Briefcase className="size-3.5 text-primary-blue" />
                <p className="text-sm font-semibold text-brand-navy">
                  {profile.industry || "Retail"}
                </p>
              </div>
            </div>

            {/* Field 3: Business Type */}
            <div className="rounded-xl bg-slate-50/70 border border-slate-200/60 p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Entity Legal Structure
              </span>
              <div className="flex items-center gap-1.5">
                <Building2 className="size-3.5 text-slate-500" />
                <p className="text-sm font-semibold text-brand-navy">
                  {profile.businessType || "Limited Liability Company"}
                </p>
              </div>
            </div>

            {/* Field 4: State / Jurisdiction */}
            <div className="rounded-xl bg-slate-50/70 border border-slate-200/60 p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Operating Jurisdiction
              </span>
              <div className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-status-amber" />
                <p className="text-sm font-semibold text-brand-navy">
                  {profile.stateOfOperation || "New York"}
                </p>
              </div>
            </div>

            {/* Field 5: Business Size */}
            <div className="rounded-xl bg-slate-50/70 border border-slate-200/60 p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Organization Size
              </span>
              <div className="flex items-center gap-1.5">
                <Users className="size-3.5 text-slate-500" />
                <p className="text-sm font-semibold text-brand-navy">
                  {profile.businessSize || "11-50 employees"}
                </p>
              </div>
            </div>

            {/* Field 6: Primary Language */}
            <div className="rounded-xl bg-slate-50/70 border border-slate-200/60 p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Primary Intelligence Language
              </span>
              <div className="flex items-center gap-1.5">
                <Globe className="size-3.5 text-ai-cyan" />
                <p className="text-sm font-semibold text-brand-navy">
                  {profile.primaryLanguage || "English"}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <span>Need to update onboarding details?</span>
            <Link
              href="/business"
              className="inline-flex items-center gap-1 font-semibold text-primary-blue hover:underline"
            >
              <span>Open Guided Onboarding</span>
              <ExternalLink className="size-3" />
            </Link>
          </div>
        </div>
      ) : (
        /* Edit Mode Form */
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Field: Business Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="edit-business-name"
                className="text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Business Name <span className="text-status-red">*</span>
              </label>
              <input
                id="edit-business-name"
                type="text"
                value={formData.businessName || ""}
                onChange={(e) => handleFieldChange("businessName", e.target.value)}
                placeholder="e.g. Acme Corp"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-brand-navy placeholder:text-slate-400 focus:border-[#7899B8] focus:ring-2 focus:ring-[#7899B8]/20 focus:outline-hidden transition-all"
              />
            </div>

            {/* Field: Industry */}
            <div className="space-y-1.5">
              <label
                htmlFor="edit-industry"
                className="text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Industry Category
              </label>
              <select
                id="edit-industry"
                value={formData.industry || industries[0]}
                onChange={(e) => handleFieldChange("industry", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-brand-navy focus:border-[#7899B8] focus:ring-2 focus:ring-[#7899B8]/20 focus:outline-hidden transition-all cursor-pointer"
              >
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Field: Business Type */}
            <div className="space-y-1.5">
              <label
                htmlFor="edit-business-type"
                className="text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Legal Entity Type
              </label>
              <select
                id="edit-business-type"
                value={formData.businessType || businessTypes[0]}
                onChange={(e) => handleFieldChange("businessType", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-brand-navy focus:border-[#7899B8] focus:ring-2 focus:ring-[#7899B8]/20 focus:outline-hidden transition-all cursor-pointer"
              >
                {businessTypes.map((bt) => (
                  <option key={bt} value={bt}>
                    {bt}
                  </option>
                ))}
              </select>
            </div>

            {/* Field: State of Operation */}
            <div className="space-y-1.5">
              <label
                htmlFor="edit-state"
                className="text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Operating Jurisdiction / State
              </label>
              <select
                id="edit-state"
                value={formData.stateOfOperation || states[0]}
                onChange={(e) => handleFieldChange("stateOfOperation", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-brand-navy focus:border-[#7899B8] focus:ring-2 focus:ring-[#7899B8]/20 focus:outline-hidden transition-all cursor-pointer"
              >
                {states.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Field: Business Size */}
            <div className="space-y-1.5">
              <label
                htmlFor="edit-business-size"
                className="text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Business Size
              </label>
              <select
                id="edit-business-size"
                value={formData.businessSize || businessSizes[0]}
                onChange={(e) => handleFieldChange("businessSize", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-brand-navy focus:border-[#7899B8] focus:ring-2 focus:ring-[#7899B8]/20 focus:outline-hidden transition-all cursor-pointer"
              >
                {businessSizes.map((bs) => (
                  <option key={bs} value={bs}>
                    {bs}
                  </option>
                ))}
              </select>
            </div>

            {/* Field: Primary Language */}
            <div className="space-y-1.5">
              <label
                htmlFor="edit-language"
                className="text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Primary Language
              </label>
              <select
                id="edit-language"
                value={formData.primaryLanguage || languages[0]}
                onChange={(e) => handleFieldChange("primaryLanguage", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-brand-navy focus:border-[#7899B8] focus:ring-2 focus:ring-[#7899B8]/20 focus:outline-hidden transition-all cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              id="business-info-cancel-btn"
              onClick={handleCancelEditing}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="business-info-save-btn"
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-navy text-white px-5 py-2 text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
            >
              <Check className="size-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
