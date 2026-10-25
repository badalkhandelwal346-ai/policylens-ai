"use client";

import {
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
  hasPolicyContext?: boolean;
}

const GENERAL_SUGGESTIONS = [
  {
    icon: BookOpen,
    title: "Explain a policy in simple language",
    description: "Get a clear, plain-language translation of statutory requirements.",
    prompt: "Explain this policy in simple language.",
  },
  {
    icon: Briefcase,
    title: "How might this affect my business?",
    description: "Understand potential operational and compliance impacts.",
    prompt: "How might this policy affect my business?",
  },
  {
    icon: Calendar,
    title: "What deadlines are available?",
    description: "Review statutory timelines, grace periods, and reporting dates.",
    prompt: "What deadlines are available for this policy?",
  },
  {
    icon: CheckCircle2,
    title: "What should I verify before taking action?",
    description: "Identify key prerequisites, documentation, and official agency filings.",
    prompt: "What should I verify before taking action?",
  },
];

export function EmptyState({ onSelectPrompt, hasPolicyContext }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 text-center max-w-2xl mx-auto my-auto">
      {/* Icon Badge */}
      <div className="size-12 rounded-2xl bg-[#7899B8]/15 border border-[#7899B8]/30 text-brand-navy flex items-center justify-center mb-4 shadow-2xs">
        <Sparkles className="size-6 text-[#243B53]" />
      </div>

      {/* Main Heading */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-brand-navy mb-2">
        What would you like to understand?
      </h2>

      <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-8 leading-relaxed">
        {hasPolicyContext
          ? "Ask a question about this policy or select one of the suggested prompts below to start your research."
          : "Ask about regulations, upcoming deadlines, or explore your business compliance obligations."}
      </p>

      {/* 4 Suggested Prompts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
        {GENERAL_SUGGESTIONS.map((sug, idx) => {
          const Icon = sug.icon;
          return (
            <button
              key={idx}
              id={`empty-prompt-suggestion-${idx}`}
              type="button"
              onClick={() => onSelectPrompt(sug.prompt)}
              className="group flex flex-col justify-between p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#7899B8] hover:bg-[#7899B8]/5 transition-all text-left shadow-2xs cursor-pointer"
            >
              <div className="flex items-start gap-2.5 mb-2">
                <div className="p-1.5 rounded-lg bg-slate-100 text-brand-navy group-hover:bg-[#7899B8]/20 transition-colors shrink-0">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-semibold text-brand-navy group-hover:text-primary-blue transition-colors">
                    {sug.title}
                  </h3>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed pl-8">
                {sug.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
