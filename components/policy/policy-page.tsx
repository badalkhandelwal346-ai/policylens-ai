import { BottomNavigation } from "@/components/dashboard/bottom-navigation";

import { ActionButtons } from "./action-buttons";
import { BottomStickyActions } from "./bottom-sticky-actions";
import { DocumentsNeeded } from "./documents-needed";
import { ImpactCard } from "./impact-card";
import { OfficeImage } from "./office-image";
import { PolicyHeader } from "./policy-header";
import { PolicyTitle } from "./policy-title";
import { RequiredActions } from "./required-actions";
import { RisksCard } from "./risks-card";
import { SummaryCard } from "./summary-card";
import { Timeline } from "./timeline";
import { WhyPolicyExists } from "./why-policy-exists";

export function PolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-28 pt-2">
      <main className="mx-auto max-w-md bg-white shadow-xl sm:rounded-3xl sm:border sm:border-slate-100 overflow-hidden relative min-h-screen">
        {/* Top Navigation / Header */}
        <PolicyHeader />

        {/* Title, Badge & Subtitle */}
        <PolicyTitle />

        {/* Action Buttons (Desktop / Mobile Top) */}
        <div className="hidden sm:block">
          <ActionButtons />
        </div>

        {/* Main Content Sections */}
        <div className="flex flex-col gap-4 px-4 pb-6">
          <SummaryCard />
          <WhyPolicyExists />
          <ImpactCard />
          <RisksCard />
          <RequiredActions />
          <DocumentsNeeded />
          <Timeline />
          <OfficeImage />
        </div>

        {/* Mobile Sticky Actions */}
        <BottomStickyActions />

        {/* Bottom Navigation for Navigation Flow */}
        <div className="hidden sm:block">
          <BottomNavigation />
        </div>
      </main>
    </div>
  );
}
