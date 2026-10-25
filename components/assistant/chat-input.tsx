"use client";

import { useRef, useEffect } from "react";
import { ArrowUp, Loader2 } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  isLoading = false,
  placeholder = "Ask about a policy or business regulation...",
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 140);
    textarea.style.height = `${Math.max(newHeight, 44)}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled && !isLoading) {
        onSubmit();
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled && !isLoading) {
      onSubmit();
    }
  };

  const canSubmit = Boolean(value.trim()) && !disabled && !isLoading;

  return (
    <form onSubmit={handleFormSubmit} className="relative w-full">
      <div className="relative flex items-end rounded-2xl border border-slate-200 bg-white p-2 shadow-xs focus-within:border-[#7899B8] focus-within:ring-2 focus-within:ring-[#7899B8]/20 transition-all">
        <textarea
          ref={textareaRef}
          id="chat-composer-input"
          value={value}
          disabled={disabled || isLoading}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder={placeholder}
          className="w-full resize-none bg-transparent px-3 py-2 text-sm text-brand-navy placeholder:text-slate-400 focus:outline-hidden disabled:opacity-60 leading-relaxed max-h-[140px]"
        />

        <button
          id="chat-send-btn"
          type="submit"
          disabled={!canSubmit}
          aria-label={isLoading ? "Generating response..." : "Send message"}
          className={`size-9 shrink-0 flex items-center justify-center rounded-xl transition-all cursor-pointer ${
            canSubmit
              ? "bg-brand-navy text-white hover:bg-slate-800 shadow-2xs"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin text-slate-500" />
          ) : (
            <ArrowUp className="size-4 stroke-[2.5]" />
          )}
        </button>
      </div>

      <div className="mt-1.5 flex items-center justify-between px-2 text-[11px] text-slate-400">
        <span>Shift + Enter for new line</span>
        <span>AI research assistant</span>
      </div>
    </form>
  );
}
