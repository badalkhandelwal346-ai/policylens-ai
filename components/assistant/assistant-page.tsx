"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import { ChatHistoryPanel } from "./chat-history-panel";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { EmptyState } from "./empty-state";
import { PolicyContextCard } from "./policy-context-card";
import { TypingIndicator } from "./typing-indicator";
import { getPolicyById } from "@/lib/policies";
import {
  ChatConversation,
  ChatMessage as ChatMessageType,
  createNewConversation,
  generateConversationTitle,
  getStoredActiveChatId,
  loadStoredConversations,
  saveStoredConversations,
  setStoredActiveChatId,
} from "@/lib/chat-storage";

type AssistantPageProps = {
  policyId?: string;
  initialPrompt?: string;
};

export function AssistantPage({ policyId: initialPolicyId, initialPrompt }: AssistantPageProps) {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [draftPolicyId, setDraftPolicyId] = useState<string | undefined>(initialPolicyId);
  const [inputValue, setInputValue] = useState(initialPrompt || "");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);
  const [isMobileHistoryOpen, setIsMobileHistoryOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load saved conversations on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const loaded = loadStoredConversations();

      // Determine initial conversation to open
      if (initialPolicyId) {
        // If user came specifically for a policy
        const existingPolicyChat = loaded.find((c) => c.policyId === initialPolicyId);
        if (existingPolicyChat) {
          setConversations(loaded);
          setActiveConversationId(existingPolicyChat.id);
          setStoredActiveChatId(existingPolicyChat.id);
          return;
        }
        // Create new policy chat
        const newPolicyChat = createNewConversation(
          initialPolicyId,
          `Research: Policy #${initialPolicyId}`
        );
        const updated = [newPolicyChat, ...loaded];
        setConversations(updated);
        setActiveConversationId(newPolicyChat.id);
        saveStoredConversations(updated);
        setStoredActiveChatId(newPolicyChat.id);
        return;
      }

      const storedActiveId = getStoredActiveChatId();
      if (storedActiveId && loaded.some((c) => c.id === storedActiveId)) {
        setConversations(loaded);
        setActiveConversationId(storedActiveId);
      } else if (loaded.length > 0) {
        setConversations(loaded);
        setActiveConversationId(loaded[0].id);
        setStoredActiveChatId(loaded[0].id);
      } else {
        // Create fresh first conversation
        const fresh = createNewConversation();
        setConversations([fresh]);
        setActiveConversationId(fresh.id);
        saveStoredConversations([fresh]);
        setStoredActiveChatId(fresh.id);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [initialPolicyId]);

  // Active conversation object
  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === activeConversationId) || null;
  }, [conversations, activeConversationId]);

  // Current policy context derived from active conversation or draft
  const currentPolicyId = activeConversation?.policyId || draftPolicyId;

  const policyContext = useMemo(() => {
    if (!currentPolicyId) return undefined;
    return getPolicyById(currentPolicyId);
  }, [currentPolicyId]);

  // Handle invalid policy ID provided via query
  const isInvalidPolicy = currentPolicyId && !policyContext;

  // Auto-scroll when messages update or loading state changes
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [activeConversation?.messages, isLoading]);

  // Create new conversation
  const handleNewChat = useCallback(() => {
    setErrorMessage(null);
    setInputValue("");
    setDraftPolicyId(undefined);

    const newChat = createNewConversation();
    const updated = [newChat, ...conversations];
    setConversations(updated);
    setActiveConversationId(newChat.id);
    saveStoredConversations(updated);
    setStoredActiveChatId(newChat.id);
  }, [conversations]);

  // Select existing conversation
  const handleSelectConversation = useCallback(
    (id: string) => {
      setErrorMessage(null);
      setInputValue("");
      setActiveConversationId(id);
      setStoredActiveChatId(id);

      const target = conversations.find((c) => c.id === id);
      if (target) {
        setDraftPolicyId(target.policyId);
      }
    },
    [conversations]
  );

  // Rename conversation
  const handleRenameConversation = useCallback(
    (id: string, newTitle: string) => {
      const updated = conversations.map((conv) => {
        if (conv.id === id) {
          return { ...conv, title: newTitle, updatedAt: new Date().toISOString() };
        }
        return conv;
      });
      setConversations(updated);
      saveStoredConversations(updated);
    },
    [conversations]
  );

  // Delete conversation
  const handleDeleteConversation = useCallback(
    (id: string) => {
      const filtered = conversations.filter((c) => c.id !== id);
      setConversations(filtered);
      saveStoredConversations(filtered);

      if (activeConversationId === id) {
        if (filtered.length > 0) {
          setActiveConversationId(filtered[0].id);
          setStoredActiveChatId(filtered[0].id);
          setDraftPolicyId(filtered[0].policyId);
        } else {
          const fresh = createNewConversation();
          setConversations([fresh]);
          setActiveConversationId(fresh.id);
          saveStoredConversations([fresh]);
          setStoredActiveChatId(fresh.id);
          setDraftPolicyId(undefined);
        }
      }
    },
    [conversations, activeConversationId]
  );

  // Send message
  const sendMessage = async (overrideMessage?: string) => {
    const textToSend = overrideMessage || inputValue;
    const trimmedValue = textToSend.trim();
    if (!trimmedValue || isLoading) return;

    setErrorMessage(null);
    setInputValue("");
    setIsLoading(true);

    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      role: "user",
      content: trimmedValue,
      timestamp: new Date().toISOString(),
    };

    // Prepare active or new conversation
    let targetConv = activeConversation;
    let nextConversations = [...conversations];

    if (!targetConv) {
      targetConv = createNewConversation(
        currentPolicyId,
        generateConversationTitle(trimmedValue)
      );
      targetConv.messages = [userMessage];
      nextConversations = [targetConv, ...nextConversations];
      setActiveConversationId(targetConv.id);
      setStoredActiveChatId(targetConv.id);
    } else {
      // If conversation had default title and no messages, generate title from first prompt
      const newTitle =
        targetConv.title === "New conversation" && targetConv.messages.length === 0
          ? generateConversationTitle(trimmedValue)
          : targetConv.title;

      const updatedMessages = [...targetConv.messages, userMessage];
      const updatedTarget: ChatConversation = {
        ...targetConv,
        title: newTitle,
        updatedAt: new Date().toISOString(),
        policyId: targetConv.policyId || currentPolicyId,
        messages: updatedMessages,
      };

      // Move updated conversation to top
      nextConversations = [
        updatedTarget,
        ...nextConversations.filter((c) => c.id !== updatedTarget.id),
      ];
      targetConv = updatedTarget;
    }

    setConversations(nextConversations);
    saveStoredConversations(nextConversations);

    // Call API with message, policyContext, and conversation history
    try {
      const payload: {
        message: string;
        policyContext?: Record<string, unknown>;
        history?: Array<{ role: "user" | "assistant"; content: string }>;
      } = {
        message: trimmedValue,
        history: targetConv.messages.slice(-8).map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };

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
          : typeof responseData.error === "string"
          ? responseData.error
          : "Sorry, I couldn't process that request right now. Please try again.";

      if (!response.ok) {
        setErrorMessage(
          typeof responseData.error === "string"
            ? responseData.error
            : "Assistant request failed. Please try again."
        );
      }

      const assistantMessage: ChatMessageType = {
        id: `assistant-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        role: "assistant",
        content: reply,
        timestamp: new Date().toISOString(),
      };

      const finalConversations = nextConversations.map((c) => {
        if (c.id === targetConv!.id) {
          return {
            ...c,
            updatedAt: new Date().toISOString(),
            messages: [...c.messages, assistantMessage],
          };
        }
        return c;
      });

      setConversations(finalConversations);
      saveStoredConversations(finalConversations);
    } catch {
      const errorReply =
        "Sorry, I couldn't connect to the PolicyLens AI service right now. Please check your connection and try again.";
      setErrorMessage(errorReply);

      const assistantMessage: ChatMessageType = {
        id: `assistant-err-${Date.now()}`,
        role: "assistant",
        content: errorReply,
        timestamp: new Date().toISOString(),
      };

      const finalConversations = nextConversations.map((c) => {
        if (c.id === targetConv!.id) {
          return {
            ...c,
            updatedAt: new Date().toISOString(),
            messages: [...c.messages, assistantMessage],
          };
        }
        return c;
      });

      setConversations(finalConversations);
      saveStoredConversations(finalConversations);
    } finally {
      setIsLoading(false);
    }
  };

  // Context-aware suggested questions for policy
  const policySuggestions = useMemo(() => {
    if (!policyContext) return [];

    const questions = [
      "What does this policy mean?",
      "Explain this in simple language.",
    ];

    if (policyContext.benefits) {
      questions.push("Why may this matter to my business?");
    }

    if (policyContext.eligibility) {
      questions.push("Does this apply to my business?");
    }

    if (policyContext.deadline) {
      questions.push("What is the deadline for this policy?");
    }

    return questions;
  }, [policyContext]);

  // If policy context is invalid
  if (isInvalidPolicy) {
    return (
      <div className="flex h-[calc(100vh-65px)] flex-col items-center justify-center p-6 bg-slate-50">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md text-center shadow-sm">
          <AlertTriangle className="size-10 text-status-amber mx-auto mb-4" />
          <h2 className="text-lg font-bold text-brand-navy mb-2">Policy Not Found</h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            The policy you requested (ID: {currentPolicyId}) could not be located in current records or may have been archived.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setDraftPolicyId(undefined);
                if (activeConversation) {
                  const updated = conversations.map((c) =>
                    c.id === activeConversation.id ? { ...c, policyId: undefined } : c
                  );
                  setConversations(updated);
                  saveStoredConversations(updated);
                }
              }}
              className="inline-flex items-center gap-2 bg-brand-navy text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center cursor-pointer"
            >
              <Bot className="size-4" />
              Continue with General Assistant
            </button>
            <Link
              href="/policies"
              className="inline-flex items-center gap-2 border border-slate-200 bg-white text-slate-700 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="size-4" />
              Browse Policies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentMessages = activeConversation?.messages || [];
  const hasMessages = currentMessages.length > 0;

  return (
    <div className="flex h-[calc(100vh-65px)] w-full overflow-hidden bg-white">
      {/* Region A: Chat History Panel (Desktop & Mobile Drawer) */}
      <ChatHistoryPanel
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onRenameConversation={handleRenameConversation}
        onDeleteConversation={handleDeleteConversation}
        isMobileOpen={isMobileHistoryOpen}
        onCloseMobile={() => setIsMobileHistoryOpen(false)}
        onToggleCollapse={() => setIsHistoryCollapsed((prev) => !prev)}
        isCollapsed={isHistoryCollapsed}
      />

      {/* Region B: Conversation Workspace */}
      <section className="flex flex-1 flex-col h-full min-w-0 bg-white relative">
        {/* Workspace Top Header Bar */}
        <header className="shrink-0 flex items-center justify-between border-b border-slate-200/80 px-4 py-3 sm:px-6 bg-white z-10">
          <div className="flex items-center gap-3 min-w-0">
            {/* Toggle History Button (Mobile or when collapsed on desktop) */}
            {(isHistoryCollapsed || !isMobileHistoryOpen) && (
              <button
                type="button"
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsMobileHistoryOpen(true);
                  } else {
                    setIsHistoryCollapsed(false);
                  }
                }}
                className="flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                title="Open chat history"
                aria-label="Open chat history"
              >
                {isHistoryCollapsed ? (
                  <PanelLeftOpen className="size-4" />
                ) : (
                  <PanelLeftClose className="size-4 lg:hidden" />
                )}
              </button>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-brand-navy tracking-tight truncate">
                  PolicyLens AI Assistant
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#7899B8]/15 border border-[#7899B8]/30 px-2 py-0.5 text-[10px] font-semibold text-brand-navy">
                  <Sparkles className="size-3 text-ai-cyan" />
                  Policy Research
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate hidden sm:block">
                {activeConversation && activeConversation.title !== "New conversation"
                  ? `Topic: ${activeConversation.title}`
                  : "Understand policies, explore their potential impact, and clarify your next steps."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="workspace-new-chat-btn"
              type="button"
              onClick={handleNewChat}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-navy hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="size-3.5" />
              <span className="hidden sm:inline">New chat</span>
            </button>
          </div>
        </header>

        {/* Selected Policy Context Indicator (when applicable) */}
        {policyContext && (
          <PolicyContextCard
            id={policyContext.id}
            title={policyContext.title}
            category={policyContext.category}
            status={policyContext.status}
            deadline={policyContext.deadline}
            description={policyContext.description}
            onClearContext={() => {
              setDraftPolicyId(undefined);
              if (activeConversation) {
                const updated = conversations.map((c) =>
                  c.id === activeConversation.id ? { ...c, policyId: undefined } : c
                );
                setConversations(updated);
                saveStoredConversations(updated);
              }
            }}
          />
        )}

        {/* Scrollable Conversation Stream */}
        <div
          ref={scrollRef}
          className="relative flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-6 [scrollbar-width:thin] flex flex-col"
        >
          <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
            {/* Initial Empty State when active conversation has no messages */}
            {!hasMessages ? (
              <div className="my-auto flex flex-col justify-center">
                <EmptyState
                  onSelectPrompt={(p) => sendMessage(p)}
                  hasPolicyContext={Boolean(policyContext)}
                />

                {/* Additional Context-Specific Policy Questions */}
                {policyContext && policySuggestions.length > 0 && (
                  <div className="mt-4 p-4 rounded-xl border border-ai-cyan/20 bg-linear-to-b from-cyan-50/20 to-transparent">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Suggested questions for &ldquo;{policyContext.title}&rdquo;
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {policySuggestions.map((q, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => sendMessage(q)}
                          className="text-xs font-medium text-brand-navy bg-white border border-slate-200 hover:border-[#7899B8] hover:bg-[#7899B8]/5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Message List */
              <div className="flex flex-col gap-4 pb-4">
                {currentMessages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    id={msg.id}
                    role={msg.role}
                    content={msg.content}
                    timestamp={msg.timestamp}
                  />
                ))}

                {isLoading && (
                  <div className="pt-2">
                    <TypingIndicator />
                  </div>
                )}
              </div>
            )}

            {/* Error recovery banner */}
            {errorMessage && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-status-red">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="size-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="inline-flex items-center gap-1 font-semibold hover:underline cursor-pointer"
                >
                  <RefreshCw className="size-3" />
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Message Composer Area */}
        <div className="shrink-0 border-t border-slate-200/80 bg-white p-4 sm:px-6 z-10">
          <div className="max-w-3xl mx-auto w-full">
            {/* Quick Context Prompts when conversation has messages */}
            {hasMessages && policyContext && !isLoading && (
              <div className="mb-2 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 shrink-0">
                  Follow-up:
                </span>
                {policySuggestions.slice(0, 3).map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => sendMessage(q)}
                    className="whitespace-nowrap text-xs text-slate-600 bg-slate-50 border border-slate-200 hover:border-[#7899B8] hover:bg-white px-2.5 py-1 rounded-md transition-colors shrink-0 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={() => sendMessage()}
              disabled={isLoading}
              isLoading={isLoading}
              placeholder={
                policyContext
                  ? `Ask about ${policyContext.title}...`
                  : "Ask about a policy or business regulation..."
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
