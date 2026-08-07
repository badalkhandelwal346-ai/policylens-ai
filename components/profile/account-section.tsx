"use client";

import { Bookmark, Download } from "lucide-react";

import { ProfileMenuItem } from "./profile-menu-item";

export function AccountSection() {
  return (
    <section>
      <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-600">
        Account & Resources
      </h3>
      <div className="overflow-hidden rounded-2xl border border-slate-200/40 bg-[#F9F6F0] divide-y divide-slate-200/60 shadow-xs">
        <ProfileMenuItem
          id="menu-saved-policies"
          icon={Bookmark}
          label="Saved Policies"
          showChevron={true}
        />
        <ProfileMenuItem
          id="menu-downloaded-reports"
          icon={Download}
          label="Downloaded Reports"
          showChevron={true}
        />
      </div>
    </section>
  );
}
