import { redirect } from "next/navigation";
import Link from "next/link";
import { Bot } from "lucide-react";
import data from "@/data/policies.json";

import { PolicyDetailHeader } from "@/components/policy/policy-detail-header";
import { PolicyImpact } from "@/components/policy/policy-impact";
import { PolicySource } from "@/components/policy/policy-source";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function PolicyRoute(props: Props) {
  const searchParams = await props.searchParams;
  const id = searchParams?.id;

  if (!id) {
    redirect("/policies");
  }

  const allPolicies = [...data.urgentPolicies, ...data.recommendedPolicies];
  const policy = allPolicies.find((p) => p.id === id);

  if (!policy) {
    redirect("/policies");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
        <article className="bg-white rounded-3xl border border-border shadow-sm p-6 sm:p-10 md:p-12">
          <PolicyDetailHeader
            title={policy.title}
            description={policy.description}
            status={policy.status}
            category={policy.category}
            source={policy.source}
            deadline={policy.deadline}
            badge={policy.badge}
          />
          
          <div className="mt-8">
            <Link
              href={`/assistant?policyId=${policy.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-ai-cyan/10 px-5 py-3 text-sm font-bold text-ai-cyan hover:bg-ai-cyan/20 transition-colors border border-ai-cyan/20 w-full sm:w-auto justify-center"
            >
              <Bot className="size-5" />
              Ask AI about this policy
            </Link>
          </div>

          <div className="mt-10">
            <PolicyImpact
              benefits={policy.benefits}
              eligibility={policy.eligibility}
            />
          </div>

          <PolicySource source={policy.source} />
        </article>
      </div>
    </div>
  );
}
