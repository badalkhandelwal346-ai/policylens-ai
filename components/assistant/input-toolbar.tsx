import { ChatInput } from "./chat-input";
import { SuggestedPrompts } from "./suggested-prompts";

type InputToolbarProps = {
  inputValue?: string;
  disabled?: boolean;
  onInputChange?: (value: string) => void;
  onSubmit?: () => void;
  onSelectPrompt?: (prompt: string) => void;
};

export function InputToolbar({
  inputValue = "",
  disabled,
  onInputChange,
  onSubmit,
  onSelectPrompt,
}: InputToolbarProps) {
  return (
    <div className="w-full bg-linear-to-t from-white via-white/95 to-transparent pt-3 pb-3">
      <SuggestedPrompts onSelectPrompt={onSelectPrompt} />
      <ChatInput
        value={inputValue}
        disabled={disabled}
        onChange={(val) => onInputChange?.(val)}
        onSubmit={() => onSubmit?.()}
      />
    </div>
  );
}
