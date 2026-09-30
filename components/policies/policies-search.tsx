import { ChangeEvent } from "react";
import { Search } from "lucide-react";

type PoliciesSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function PoliciesSearch({ value, onChange }: PoliciesSearchProps) {
  return (
    <div className="relative flex-1 max-w-2xl">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search
          className="h-5 w-5 text-brand-muted-foreground"
          aria-hidden="true"
        />
      </div>
      <input
        type="search"
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        placeholder="Search policies, schemes, categories..."
        className="block w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white text-sm text-brand-navy placeholder:text-brand-muted-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue/20 focus-visible:border-primary-blue transition-all"
        aria-label="Search policies"
      />
    </div>
  );
}
