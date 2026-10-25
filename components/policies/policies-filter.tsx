"use client";

import { X, Filter, RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type FilterOption = {
  name: string;
  count: number;
};

type PoliciesFilterProps = {
  categories: FilterOption[];
  statuses: FilterOption[];
  selectedCategories: string[];
  selectedStatuses: string[];
  selectedPriority: "all" | "urgent" | "standard";
  selectedDeadlineOnly: boolean;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: "all" | "urgent" | "standard") => void;
  onDeadlineOnlyChange: (enabled: boolean) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
  isMobileOpen: boolean;
  onMobileClose: () => void;
};

export function PoliciesFilter({
  categories,
  statuses,
  selectedCategories,
  selectedStatuses,
  selectedPriority,
  selectedDeadlineOnly,
  onCategoryChange,
  onStatusChange,
  onPriorityChange,
  onDeadlineOnlyChange,
  onClearAll,
  hasActiveFilters,
  isMobileOpen,
  onMobileClose,
}: PoliciesFilterProps) {
  const content = (
    <div className="flex flex-col gap-5">
      {/* Header with Clear button */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-[#7899B8]" aria-hidden="true" />
          <h2 className="text-sm font-bold tracking-tight text-[#16273B]">
            Filters
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="size-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Priority Filter */}
      <div>
        <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">
          Priority
        </h3>
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100/80 border border-slate-200/60">
          {(
            [
              { id: "all", label: "All" },
              { id: "urgent", label: "Urgent" },
              { id: "standard", label: "Standard" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onPriorityChange(item.id)}
              className={cn(
                "py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer",
                selectedPriority === item.id
                  ? "bg-white text-[#16273B] shadow-2xs"
                  : "text-slate-600 hover:text-[#16273B]"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-slate-100" />

      {/* Category Filter */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Category
          </h3>
          {selectedCategories.length > 0 && (
            <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-1.5 py-0.2 rounded">
              {selectedCategories.length} selected
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat.name);
            return (
              <label
                key={cat.name}
                className="flex items-center justify-between gap-2.5 cursor-pointer group py-0.5 select-none"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
                      isChecked
                        ? "bg-[#2563EB] border-[#2563EB] text-white"
                        : "border-slate-300 bg-white group-hover:border-[#7899B8]"
                    )}
                  >
                    {isChecked && <Check className="size-3 stroke-[3]" />}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() => onCategoryChange(cat.name)}
                  />
                  <span
                    className={cn(
                      "text-xs leading-tight truncate transition-colors",
                      isChecked
                        ? "font-semibold text-[#16273B]"
                        : "text-slate-600 group-hover:text-[#16273B]"
                    )}
                  >
                    {cat.name}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-400 shrink-0">
                  {cat.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px w-full bg-slate-100" />

      {/* Status Filter */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Policy Status
          </h3>
          {selectedStatuses.length > 0 && (
            <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-1.5 py-0.2 rounded">
              {selectedStatuses.length} selected
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
          {statuses.map((stat) => {
            const isChecked = selectedStatuses.includes(stat.name);
            return (
              <label
                key={stat.name}
                className="flex items-center justify-between gap-2.5 cursor-pointer group py-0.5 select-none"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
                      isChecked
                        ? "bg-[#2563EB] border-[#2563EB] text-white"
                        : "border-slate-300 bg-white group-hover:border-[#7899B8]"
                    )}
                  >
                    {isChecked && <Check className="size-3 stroke-[3]" />}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() => onStatusChange(stat.name)}
                  />
                  <span
                    className={cn(
                      "text-xs leading-tight truncate transition-colors",
                      isChecked
                        ? "font-semibold text-[#16273B]"
                        : "text-slate-600 group-hover:text-[#16273B]"
                    )}
                  >
                    {stat.name}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-400 shrink-0">
                  {stat.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px w-full bg-slate-100" />

      {/* Deadlines Toggle */}
      <div>
        <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">
          Deadlines
        </h3>
        <label className="flex items-center gap-2.5 cursor-pointer group select-none">
          <div
            className={cn(
              "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
              selectedDeadlineOnly
                ? "bg-[#2563EB] border-[#2563EB] text-white"
                : "border-slate-300 bg-white group-hover:border-[#7899B8]"
            )}
          >
            {selectedDeadlineOnly && <Check className="size-3 stroke-[3]" />}
          </div>
          <input
            type="checkbox"
            className="sr-only"
            checked={selectedDeadlineOnly}
            onChange={(e) => onDeadlineOnlyChange(e.target.checked)}
          />
          <span
            className={cn(
              "text-xs transition-colors",
              selectedDeadlineOnly
                ? "font-semibold text-[#16273B]"
                : "text-slate-600 group-hover:text-[#16273B]"
            )}
          >
            Only show policies with active deadlines
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-full">
        <div className="sticky top-24 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#16273B]/30 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Container */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-modal="true"
        role="dialog"
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <div className="flex items-center gap-2 text-[#16273B] font-bold text-sm">
            <Filter className="size-4 text-[#7899B8]" />
            <span>Filter Policies</span>
          </div>
          <button
            onClick={onMobileClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-[#16273B] transition-colors cursor-pointer"
            aria-label="Close filters"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {content}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-2.5">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              className="flex-1 h-9 rounded-xl text-xs font-semibold border-slate-200 cursor-pointer"
            >
              Reset
            </Button>
          )}
          <Button
            size="sm"
            onClick={onMobileClose}
            className="flex-1 h-9 rounded-xl text-xs font-semibold bg-[#16273B] text-white hover:bg-[#243B53] cursor-pointer"
          >
            Show Results
          </Button>
        </div>
      </div>
    </>
  );
}
