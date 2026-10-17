import { redirect } from "next/navigation";
import {
  getPolicyById,
  getAlerts,
  getPolicyImportantDates,
  getPolicyAiExplanation,
  getPolicyProcedure,
  calculateDeadlineStatus,
  parseDate,
} from "@/lib/policies";

import {
  PolicyDetailHeader,
  PolicyOverview,
  PolicyAiExplanation,
  PolicyDatesAlerts,
  PolicyBusinessImpact,
  PolicyNextSteps,
  PolicySource,
} from "@/components/policy";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function PolicyRoute(props: Props) {
  const searchParams = await props.searchParams;
  const id = searchParams?.id;

  if (!id) {
    redirect("/policies");
  }

  const policy = getPolicyById(id);

  if (!policy) {
    redirect("/policies");
  }

  // Load associated alerts and computed metadata
  const relatedAlerts = getAlerts().filter((a) => a.policyId === policy.id);
  const milestones = getPolicyImportantDates(policy, relatedAlerts);
  const aiExplanation = getPolicyAiExplanation(policy.id);
  const procedureSteps = getPolicyProcedure(policy.id);

  // Derive deadline status and days remaining for header summary
  const deadlineStatus = policy.deadline ? calculateDeadlineStatus(policy.deadline) : undefined;
  let daysRemaining: number | undefined;
  if (policy.deadline) {
    const parsed = parseDate(policy.deadline);
    if (parsed) {
      const today = new Date();
      const target = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
      daysRemaining = Math.ceil(
        (target.getTime() - new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()) /
          (1000 * 60 * 60 * 24)
      );
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 pb-24">
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 md:py-10">
        <article className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 md:p-12 space-y-10 overflow-hidden">
          {/* SECTION A: POLICY HEADER */}
          <PolicyDetailHeader
            policy={policy}
            deadlineStatus={deadlineStatus}
            daysRemaining={daysRemaining}
          />

          {/* SECTION B: POLICY OVERVIEW */}
          <PolicyOverview policy={policy} />

          {/* SECTION C: AI POLICY EXPLANATION */}
          <PolicyAiExplanation
            policy={policy}
            aiExplanation={aiExplanation}
          />

          {/* SECTION D: IMPORTANT DATES & ALERTS */}
          <PolicyDatesAlerts
            policy={policy}
            milestones={milestones}
            relatedAlerts={relatedAlerts}
          />

          {/* SECTION E: WHY THIS MATTERS TO YOUR BUSINESS */}
          <PolicyBusinessImpact policy={policy} />

          {/* SECTION F: WHAT SHOULD I DO NEXT? — STEP-BY-STEP PROCEDURE */}
          <PolicyNextSteps
            policy={policy}
            steps={procedureSteps}
          />

          {/* SECTION G: OFFICIAL SOURCE & DATA TRANSPARENCY */}
          <PolicySource
            source={policy.source}
            category={policy.category}
            status={policy.status}
          />
        </article>
      </div>
    </div>
  );
}
