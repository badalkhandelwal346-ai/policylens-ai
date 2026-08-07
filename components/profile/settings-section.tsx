"use client";

import { Globe, HelpCircle, Shield } from "lucide-react";

import { LogoutButton } from "./logout-button";
import { ProfileMenuItem } from "./profile-menu-item";

export function SettingsSection() {
  return (
    <div className="flex flex-col gap-5">
      {/* Preferences Section */}
      <section>
        <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-600">
          Preferences
        </h3>
        <div className="overflow-hidden rounded-2xl border border-slate-200/40 bg-[#F9F6F0] divide-y divide-slate-200/60 shadow-xs">
          <ProfileMenuItem
            id="menu-language"
            icon={Globe}
            label="Language"
            value="English (US)"
            showChevron={true}
          />
          <ProfileMenuItem
            id="menu-privacy"
            icon={Shield}
            label="Privacy"
            showChevron={true}
          />
        </div>
      </section>

      {/* Support Section */}
      <section>
        <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-600">
          Support
        </h3>
        <div className="overflow-hidden rounded-2xl border border-slate-200/40 bg-[#F9F6F0] divide-y divide-slate-200/60 shadow-xs">
          <ProfileMenuItem
            id="menu-help-center"
            icon={HelpCircle}
            label="Help Center"
            showChevron={true}
          />
          <LogoutButton />
        </div>
      </section>
    </div>
  );
}
