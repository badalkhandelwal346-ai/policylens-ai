export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start pt-1 pb-2">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-100/90 px-3.5 py-1.5 text-xs text-brand-muted-foreground shadow-2xs">
        <span className="flex items-center gap-1" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-brand-muted-foreground/70 animate-pulse" />
          <span className="size-1.5 rounded-full bg-brand-muted-foreground/70 animate-pulse delay-150" />
          <span className="size-1.5 rounded-full bg-brand-muted-foreground/70 animate-pulse delay-300" />
        </span>
        <span className="font-medium text-slate-600">PolicyLens is thinking...</span>
      </div>
    </div>
  );
}
