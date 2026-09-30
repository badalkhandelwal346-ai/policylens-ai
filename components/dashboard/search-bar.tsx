import { ChangeEvent } from "react";
import { Mic, Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mx-4 mt-4 mb-2 md:hidden">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-primary-blue/20 focus-within:border-primary-blue transition-all">
        <Search
          className="size-4 shrink-0 text-brand-muted-foreground"
          aria-hidden="true"
        />
        <input
          id="dashboard-search"
          type="search"
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
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
