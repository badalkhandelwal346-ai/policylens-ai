import type { Metadata } from "next";

import { AssistantPage } from "@/components/assistant";

export const metadata: Metadata = {
  title: "Policy Assistant — PolicyLens AI",
  description:
    "Ask PolicyLens AI anything about the latest legislative updates or policy summaries.",
};

type Props = {
  searchParams: Promise<{ policyId?: string }>;
};

export default async function AssistantRoute(props: Props) {
  const searchParams = await props.searchParams;
  const policyId = searchParams?.policyId;

  return <AssistantPage policyId={policyId} />;
}
