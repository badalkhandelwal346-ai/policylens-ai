"use client";

import { ShieldCheck } from "lucide-react";

interface ProfileHeaderProps {
  isEditing?: boolean;
  onToggleEdit?: () => void;
}

export function ProfileHeader({ isEditing, onToggleEdit }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            PolicyLens AI • Account Settings
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#7899B8]/15 border border-[#7899B8]/30 px-2.5 py-0.5 text-[10px] font-semibold text-brand-navy">
            <ShieldCheck className="size-3 text-ai-cyan" />
            Verified Profile
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy">
          Profile
        </h1>

        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Manage your account, business information, and personalization preferences.
        </p>
      </div>

      {onToggleEdit && (
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            id="profile-header-edit-btn"
            onClick={onToggleEdit}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs ${
              isEditing
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                : "bg-brand-navy text-white hover:bg-slate-800"
            }`}
          >
            <span>{isEditing ? "Cancel Editing" : "Edit Profile"}</span>
          </button>
        </div>
      )}
    </header>
  );
}
