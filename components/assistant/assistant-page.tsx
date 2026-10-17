"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

import { AssistantHeader } from "./assistant-header";
import { BottomNavigation } from "./bottom-navigation";
import { ChatMessage } from "./chat-message";
import { GreetingSection } from "./greeting-section";
import { InputToolbar } from "./input-toolbar";
import { TypingIndicator } from "./typing-indicator";
import { PolicyContextCard } from "./policy-context-card";
import { getPolicyById } from "@/lib/policies";

const initialMessages = [
  {
    id: "msg-1",
    role: "assistant" as const,
    content:
      "Hello! I am your PolicyLens AI Assistant. How can I help you understand legislative updates or policy summaries today?",
  }
];

type AssistantPageProps = {
  policyId?: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function AssistantPage({ policyId }: AssistantPageProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load policy context
  const policyContext = useMemo(() => {
    if (!policyId) return undefined;
    return getPolicyById(policyId);
  }, [policyId]);

  // Handle invalid policy
  const isInvalidPolicy = policyId && !policyContext;

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const sendMessage = async (overrideMessage?: string) => {
    const textToSend = overrideMessage || inputValue;
    const trimmedValue = textToSend.trim();
    if (!trimmedValue || isLoading) return;

    const userMessage = {
      id: `user-${crypto.randomUUID()}`,
      role: "user" as const,
      content: trimmedValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const payload: { message: string; policyContext?: Record<string, unknown> } = { message: trimmedValue };
      if (policyContext) {
        payload.policyContext = {
          title: policyContext.title,
          description: policyContext.description,
          category: policyContext.category,
          status: policyContext.status,
          deadline: policyContext.deadline,
          eligibility: policyContext.eligibility,
          benefits: policyContext.benefits,
          source: policyContext.source,
        };
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      const reply =
        response.ok && typeof responseData.reply === "string"
          ? responseData.reply.trim()
          : "Sorry, I couldn't process that request right now. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${crypto.randomUUID()}`,
          role: "assistant",
          content: reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-error-${crypto.randomUUID()}`,
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the assistant at the moment. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await sendMessage();
  };

  const handleSelectPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  // Generate context-aware suggested questions
  const suggestedQuestions = useMemo(() => {
    if (!policyContext) return [];
    
    const questions = [
      "What does this policy mean?",
      "Explain this in simple language."
    ];
    
    if (policyContext.benefits) {
      questions.push("Why may this matter to my business?");
    }
    
    if (policyContext.eligibility) {
      questions.push("Does this apply to my business?");
    }
    
    if (policyContext.deadline) {
      questions.push("What is the deadline?");
    }
    
    return questions;
  }, [policyContext]);

  if (isInvalidPolicy) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center bg-slate-50/50 p-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-sm text-center shadow-sm">
          <AlertTriangle className="size-10 text-status-amber mx-auto mb-4" />
          <h2 className="text-lg font-bold text-brand-navy mb-2">Policy Not Found</h2>
          <p className="text-sm text-brand-muted-foreground mb-6">
            This policy could not be found or may have been removed.
          </p>
          <Link
            href="/policies"
            className="inline-flex items-center gap-2 bg-primary-blue text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-blue/90 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Return to Policies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-dvh max-h-dvh flex-col items-center justify-center bg-slate-50/50 sm:p-4 md:p-6 overflow-hidden">
      <main className="relative flex h-full max-h-dvh w-full max-w-md flex-col overflow-hidden bg-white sm:h-[840px] sm:max-h-[90vh] sm:max-w-2xl sm:rounded-3xl sm:border sm:border-slate-100 sm:shadow-xl">
        {/* Fixed Header */}
        <div className="shrink-0 bg-white z-20 border-b border-slate-100/60">
          <AssistantHeader />
        </div>

        {/* Optional Context Card */}
        {policyContext && (
          <div className="shrink-0 bg-white z-10 shadow-sm relative">
            <PolicyContextCard
              id={policyContext.id}
              title={policyContext.title}
              category={policyContext.category}
              status={policyContext.status}
              deadline={policyContext.deadline}
              description={policyContext.description}
            />
          </div>
        )}

        {/* Scrollable Conversation Container */}
        <div
          ref={scrollRef}
          className="relative flex-1 min-h-0 overflow-y-auto px-4 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex flex-col"
        >
          {/* Subtle Node/Network Background Graphic */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden opacity-[0.06] select-none z-0"
          >
            <svg
              className="w-[120%] h-[120%] text-brand-navy"
              viewBox="0 0 400 400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="200" cy="150" r="16" />
              <circle cx="100" cy="80" r="10" />
              <circle cx="300" cy="90" r="12" />
              <circle cx="80" cy="240" r="14" />
              <circle cx="320" cy="250" r="10" />
              <circle cx="200" cy="300" r="18" />
              <line x1="200" y1="150" x2="100" y2="80" />
              <line x1="200" y1="150" x2="300" y2="90" />
              <line x1="200" y1="150" x2="80" y2="240" />
              <line x1="200" y1="150" x2="320" y2="250" />
              <line x1="200" y1="150" x2="200" y2="300" />
              <line x1="100" y1="80" x2="80" y2="240" />
              <line x1="300" y1="90" x2="320" y2="250" />
              <line x1="80" y1="240" x2="200" y2="300" />
              <line x1="320" y1="250" x2="200" y2="300" />
            </svg>
          </div>

          <div className="relative z-10 space-y-4 pb-6 flex-1 flex flex-col">
            {/* Greeting is only shown if there's no context, otherwise we go straight to chat */}
            {!policyContext && <GreetingSection />}

            {/* Chat Messages */}
            <div className="flex flex-col gap-3 pt-4 flex-1">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  id={msg.id}
                  role={msg.role}
                  content={msg.content}
                />
              ))}

              {isLoading && <TypingIndicator />}
            </div>
            
            {/* Context-aware Suggested Questions */}
            {policyContext && messages.length <= 1 && !isLoading && (
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(q)}
                    className="text-left text-xs sm:text-sm font-medium text-brand-navy bg-white border border-brand-navy/10 hover:border-primary-blue/40 hover:bg-primary-blue/5 px-3 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom Input Area & Navigation Spacer */}
        <div className="shrink-0 bg-white border-t border-slate-100/80 z-20 pb-16">
          <InputToolbar
            inputValue={inputValue}
            disabled={isLoading}
            onInputChange={(e) => setInputValue(e.target.value)}
            onSubmit={handleSubmit}
            onSelectPrompt={handleSelectPrompt}
          />
        </div>

        {/* Shared Bottom Navigation */}
        <BottomNavigation />
      </main>
    </div>
  );
}
