type PromptCardProps = {
  id?: string;
  text: string;
  onClick?: () => void;
};

export function PromptCard({ id, text, onClick }: PromptCardProps) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className="shrink-0 cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-brand-navy shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] sm:text-sm whitespace-nowrap"
    >
      {text}
    </button>
  );
}
