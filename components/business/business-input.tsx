import { cn } from "@/lib/utils";

type BusinessInputProps = {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

export function BusinessInput({
  label,
  placeholder,
  defaultValue,
  className,
}: BusinessInputProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-xs font-medium text-business-label">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly
        className="h-11 w-full rounded-xl border border-business-field-border bg-business-field px-3.5 text-sm text-business-field-text placeholder:text-business-label/60 outline-none"
      />
    </div>
  );
}
