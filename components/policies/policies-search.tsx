"use client";

import { ChangeEvent } from "react";
import { Search, X } from "lucide-react";

type PoliciesSearchProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function PoliciesSearch({ value, onChange, className }: PoliciesSearchProps) {
  return (
    <div className={`relative flex-1 ${className || ""}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="size-4 text-[#7899B8]" aria-hidden="true" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        placeholder="Search policies, schemes, or categories…"
        className="block w-full h-11 pl-10 pr-9 rounded-xl border border-slate-200/80 bg-white text-xs sm:text-sm text-[#16273B] placeholder:text-muted-foreground shadow-xs outline-none focus:border-[#7899B8] focus:bg-white focus:ring-1 focus:ring-[#7899B8] transition-all"
        aria-label="Search policies, schemes, or categories"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-[#16273B] transition-colors cursor-pointer"
          aria-label="Clear search input"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
