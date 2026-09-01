import type { Metadata } from "next";

import { AssistantPage } from "@/components/assistant";

export const metadata: Metadata = {
  title: "Policy Assistant — PolicyLens AI",
  description:
    "Ask PolicyLens AI anything about the latest legislative updates or policy summaries.",
};

export default function AssistantRoute() {
  return <AssistantPage />;
}
