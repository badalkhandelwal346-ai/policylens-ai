import { ChatInput } from "./chat-input";
import { SuggestedPrompts } from "./suggested-prompts";

type InputToolbarProps = {
  inputValue?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
  onSelectPrompt?: (prompt: string) => void;
};

export function InputToolbar({
  inputValue,
  onInputChange,
  onSubmit,
  onSelectPrompt,
}: InputToolbarProps) {
  return (
    <div className="w-full bg-linear-to-t from-white via-white/95 to-transparent pt-3 pb-3">
      <SuggestedPrompts onSelectPrompt={onSelectPrompt} />
      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
