import Link from "next/link";
import { BarChart3, BellRing, Store } from "lucide-react";

import { BusinessInput } from "@/components/business/business-input";
import { Dropdown } from "@/components/business/dropdown";
import { NotificationCard } from "@/components/business/notification-card";
import { SectionHeader } from "@/components/business/section-header";
import { Button } from "@/components/ui/button";

const notificationPreferences = [
  {
    title: "High-Priority Legislative Alerts",
    description:
      "Immediate notification for bills that directly impact your industry.",
    selected: true,
  },
  {
    title: "Weekly Policy Digest",
    description:
      "A summary of the week's legislative movements and analysis.",
    selected: false,
  },
  {
    title: "AI Assistant Monthly Insights",
    description:
      "Predictive analysis of upcoming policy trends tailored to your size.",
    selected: false,
  },
] as const;

export function BusinessForm() {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4 rounded-2xl bg-business-section p-4">
        <SectionHeader icon={Store} title="Business Identity" />
        <BusinessInput
          label="Business Name"
          placeholder="e.g. Blue Sky Consulting"
        />
        <Dropdown label="Business Type" value="Sole Proprietorship" />
      </section>

      <section className="flex flex-col gap-4 rounded-2xl bg-business-section p-4">
        <SectionHeader icon={BarChart3} title="Operational Context" />
        <Dropdown label="Industry" value="Technology" />
        <Dropdown label="State of Operation" value="California" />
        <Dropdown label="Primary Language" value="English" />
        <Dropdown label="Business Size" value="1-10 employees" />
      </section>

      <section className="flex flex-col gap-4 rounded-2xl bg-business-section p-4">
        <SectionHeader icon={BellRing} title="Notification Preferences" />
        <div className="flex flex-col gap-2.5">
          {notificationPreferences.map((preference) => (
            <NotificationCard key={preference.title} {...preference} />
          ))}
        </div>
      </section>

      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          className="h-12 flex-1 rounded-xl border-business-field-border bg-business-field text-sm font-semibold text-business-heading hover:bg-business-field/80"
        >
          Back
        </Button>
        <Link href="/dashboard" className="flex-[1.4]">
          <Button className="h-12 w-full rounded-xl bg-brand-navy text-sm font-semibold hover:bg-brand-navy/90">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
}
