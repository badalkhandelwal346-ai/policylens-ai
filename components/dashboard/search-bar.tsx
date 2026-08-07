import { Mic, Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="mx-4 mt-4 mb-2">
      <div className="flex items-center gap-3 rounded-xl border border-[oklch(0.91_0.008_250)] bg-white px-4 py-3 shadow-sm">
        <Search
          className="size-4 shrink-0 text-brand-muted-foreground"
          aria-hidden="true"
        />
        <input
          id="dashboard-search"
          type="search"
          placeholder="Search policies, amendments, or AI"
          className="min-w-0 flex-1 bg-transparent text-sm text-brand-navy placeholder:text-brand-muted-foreground outline-none"
          aria-label="Search policies, amendments, or AI"
        />
        <Mic
          className="size-4 shrink-0 text-brand-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
