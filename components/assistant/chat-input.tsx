import { Mic, Plus } from "lucide-react";

type ChatInputProps = {
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
};

export function ChatInput({ value, disabled, onChange, onSubmit }: ChatInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      className="w-full px-4"
    >
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg sm:shadow-md">
        <button
          id="chat-attach-btn"
          type="button"
          aria-label="Add attachment or action"
          disabled={disabled}
          className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <span className="flex size-7 items-center justify-center rounded-full border border-slate-300/80 text-brand-navy">
            <Plus className="size-4 stroke-[2.25px]" aria-hidden="true" />
          </span>
        </button>

        <input
          id="chat-input-field"
          type="text"
          value={value ?? ""}
          disabled={disabled}
          onChange={onChange}
          placeholder="Type your question..."
          className="w-full bg-transparent px-1 text-sm text-brand-navy placeholder:text-brand-muted-foreground focus:outline-hidden"
        />

        <button
          id="chat-mic-btn"
          type="button"
          aria-label="Voice input"
          disabled={disabled}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-brand-navy text-white shadow-xs hover:bg-brand-navy/90 transition-colors"
        >
          <Mic className="size-5" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
