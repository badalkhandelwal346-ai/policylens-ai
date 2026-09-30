import { X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

type PoliciesFilterProps = {
  categories: string[];
  statuses: string[];
  selectedCategories: string[];
  selectedStatuses: string[];
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
};

export function PoliciesFilter({
  categories,
  statuses,
  selectedCategories,
  selectedStatuses,
  onCategoryChange,
  onStatusChange,
  isMobileOpen,
  onMobileClose,
}: PoliciesFilterProps) {
  const content = (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-4 text-sm font-bold tracking-tight text-brand-navy">
          Category
        </h3>
        <div className="flex flex-col gap-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryChange(category)}
                />
                <div className="size-4 rounded border border-border bg-white transition-colors peer-checked:border-primary-blue peer-checked:bg-primary-blue group-hover:border-primary-blue/50" />
                <svg
                  className="absolute left-0 top-0 size-4 pointer-events-none opacity-0 peer-checked:opacity-100 text-white p-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-sm text-brand-muted-foreground group-hover:text-brand-navy transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-border" />

      <div>
        <h3 className="mb-4 text-sm font-bold tracking-tight text-brand-navy">
          Status
        </h3>
        <div className="flex flex-col gap-3">
          {statuses.map((status) => (
            <label key={status} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={selectedStatuses.includes(status)}
                  onChange={() => onStatusChange(status)}
                />
                <div className="size-4 rounded border border-border bg-white transition-colors peer-checked:border-primary-blue peer-checked:bg-primary-blue group-hover:border-primary-blue/50" />
                <svg
                  className="absolute left-0 top-0 size-4 pointer-events-none opacity-0 peer-checked:opacity-100 text-white p-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-sm text-brand-muted-foreground group-hover:text-brand-navy transition-colors">
                {status}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-full">
        <div className="sticky top-24 rounded-2xl border border-border bg-white p-6 shadow-sm">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-brand-navy/20 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Content */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden",
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2 text-brand-navy font-bold">
              <Filter className="size-5" />
              <h2>Filters</h2>
            </div>
            <button
              onClick={onMobileClose}
              className="rounded-full p-2 text-brand-muted-foreground hover:bg-muted hover:text-brand-navy transition-colors"
              aria-label="Close filters"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {content}
          </div>
        </div>
      </div>
    </>
  );
}
