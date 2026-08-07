type AssistantMessageProps = {
  content: string;
};

export function AssistantMessage({ content }: AssistantMessageProps) {
  return (
    <div className="flex w-full justify-start">
      <div className="max-w-[88%] sm:max-w-[78%] rounded-2xl rounded-tl-sm bg-brand-card p-4 text-sm leading-relaxed text-brand-navy shadow-2xs">
        {content}
      </div>
    </div>
  );
}
