type UserMessageProps = {
  content: string;
};

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex w-full justify-end">
      <div className="max-w-[88%] sm:max-w-[78%] rounded-2xl rounded-tr-sm bg-[#D8E3EA] p-4 text-sm leading-relaxed text-brand-navy shadow-2xs">
        {content}
      </div>
    </div>
  );
}
