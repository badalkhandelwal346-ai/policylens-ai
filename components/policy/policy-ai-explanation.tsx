import Link from "next/link";
import { Bot, Info, Sparkles, ShieldCheck, ArrowRight, AlertCircle, MessageSquare } from "lucide-react";
import type { Policy, PolicyAiExplanationData } from "@/lib/policies";

interface PolicyAiExplanationProps {
  policy: Policy;
  aiExplanation: PolicyAiExplanationData;
}

export function PolicyAiExplanation({
  policy,
  aiExplanation,
}: PolicyAiExplanationProps) {
  const suggestedPrompts = [
    `How does the ${policy.title} apply to my specific business?`,
    `What are the documented prerequisites before the deadline?`,
    `Explain the key obligations in simple words.`,
  ];

  return (
    <section className="flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-ai-cyan" aria-hidden="true" />
          <h2 className="text-xl font-bold tracking-tight text-brand-navy">
            AI Policy Explanation
          </h2>
        </div>

        {/* Clear AI Disclosure Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ai-cyan/10 border border-ai-cyan/30 px-3 py-1 text-[11px] font-bold text-ai-cyan uppercase tracking-wider">
          <Bot className="size-3.5" aria-hidden="true" />
          AI Synthesis • Prototype Demonstration
        </span>
      </div>

      {/* Main AI Explanation Card */}
      <div className="rounded-2xl border border-ai-cyan/20 bg-linear-to-b from-cyan-50/30 via-white to-white p-6 shadow-xs flex flex-col gap-6">
        {/* Transparency / Sourced facts banner */}
        <div className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 text-xs text-slate-600">
          <Info className="size-4 text-ai-cyan shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong className="text-brand-navy font-semibold">AI Sourcing Note:</strong> This synthesized breakdown translates statutory filings from the <span className="font-semibold text-brand-navy">{policy.source}</span> into accessible business language. It reflects available policy records and does not constitute formal legal counsel.
          </p>
        </div>

        {/* Block 1: Plain Language Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            What this policy means in simple language
          </h3>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal bg-white p-4 rounded-xl border border-slate-100 shadow-2xs">
            {aiExplanation.simpleSummary}
          </p>
        </div>

        {/* Block 2: Key Provisions */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Key Regulatory Provisions
          </h3>
          <ul className="grid grid-cols-1 gap-2.5" role="list">
            {aiExplanation.keyProvisions.map((provision, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-100"
              >
                <ShieldCheck className="size-4 text-primary-blue shrink-0 mt-0.5" aria-hidden="true" />
                <span>{provision}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Block 3: Obligations & Potential Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-white border border-slate-200/80 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-primary-blue" />
              Business Obligations
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-disc list-inside">
              {aiExplanation.businessImplications.map((imp, i) => (
                <li key={i} className="leading-relaxed">
                  {imp}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-white border border-slate-200/80 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-status-green" />
              Potential Economic Benefits
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-disc list-inside">
              {aiExplanation.potentialBenefits.map((ben, i) => (
                <li key={i} className="leading-relaxed">
                  {ben}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Block 4: Uncertainties / What is Still Missing */}
        <div className="rounded-xl bg-amber-50/60 border border-amber-200/80 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-4 text-status-amber shrink-0" aria-hidden="true" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Identified Uncertainties & What Is Still Missing
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950 list-disc list-inside">
            {aiExplanation.uncertainties.map((unc, i) => (
              <li key={i} className="leading-relaxed">
                {unc}
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive Deep-Dive: Ask AI & Prompt suggestions */}
        <div className="flex flex-col gap-3 pt-3 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                Have specific questions about this policy?
              </p>
              <p className="text-xs text-slate-500">
                Ask PolicyLens AI Assistant for personalized analysis using your business profile.
              </p>
            </div>

            <Link
              id="policy-ai-launch-assistant-btn"
              href={`/assistant?policyId=${policy.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-navy text-white px-4 py-2 text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors w-fit shrink-0"
            >
              <span>Open Assistant</span>
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-semibold text-slate-400">Suggested queries:</span>
            {suggestedPrompts.map((prompt, i) => (
              <Link
                key={i}
                href={`/assistant?policyId=${policy.id}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs text-slate-600 hover:text-primary-blue hover:border-primary-blue/40 transition-colors"
              >
                <MessageSquare className="size-3 text-ai-cyan shrink-0" aria-hidden="true" />
                <span>&ldquo;{prompt}&rdquo;</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
