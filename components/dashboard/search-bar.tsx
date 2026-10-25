"use client";

import { ChangeEvent } from "react";
import { Search, X } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Search policies, updates, or deadlines...",
  className,
}: SearchBarProps) {
  return (
    <div className={className || "px-4 mt-4 mb-2 md:px-0"}>
      <div className="flex items-center gap-3 rounded-2xl border border-border/80 bg-white px-4 py-2.5 shadow-xs transition-all focus-within:border-[#7899B8] focus-within:ring-2 focus-within:ring-[#7899B8]/20">
        <Search
          className="size-4 shrink-0 text-[#7899B8]"
          aria-hidden="true"
        />
        <input
          id="dashboard-search"
          type="search"
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm text-[#16273B] placeholder:text-muted-foreground outline-none"
          aria-label={placeholder}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-muted-foreground hover:text-[#16273B] p-0.5 rounded-full"
            aria-label="Clear dashboard search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}

