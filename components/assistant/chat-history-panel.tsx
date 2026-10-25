"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  X,
  MessageSquare,
  FileText,
  Pencil,
  Trash2,
  Check,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import type { ChatConversation } from "@/lib/chat-storage";
import { formatRelativeTime } from "@/lib/chat-storage";

interface ChatHistoryPanelProps {
  conversations: ChatConversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  onDeleteConversation: (id: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onToggleCollapse?: () => void;
  isCollapsed?: boolean;
}

export function ChatHistoryPanel({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onRenameConversation,
  onDeleteConversation,
  isMobileOpen = false,
  onCloseMobile,
  onToggleCollapse,
  isCollapsed = false,
}: ChatHistoryPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter conversations by search query
  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    if (conv.title.toLowerCase().includes(query)) return true;
    return conv.messages.some((m) => m.content.toLowerCase().includes(query));
  });

  const handleStartRename = (conv: ChatConversation, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(conv.id);
    setEditTitle(conv.title);
    setDeleteConfirmId(null);
  };

  const handleSaveRename = (id: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = editTitle.trim();
    if (trimmed) {
      onRenameConversation(id, trimmed);
    }
    setEditingId(null);
  };

  const handleCancelRename = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const handleRequestDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmId(id);
    setEditingId(null);
  };

  const handleConfirmDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteConversation(id);
    setDeleteConfirmId(null);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmId(null);
  };

  if (isCollapsed) {
    return null;
  }

  const panelContent = (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 p-3.5 sm:px-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4 text-brand-navy" aria-hidden="true" />
          <h2 className="text-sm font-bold text-brand-navy tracking-tight">
            Chat History
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          {/* New Chat Button */}
          <button
            id="history-new-chat-btn"
            type="button"
            onClick={() => {
              onNewChat();
              if (onCloseMobile) onCloseMobile();
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-navy text-white px-2.5 py-1.5 text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
            title="Start a new chat"
          >
            <Plus className="size-3.5" aria-hidden="true" />
            <span>New chat</span>
          </button>

          {/* Desktop Collapse Button */}
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden lg:flex size-7 items-center justify-center rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Collapse chat history"
              aria-label="Collapse chat history"
            >
              <ChevronLeft className="size-4" />
            </button>
          )}

          {/* Mobile Close Button */}
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="flex lg:hidden size-7 items-center justify-center rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close chat history"
              aria-label="Close chat history"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 border-b border-slate-100 bg-slate-50/40">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-2.5 size-3.5 text-slate-400" />
          <input
            id="chat-history-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-7 text-xs text-brand-navy placeholder:text-slate-400 focus:border-[#7899B8] focus:outline-hidden transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
      </div>

      {/* Conversation List / States */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 [scrollbar-width:thin]">
        {conversations.length === 0 ? (
          /* Empty History State */
          <div className="flex flex-col items-center justify-center p-6 text-center text-slate-500 my-auto h-48">
            <div className="size-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
              <MessageSquare className="size-5" />
            </div>
            <p className="text-xs font-semibold text-brand-navy mb-1">
              No conversations yet
            </p>
            <p className="text-[11px] text-slate-400 mb-4 max-w-[200px]">
              Start a new chat to explore your policies and ask compliance questions.
            </p>
            <button
              type="button"
              onClick={() => {
                onNewChat();
                if (onCloseMobile) onCloseMobile();
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-navy hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
            >
              <Plus className="size-3.5" />
              <span>Start a conversation</span>
            </button>
          </div>
        ) : filteredConversations.length === 0 ? (
          /* Search Empty State */
          <div className="flex flex-col items-center justify-center p-6 text-center text-slate-500 my-auto h-44">
            <AlertCircle className="size-6 text-slate-400 mb-2" />
            <p className="text-xs font-semibold text-brand-navy mb-1">
              No matches found
            </p>
            <p className="text-[11px] text-slate-400 mb-3">
              No conversations match &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-medium text-primary-blue hover:underline cursor-pointer"
            >
              Clear search filter
            </button>
          </div>
        ) : (
          /* List of Conversations */
          filteredConversations.map((conv) => {
            const isSelected = conv.id === activeConversationId;
            const isEditing = editingId === conv.id;
            const isDeleting = deleteConfirmId === conv.id;

            return (
              <div
                key={conv.id}
                onClick={() => {
                  if (!isEditing && !isDeleting) {
                    onSelectConversation(conv.id);
                    if (onCloseMobile) onCloseMobile();
                  }
                }}
                className={`group relative flex flex-col rounded-xl px-3 py-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#7899B8]/15 border border-[#7899B8]/30 shadow-2xs"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                {/* Editing Title State */}
                {isEditing ? (
                  <form
                    onSubmit={(e) => handleSaveRename(conv.id, e)}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5"
                  >
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      autoFocus
                      className="w-full rounded border border-primary-blue bg-white px-2 py-0.5 text-xs text-brand-navy focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="p-1 text-status-green hover:bg-green-50 rounded cursor-pointer"
                      title="Save title"
                    >
                      <Check className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelRename}
                      className="p-1 text-slate-400 hover:bg-slate-100 rounded cursor-pointer"
                      title="Cancel"
                    >
                      <X className="size-3.5" />
                    </button>
                  </form>
                ) : isDeleting ? (
                  /* Delete Confirmation State */
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-between gap-1 text-xs text-status-red bg-red-50 p-1.5 rounded-lg border border-red-200"
                  >
                    <span className="text-[11px] font-medium truncate">
                      Delete this chat?
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleConfirmDelete(conv.id, e)}
                        className="rounded bg-status-red text-white px-2 py-0.5 text-[10px] font-bold hover:bg-red-700 cursor-pointer"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelDelete}
                        className="rounded border border-slate-300 bg-white text-slate-600 px-1.5 py-0.5 text-[10px] hover:bg-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Regular Conversation Item */
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        {conv.policyId ? (
                          <span title="Policy-linked chat">
                            <FileText className="size-3.5 text-ai-cyan shrink-0" />
                          </span>
                        ) : (
                          <MessageSquare
                            className={`size-3.5 shrink-0 ${
                              isSelected ? "text-primary-blue" : "text-slate-400"
                            }`}
                          />
                        )}
                        <span
                          className={`text-xs truncate ${
                            isSelected
                              ? "font-semibold text-brand-navy"
                              : "text-slate-700 font-medium group-hover:text-brand-navy"
                          }`}
                        >
                          {conv.title}
                        </span>
                      </div>

                      {/* Action buttons (Rename & Delete) - visible on hover or when selected */}
                      <div
                        className={`flex items-center gap-0.5 shrink-0 transition-opacity ${
                          isSelected
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) => handleStartRename(conv, e)}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-white/80 cursor-pointer"
                          title="Rename conversation"
                          aria-label="Rename conversation"
                        >
                          <Pencil className="size-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleRequestDelete(conv.id, e)}
                          className="p-1 rounded text-slate-400 hover:text-status-red hover:bg-red-50 cursor-pointer"
                          title="Delete conversation"
                          aria-label="Delete conversation"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    </div>

                    {/* Metadata line (relative time and message count) */}
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{formatRelativeTime(conv.updatedAt)}</span>
                      <span>
                        {conv.messages.length}{" "}
                        {conv.messages.length === 1 ? "msg" : "msgs"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer info */}
      <div className="border-t border-slate-100 p-2.5 text-center bg-slate-50/50">
        <p className="text-[11px] text-slate-400">
          Saved locally in this browser
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside className="hidden lg:flex w-72 xl:w-80 shrink-0 border-r border-slate-200/80 h-full flex-col bg-white">
        {panelContent}
      </aside>

      {/* Mobile & Tablet Drawer Modal */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="relative w-80 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {panelContent}
          </div>
        </div>
      )}
    </>
  );
}
