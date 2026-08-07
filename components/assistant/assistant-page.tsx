"use client";

import { AssistantHeader } from "./assistant-header";
import { BottomNavigation } from "./bottom-navigation";
import { ChatMessage } from "./chat-message";
import { GreetingSection } from "./greeting-section";
import { InputToolbar } from "./input-toolbar";
import { TypingIndicator } from "./typing-indicator";

const mockMessages = [
  {
    id: "msg-1",
    role: "assistant" as const,
    content:
      "Hello! I've analyzed the latest Digital Privacy Act. How can I help you understand its implications today?",
  },
  {
    id: "msg-2",
    role: "user" as const,
    content:
      "What are the main changes regarding data portability for small businesses?",
  },
  {
    id: "msg-3",
    role: "assistant" as const,
    content:
      "The new act mandates that businesses must provide data in a machine-readable format within 30 days of a request. For small businesses (under 50 employees), there's a 6-month grace period for compliance and access to technical grants.",
  },
];

export function AssistantPage() {
  return (
    <div className="flex h-dvh max-h-dvh flex-col items-center justify-center bg-slate-50/50 sm:p-4 md:p-6 overflow-hidden">
      <main className="relative flex h-full max-h-dvh w-full max-w-md flex-col overflow-hidden bg-white sm:h-[840px] sm:max-h-[90vh] sm:max-w-2xl sm:rounded-3xl sm:border sm:border-slate-100 sm:shadow-xl">
        {/* Fixed Header */}
        <div className="shrink-0 bg-white z-20 border-b border-slate-100/60">
          <AssistantHeader />
        </div>

        {/* Scrollable Conversation Container */}
        <div className="relative flex-1 min-h-0 overflow-y-auto px-4 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Subtle Node/Network Background Graphic */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.06] select-none"
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

          <div className="relative z-10 space-y-4 pb-6">
            {/* Greeting */}
            <GreetingSection />

            {/* Chat Messages */}
            <div className="flex flex-col gap-3 pt-1">
              {mockMessages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  id={msg.id}
                  role={msg.role}
                  content={msg.content}
                />
              ))}

              {/* Typing Indicator */}
              <TypingIndicator />
            </div>
          </div>
        </div>

        {/* Fixed Bottom Input Area & Navigation Spacer */}
        <div className="shrink-0 bg-white border-t border-slate-100/80 z-20 pb-16">
          <InputToolbar />
        </div>

        {/* Shared Bottom Navigation */}
        <BottomNavigation />
      </main>
    </div>
  );
}
