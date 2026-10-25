"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, ArrowRight, Send } from "lucide-react";


const suggestedQuestions = [
  {
    label: "What are the compliance steps for Digital Markets Act?",
    policyId: "digital-markets-act",
  },
  {
    label: "Summarize the National AI Safety Framework 2.0",
    policyId: "national-ai-safety",
  },
  {
    label: "Which upcoming statutory deadlines apply this quarter?",
    policyId: undefined,
  },
];

export function AiAssistantCard() {
  const router = useRouter();
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      router.push("/assistant");
      return;
    }
    router.push(`/assistant?prompt=${encodeURIComponent(question.trim())}`);
  };

  const handleSelectSuggested = (policyId?: string) => {
    if (policyId) {
      router.push(`/assistant?policyId=${policyId}`);
    } else {
      router.push("/assistant");
    }
  };

  return (
    <section className="flex flex-col h-full" aria-label="AI Assistant Panel">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
            <Bot className="size-4" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-[#16273B]">
            Ask PolicyLens AI
          </h2>
        </div>
        <Link
          href="/assistant"
          className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-0.5"
        >
          Open Assistant →
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs p-5 flex flex-col justify-between flex-1 relative overflow-hidden">
        <div>
          <p className="text-xs text-[#243B53]/80 leading-relaxed">
            Get instant answers, compliance steps, and plain-English policy breakdowns tailored to your business profile.
          </p>

          {/* Suggested Quick Questions */}
          <div className="mt-3.5 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Suggested Questions
            </span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggested(q.policyId)}
                className="w-full text-left rounded-xl border border-slate-200/70 bg-[#FAF8F5]/80 hover:bg-[#7899B8]/15 px-3 py-2 text-xs font-medium text-[#16273B] transition-colors flex items-center justify-between gap-2 group cursor-pointer"
              >
                <span className="line-clamp-1">{q.label}</span>
                <ArrowRight className="size-3 text-[#7899B8] group-hover:text-[#2563EB] shrink-0 transition-colors" />
              </button>
            ))}
          </div>

          {/* Quick Input Form */}
          <form onSubmit={handleSubmit} className="mt-3.5 relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about any policy..."
              className="w-full h-10 rounded-xl border border-slate-200 bg-[#FAF8F5] pl-3.5 pr-10 text-xs text-[#16273B] placeholder:text-muted-foreground outline-none focus:border-[#7899B8] focus:bg-white focus:ring-1 focus:ring-[#7899B8]"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex size-7 items-center justify-center rounded-lg bg-[#16273B] text-white hover:bg-[#243B53] transition-colors cursor-pointer"
              aria-label="Send prompt to AI Assistant"
            >
              <Send className="size-3" />
            </button>
          </form>
        </div>

        {/* Footer CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] text-slate-400">
            Powered by PolicyLens AI engine
          </span>
          <Link
            href="/assistant"
            className="text-xs font-semibold text-[#2563EB] hover:underline inline-flex items-center gap-1"
          >
            Launch full assistant
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
