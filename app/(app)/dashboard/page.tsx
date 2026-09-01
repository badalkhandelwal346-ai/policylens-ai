import type { Metadata } from "next";

import { DashboardPage } from "@/components/dashboard/dashboard-page";

export const metadata: Metadata = {
  title: "Dashboard — PolicyLens AI",
  description:
    "Your policy intelligence overview. Stay on top of urgent policies, upcoming deadlines, and recommended regulatory updates.",
};

export default function Dashboard() {
  return <DashboardPage />;
}
