import policiesData from "@/data/policies.json";
import alertsData from "@/data/alerts.json";

export interface Policy {
  id: string;
  badge?: string;
  title: string;
  deadline?: string;
  readTime?: string;
  description: string;
  status: string;
  category: string;
  source: string;
  eligibility?: string;
  benefits?: string;
  showExplore?: boolean;
}

export type DeadlineStatus = "urgent" | "upcoming" | "overdue" | "completed";
export type AlertType = "deadline" | "application" | "filing" | string;

export interface AlertItem {
  id: string;
  policyId: string;
  title: string;
  type: AlertType;
  message: string;
  date: string;
  status: DeadlineStatus | string;
}

export interface EnrichedAlert extends AlertItem {
  policy?: Policy;
  hasPolicy: boolean;
  calculatedStatus: DeadlineStatus;
  daysRemaining?: number;
  formattedDate: string;
}

/**
 * Returns all policies combined from urgent and recommended policies.
 */
export function getAllPolicies(): Policy[] {
  return [...policiesData.urgentPolicies, ...policiesData.recommendedPolicies];
}

/**
 * Finds a single policy by its unique ID.
 */
export function getPolicyById(id: string): Policy | undefined {
  if (!id) return undefined;
  return getAllPolicies().find((policy) => policy.id === id);
}

/**
 * Parses date string in YYYY-MM-DD or 'MMM DD, YYYY' format.
 */
export function parseDate(dateStr?: string): Date | null {
  if (!dateStr) return null;
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Calculates deadline status based on date and completion state.
 * Rules:
 * - Completed: only when an actual completion state exists
 * - Overdue: past deadline and not completed (diffDays < 0)
 * - Urgent: 0 <= diffDays <= 14 (due within 2 weeks)
 * - Upcoming: diffDays > 14 (due in future)
 */
export function calculateDeadlineStatus(
  dateInput: string | Date | undefined,
  currentStatus?: string,
  referenceDate: Date = new Date()
): DeadlineStatus {
  if (currentStatus?.toLowerCase() === "completed") {
    return "completed";
  }

  const targetDate = typeof dateInput === "string" ? parseDate(dateInput) : dateInput;
  if (!targetDate || isNaN(targetDate.getTime())) {
    const norm = currentStatus?.toLowerCase();
    if (norm === "urgent" || norm === "upcoming" || norm === "overdue" || norm === "completed") {
      return norm as DeadlineStatus;
    }
    return "upcoming";
  }

  const today = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "overdue";
  } else if (diffDays <= 14) {
    return "urgent";
  } else {
    return "upcoming";
  }
}

/**
 * Formats a date string nicely (e.g. 'Oct 30, 2026').
 */
export function formatAlertDate(dateStr: string): string {
  const d = parseDate(dateStr);
  if (!d) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Returns all alerts enriched with policy data, calculated status, and metadata.
 */
export function getAlerts(referenceDate: Date = new Date()): EnrichedAlert[] {
  const rawAlerts = (alertsData.alerts as AlertItem[]) || [];
  const today = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());

  return rawAlerts.map((alert) => {
    const policy = getPolicyById(alert.policyId);
    const dateToUse = alert.date || policy?.deadline || "";
    const parsed = parseDate(dateToUse);
    const calculatedStatus = calculateDeadlineStatus(dateToUse, alert.status, referenceDate);

    let daysRemaining: number | undefined;
    if (parsed) {
      const target = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
      daysRemaining = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    }

    return {
      ...alert,
      date: dateToUse,
      formattedDate: formatAlertDate(dateToUse),
      policy,
      hasPolicy: !!policy,
      calculatedStatus,
      daysRemaining,
    };
  });
}

/**
 * Returns upcoming or urgent deadlines sorted by closest date first.
 */
export function getUpcomingDeadlines(limit: number = 3, referenceDate: Date = new Date()): EnrichedAlert[] {
  const alerts = getAlerts(referenceDate);
  return alerts
    .filter((a) => a.calculatedStatus === "upcoming" || a.calculatedStatus === "urgent")
    .sort((a, b) => {
      const dateA = parseDate(a.date)?.getTime() ?? Infinity;
      const dateB = parseDate(b.date)?.getTime() ?? Infinity;
      return dateA - dateB;
    })
    .slice(0, limit);
}

/**
 * Returns urgent and overdue alerts that require immediate user action.
 */
export function getActionRequiredAlerts(limit: number = 3, referenceDate: Date = new Date()): EnrichedAlert[] {
  const alerts = getAlerts(referenceDate);
  return alerts
    .filter((a) => a.calculatedStatus === "urgent" || a.calculatedStatus === "overdue")
    .sort((a, b) => {
      if (a.calculatedStatus === "urgent" && b.calculatedStatus !== "urgent") return -1;
      if (b.calculatedStatus === "urgent" && a.calculatedStatus !== "urgent") return 1;
      const dateA = parseDate(a.date)?.getTime() ?? 0;
      const dateB = parseDate(b.date)?.getTime() ?? 0;
      return dateA - dateB;
    })
    .slice(0, limit);
}

export interface PolicyDateMilestone {
  label: string;
  date: string;
  description: string;
  status: DeadlineStatus;
  daysRemaining?: number;
  source: string;
  type: "compliance" | "application" | "consultation" | "filing" | "milestone";
}

export interface PolicyAiExplanationData {
  simpleSummary: string;
  keyProvisions: string[];
  businessImplications: string[];
  potentialBenefits: string[];
  uncertainties: string[];
}

export interface PolicyProcedureStep {
  stepNumber: number;
  title: string;
  action: string;
  prerequisites: string;
  documents?: string[];
  authority: string;
  deadline?: string;
  sourceReference?: string;
}

/**
 * Returns structured dates and milestones for a policy, distinguishing compliance deadlines,
 * application deadlines, and related alert milestones.
 */
export function getPolicyImportantDates(
  policy: Policy,
  alerts?: EnrichedAlert[],
  referenceDate: Date = new Date()
): PolicyDateMilestone[] {
  const milestones: PolicyDateMilestone[] = [];
  const today = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());

  // 1. Primary Policy Deadline (from data/policies.json)
  if (policy.deadline) {
    const parsed = parseDate(policy.deadline);
    const status = calculateDeadlineStatus(policy.deadline, undefined, referenceDate);
    let daysRemaining: number | undefined;
    if (parsed) {
      const target = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
      daysRemaining = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    }

    let label = "Compliance Deadline";
    let desc = "Statutory deadline for in-scope entities to meet all documented requirements.";
    let type: PolicyDateMilestone["type"] = "compliance";

    if (policy.id === "national-ai-safety") {
      label = "Consultation Phase Deadline";
      desc = "Public comment and stakeholder feedback window closing date.";
      type = "consultation";
    } else if (policy.id === "net-zero") {
      label = "Milestone Target Date";
      desc = "Infrastructure milestone benchmark for emission reduction standards.";
      type = "milestone";
    } else if (policy.id === "sustainable-finance") {
      label = "Annual Disclosure Deadline";
      desc = "Mandatory ESG reporting filing deadline for registered institutions.";
      type = "filing";
    }

    milestones.push({
      label,
      date: formatAlertDate(policy.deadline),
      description: desc,
      status,
      daysRemaining,
      source: policy.source ?? "Regulatory Filing",
      type,
    });
  }

  // 2. Additional Dates from Associated Centralized Alerts (from data/alerts.json)
  const activeAlerts = alerts ?? getAlerts(referenceDate).filter((a) => a.policyId === policy.id);
  activeAlerts.forEach((alert) => {
    // Avoid exact duplicate dates if already represented by the main policy deadline
    const alertFormatted = formatAlertDate(alert.date);
    const alreadyListed = milestones.some(
      (m) => m.date === alertFormatted && m.label.toLowerCase().includes(alert.type.toLowerCase())
    );

    if (!alreadyListed) {
      let type: PolicyDateMilestone["type"] = "milestone";
      if (alert.type.toLowerCase() === "application") type = "application";
      else if (alert.type.toLowerCase() === "filing") type = "filing";
      else if (alert.type.toLowerCase() === "deadline") type = "compliance";

      milestones.push({
        label: alert.title,
        date: alertFormatted,
        description: alert.message,
        status: alert.calculatedStatus,
        daysRemaining: alert.daysRemaining,
        source: policy.source ?? "Government Regulatory Notice",
        type,
      });
    }
  });

  return milestones;
}

/**
 * Returns structured AI analysis and plain-language summary for a policy.
 */
export function getPolicyAiExplanation(policyId: string): PolicyAiExplanationData {
  switch (policyId) {
    case "digital-markets-act":
      return {
        simpleSummary:
          "The Section 4 Amendment requires covered digital platforms and intermediaries to maintain open, non-discriminatory interoperability interfaces so smaller digital service providers can connect directly without restrictive barriers or unfair lock-in.",
        keyProvisions: [
          "Open API and data exchange protocol mandate for covered intermediary platforms.",
          "Strict prohibition against self-preferencing platform-owned services over third-party alternatives.",
          "Transparent reporting requirements on interface performance, uptime, and request response times.",
        ],
        businessImplications: [
          "Covered platforms must audit system architecture and open standard interfaces to external vendors.",
          "Small digital service providers gain guaranteed, fair access to essential digital markets and customer bases.",
          "Reduces platform rent-seeking and artificial integration hurdles for small vendors.",
        ],
        potentialBenefits: [
          "Expands market distribution channels for independent software and retail vendors.",
          "Enforces transparency in access dispute resolution.",
          "Prevents dominant intermediaries from bundling proprietary services unfairly.",
        ],
        uncertainties: [
          "Specific criteria for small-business exemption thresholds are still subject to final Department of Commerce rulemaking.",
          "Formal penalty schedules and third-party audit verification standards remain in draft phase.",
        ],
      };

    case "national-ai-safety":
      return {
        simpleSummary:
          "Establishes comprehensive risk-management, safety evaluation, and bias oversight expectations for entities deploying artificial intelligence systems in regulated domains such as finance, healthcare, and public services.",
        keyProvisions: [
          "Tiered risk classification for automated decision-making and predictive algorithms.",
          "Mandatory periodic audits for algorithmic bias, data lineage, and safety safeguards.",
          "Human-in-the-loop oversight obligations for high-impact end-user automated determinations.",
        ],
        businessImplications: [
          "Organizations deploying AI must document system guardrails and risk mitigation protocols.",
          "Provides a standardized legal safe-harbor framework against liability when guidelines are followed.",
        ],
        potentialBenefits: [
          "Builds institutional and consumer trust in verified AI applications.",
          "Mitigates legal exposure from unanticipated model degradation or systemic algorithmic bias.",
        ],
        uncertainties: [
          "Differentiation in testing burdens between foundation model providers and downstream fine-tuners is currently under public consultation.",
          "Cross-border recognition standards with international AI governance regimes are pending.",
        ],
      };

    case "sustainable-finance":
      return {
        simpleSummary:
          "Outlines standardized disclosure expectations for environmental, social, and governance (ESG) metrics to protect investors from misleading green claims and foster transparent capital allocation.",
        keyProvisions: [
          "Standardized ESG reporting taxonomy for sustainability-linked funds and products.",
          "Obligatory greenhouse gas emissions baseline reporting for certified green assets.",
          "Anti-greenwashing audit criteria and mandatory investor disclosure statements.",
        ],
        businessImplications: [
          "Financial institutions must gather verifiable climate and governance data from portfolio clients.",
          "Green-certified startups and sustainable vendors can secure preferential capital and investor visibility.",
        ],
        potentialBenefits: [
          "Increases access to green financing facilities and international impact investment.",
          "Standardizes compliance metrics across regional financial markets.",
        ],
        uncertainties: [
          "Proportional reporting exemptions for micro-funds and early-stage impact funds are still being finalized.",
          "Third-party carbon accounting verifier accreditation guidelines remain under review.",
        ],
      };

    case "net-zero":
      return {
        simpleSummary:
          "Provides investment incentives, expedited regulatory approvals, and grant opportunities for infrastructure and energy projects demonstrating verified pathways toward net-zero emissions.",
        keyProvisions: [
          "Capital grant matching and accelerated depreciation for qualified clean infrastructure assets.",
          "Expedited environmental permitting channels for low-carbon facility retrofits.",
          "Statutory emissions benchmarking verified through annual environmental audits.",
        ],
        businessImplications: [
          "Energy, manufacturing, and transport infrastructure developers can substantially offset transition costs.",
          "Strict verification audits require robust project-level carbon tracking.",
        ],
        potentialBenefits: [
          "Direct reductions in project capital expenditure through targeted government incentives.",
          "Faster regulatory turnaround on clean facility construction permits.",
        ],
        uncertainties: [
          "Interconnection priority rules for regional electrical grids are awaiting inter-agency review.",
          "Subsidy clawback mechanisms for missed milestone targets are undergoing legal refinement.",
        ],
      };

    case "digital-trade":
      return {
        simpleSummary:
          "Streamlines cross-border electronic commerce, digital documentation, and customs regulatory clearance to reduce bureaucratic friction for businesses trading digital goods and international services.",
        keyProvisions: [
          "Mutual legal recognition of electronic signatures and paperless trade contracts.",
          "Standardized digital customs declaration protocols and single-window transmission.",
          "Prohibition of unjustified cross-border data localization requirements.",
        ],
        businessImplications: [
          "Significantly reduces clearance delays and compliance administrative costs for digital exporters.",
          "Requires IT alignment with designated cross-border digital filing protocols.",
        ],
        potentialBenefits: [
          "Decreases transaction turnaround times from days to hours for international e-commerce.",
          "Lowers legal costs associated with multijurisdictional contract validation.",
        ],
        uncertainties: [
          "Bilateral harmonization timelines with non-signatory regional trade partners are pending.",
          "Dispute resolution arbitration tribunals are scheduled for establishment next fiscal year.",
        ],
      };

    default: {
      const policy = getPolicyById(policyId);
      return {
        simpleSummary:
          policy?.description ||
          "A government regulatory policy focused on compliance standards and commercial operational requirements.",
        keyProvisions: [
          `Regulatory framework administered by ${policy?.source || "designated authority"}.`,
          `Applies to commercial operations under the ${policy?.category || "relevant"} category.`,
          policy?.deadline ? `Compliance milestone established for ${policy.deadline}.` : "Ongoing regulatory guidance.",
        ],
        businessImplications: [
          policy?.eligibility || "In-scope entities must verify criteria under published guidelines.",
          "Adherence protects against operational penalties and market access restrictions.",
        ],
        potentialBenefits: [
          policy?.benefits || "Provides clearer standards and transparent regulatory predictability.",
        ],
        uncertainties: [
          "Specific departmental implementation guidelines may receive further clarification from the issuing body.",
        ],
      };
    }
  }
}

/**
 * Returns practical, policy-specific step-by-step procedures ("What should I do next?").
 */
export function getPolicyProcedure(policyId: string): PolicyProcedureStep[] {
  switch (policyId) {
    case "digital-markets-act":
      return [
        {
          stepNumber: 1,
          title: "Assess Interoperability & Platform Scope",
          action:
            "Review your digital services, intermediary platform functions, and active user volume against Department of Commerce criteria to verify whether your business is classified as a covered intermediary or a beneficiary vendor.",
          prerequisites: "Current service architecture map and monthly transaction/user counts.",
          documents: ["Service Architecture Overview", "Intermediary Categorization Checklist"],
          authority: "Department of Commerce — Digital Markets Directorate",
          sourceReference: "Section 4(a) Eligibility Framework",
        },
        {
          stepNumber: 2,
          title: "Audit Technical API Endpoints & Interfaces",
          action:
            "Perform an internal technical assessment of system APIs, data exchange formats, and integration protocols to ensure compatibility with published interoperability standards.",
          prerequisites: "System access logs and current API documentation.",
          documents: ["API Interface Specification v2.0", "Endpoint Security Audit Log"],
          authority: "Department of Commerce — Technical Standards Division",
          sourceReference: "Section 4(c) Interoperability Mandate",
        },
        {
          stepNumber: 3,
          title: "Establish Fair Access & SLA Protocols",
          action:
            "Implement transparent, non-discriminatory access rules and service-level agreements for small vendors and business partners integrating with your platform.",
          prerequisites: "Review of existing third-party partner agreements.",
          documents: ["Standard Vendor SLA", "Fair Access Protocol Documentation"],
          authority: "Department of Commerce — Fair Competition Bureau",
          sourceReference: "Section 4(d) Commercial Terms",
        },
        {
          stepNumber: 4,
          title: "Prepare & Submit Compliance Filing",
          action:
            "Compile required technical audit reports and file the verified compliance declaration through the Department of Commerce portal ahead of the deadline.",
          prerequisites: "Completed technical audit and executive sign-off.",
          documents: ["Section 4 Final Compliance Declaration", "Third-Party Interface Verification"],
          authority: "Department of Commerce",
          deadline: "Oct 30, 2026",
          sourceReference: "Section 4 Final Filing Instructions",
        },
      ];

    case "national-ai-safety":
      return [
        {
          stepNumber: 1,
          title: "Catalog Deployed AI Models & Decision Systems",
          action:
            "Create an exhaustive internal inventory of all machine learning algorithms, automated decision systems, and predictive models currently operating in your production environments.",
          prerequisites: "Technical asset registry and software dependency audit.",
          documents: ["AI System Inventory Register", "Model Architecture Specifications"],
          authority: "National AI Council",
          sourceReference: "Framework 2.0 § 3 (Scope & Categorization)",
        },
        {
          stepNumber: 2,
          title: "Conduct Risk Categorization & Bias Evaluation",
          action:
            "Assess models against the Council's risk criteria, testing specifically for algorithmic drift, bias across protected demographic classes, and edge-case failure modes.",
          prerequisites: "Representative evaluation datasets and model performance logs.",
          documents: ["Algorithmic Bias Assessment Report", "Model Risk Classification Matrix"],
          authority: "National AI Council — Safety Oversight Board",
          sourceReference: "Framework 2.0 § 5 (Evaluation Standards)",
        },
        {
          stepNumber: 3,
          title: "Submit Consultation Feedback",
          action:
            "Formulate and submit your organization's formal feedback on testing feasibility, small business compliance costs, and technical practicalities before the consultation window closes.",
          prerequisites: "Internal engineering and legal review of proposed framework guidelines.",
          documents: ["Stakeholder Consultation Response Brief"],
          authority: "National AI Council",
          deadline: "Nov 15, 2026",
          sourceReference: "Framework 2.0 Public Consultation Notice",
        },
        {
          stepNumber: 4,
          title: "Implement Human-in-the-Loop Oversight Safeguards",
          action:
            "Designate trained personnel and establish audit trails to review automated determinations impacting end users in regulated workflows.",
          prerequisites: "Operational workflow review and staff training.",
          documents: ["Human Oversight Protocol", "Adverse Impact Escalation Runbook"],
          authority: "National AI Council",
          sourceReference: "Framework 2.0 § 8 (Operational Safeguards)",
        },
      ];

    case "sustainable-finance":
      return [
        {
          stepNumber: 1,
          title: "Determine In-Scope Financial Products",
          action:
            "Audit all investment products, lending facilities, and funds marketed with sustainability claims against the Ministry's ESG taxonomy criteria.",
          prerequisites: "Product catalog and prospectus documentation.",
          documents: ["ESG Portfolio Classification Schedule"],
          authority: "Ministry of Finance — Sustainable Finance Board",
          sourceReference: "SFD Regulations § 2",
        },
        {
          stepNumber: 2,
          title: "Verify Baseline Sustainability Metrics",
          action:
            "Confirm that your institution's initial baseline sustainability metrics have been properly documented and archived following the baseline submission window.",
          prerequisites: "Operational emissions and carbon accounting data.",
          documents: ["Baseline Sustainability Disclosure Form"],
          authority: "Ministry of Finance",
          deadline: "Completed (Aug 30, 2026)",
          sourceReference: "SFD Baseline Rule 2026",
        },
        {
          stepNumber: 3,
          title: "Draft Annual ESG Disclosure Filing",
          action:
            "Consolidate portfolio environmental metrics, governance structures, and capital allocation reporting into the standardized filing format.",
          prerequisites: "Third-party ESG data verification.",
          documents: ["Annual Sustainable Finance Disclosure Report (Form SFD-1)"],
          authority: "Ministry of Finance",
          deadline: "Dec 31, 2026",
          sourceReference: "SFD Annual Reporting Guidelines",
        },
      ];

    case "net-zero":
      return [
        {
          stepNumber: 1,
          title: "Evaluate Project Scope & Net-Zero Eligibility",
          action:
            "Review capital expenditure plans and technical specifications for clean infrastructure investments against Ministry of Energy grant and incentive guidelines.",
          prerequisites: "Engineering plans and baseline carbon emission calculations.",
          documents: ["Project Feasibility Study", "Carbon Accounting Baseline"],
          authority: "Ministry of Energy — Clean Infrastructure Taskforce",
          sourceReference: "Net-Zero Infrastructure Act § 4",
        },
        {
          stepNumber: 2,
          title: "Check Incentive Application Standing",
          action:
            "Verify whether initial infrastructure incentive applications were filed or if late-application relief windows apply to your project phase.",
          prerequisites: "Prior filing records.",
          documents: ["Infrastructure Incentive Application", "Late Filing Extension Request (if applicable)"],
          authority: "Ministry of Energy",
          deadline: "Overdue (Sep 15, 2026)",
          sourceReference: "Incentive Grant Circular 2026-B",
        },
        {
          stepNumber: 3,
          title: "Align with 2027 Milestone Verification",
          action:
            "Prepare construction milestone verification and environmental impact monitoring systems for the upcoming statutory review milestone.",
          prerequisites: "Ongoing construction and emissions monitoring logs.",
          documents: ["Milestone Compliance Plan", "Environmental Verification Report"],
          authority: "Ministry of Energy",
          deadline: "Jan 15, 2027",
          sourceReference: "Statutory Milestone Guidelines",
        },
      ];

    case "digital-trade":
      return [
        {
          stepNumber: 1,
          title: "Audit International Digital Sales & Customs Interfaces",
          action:
            "Analyze current cross-border e-commerce checkout flows, electronic invoicing, and customs declarations against simplified digital trade rules.",
          prerequisites: "Cross-border transaction volume and customs agent logs.",
          documents: ["Cross-Border Transaction Flow Map", "Digital Invoicing Compliance Checklist"],
          authority: "Commerce and Trade Agency — Cross-Border Commerce Division",
          sourceReference: "Digital Trade Act § 3",
        },
        {
          stepNumber: 2,
          title: "Upgrade Electronic Data Interchange (EDI) Protocols",
          action:
            "Adopt standardized digital signatures and XML/JSON single-window customs data payloads supported by the agency.",
          prerequisites: "IT and ERP vendor coordination.",
          documents: ["EDI System Integration Specifications", "Digital Signature Certificate"],
          authority: "Commerce and Trade Agency",
          sourceReference: "Digital Trade Technical Annex 1",
        },
        {
          stepNumber: 3,
          title: "File Trade Facilitation Compliance Declaration",
          action:
            "Submit formalized certification confirming your international e-commerce interfaces adhere to the streamlined cross-border framework.",
          prerequisites: "Completed technical integrations.",
          documents: ["Form DT-101 Trade Facilitation Registration"],
          authority: "Commerce and Trade Agency",
          deadline: "Mar 31, 2027",
          sourceReference: "Registration Portal Bulletin 2027-1",
        },
      ];

    default: {
      const policy = getPolicyById(policyId);
      return [
        {
          stepNumber: 1,
          title: "Verify Policy Applicability",
          action: `Review your business activities and regulatory thresholds against ${policy?.title || "the policy"} guidelines.`,
          prerequisites: "Company operational description and legal entity registration.",
          authority: policy?.source || "Regulatory Authority",
          sourceReference: "General Applicability Clause",
        },
        {
          stepNumber: 2,
          title: "Assess Operational & Compliance Impact",
          action: "Identify necessary procedural changes, recordkeeping duties, and technical adjustments.",
          prerequisites: "Internal operational audit.",
          authority: policy?.source || "Regulatory Authority",
          sourceReference: "Compliance Obligations",
        },
        {
          stepNumber: 3,
          title: "Track Important Dates & Milestones",
          action: policy?.deadline
            ? `Prepare documentation and complete filing ahead of the ${policy.deadline} milestone.`
            : "Monitor official gazette updates for enforcement timelines.",
          prerequisites: "Completed compliance documentation.",
          authority: policy?.source || "Regulatory Authority",
          deadline: policy?.deadline,
          sourceReference: "Milestone Tracking",
        },
      ];
    }
  }
}
