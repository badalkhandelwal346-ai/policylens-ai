import type { Metadata } from "next";
import { BusinessProfileSetup } from "@/components/business";

export const metadata: Metadata = {
  title: "Business Profile Setup — Step 2 of 2 — PolicyLens AI",
  description:
    "Set up your business operations, industry, and notification preferences to personalize regulatory intelligence.",
};

export default function BusinessSetupPage() {
  return <BusinessProfileSetup />;
}
