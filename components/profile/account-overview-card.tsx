"use client";

import { Building2, Mail, Pencil, Shield } from "lucide-react";

interface AccountOverviewCardProps {
  businessName?: string;
  industry?: string;
  stateOfOperation?: string;
  userEmail?: string;
  isEditing?: boolean;
  onEditClick: () => void;
}

export function AccountOverviewCard({
  businessName,
  industry,
  stateOfOperation,
  userEmail,
  isEditing,
  onEditClick,
}: AccountOverviewCardProps) {
  // Generate clean initials from business name or default to "PL"
  const initials = businessName
    ? businessName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "PL";

  const displayName = businessName || "Primary Business Account";
  const emailDisplay = userEmail || "compliance@policylens.local";
  const locationTag = industry && stateOfOperation ? `${industry} • ${stateOfOperation}` : industry || stateOfOperation;

  return (
    <section
      aria-label="Account Overview"
      className="rounded-2xl border border-slate-200/80 bg-linear-to-b from-slate-50/50 via-white to-white p-5 sm:p-6 shadow-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        {/* Avatar and Info Group */}
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          {/* Avatar with Initials */}
          <div
            id="account-avatar-badge"
            className="size-16 sm:size-18 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-sm shrink-0 border-2 border-white ring-1 ring-slate-200/60"
            aria-hidden="true"
          >
            {initials}
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-brand-navy truncate">
                {displayName}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                <Shield className="size-3 text-primary-blue" />
                Account Owner
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Mail className="size-3.5 text-slate-400" />
                <span className="truncate">{emailDisplay}</span>
              </div>

              {locationTag && (
                <div className="flex items-center gap-1.5">
                  <Building2 className="size-3.5 text-slate-400" />
                  <span>{locationTag}</span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400 pt-0.5">
              Enterprise Compliance Tier • Client-side Profile
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
          <button
            type="button"
            id="account-overview-edit-btn"
            onClick={onEditClick}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
              isEditing
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                : "bg-white border border-slate-200/80 text-brand-navy hover:bg-slate-50 hover:border-slate-300"
            }`}
          >
            <Pencil className="size-3.5 text-slate-500" />
            <span>{isEditing ? "Close Editing" : "Edit Profile"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
