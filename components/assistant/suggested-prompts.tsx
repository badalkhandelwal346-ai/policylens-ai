import { PromptCard } from "./prompt-card";

type SuggestedPromptsProps = {
  prompts?: string[];
  onSelectPrompt?: (prompt: string) => void;
};

const defaultPrompts = [
  "Explain in simple language",
  "How does this affect me?",
  "Translate to Hindi",
];

export function SuggestedPrompts({
  prompts = defaultPrompts,
  onSelectPrompt,
}: SuggestedPromptsProps) {
  return (
    <div className="w-full px-4 py-1.5">
      <div className="flex w-full gap-2 overflow-x-auto pb-1 touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center">
        {prompts.map((prompt, index) => (
          <PromptCard
            key={index}
            id={`prompt-chip-${index}`}
            text={prompt}
            onClick={() => onSelectPrompt?.(prompt)}
          />
        ))}
      </div>
    </div>
  );
}
