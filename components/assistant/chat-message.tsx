import { AssistantMessage } from "./assistant-message";
import { UserMessage } from "./user-message";

export type ChatMessageProps = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

export function ChatMessage({ role, content }: ChatMessageProps) {
  if (role === "user") {
    return <UserMessage content={content} />;
  }

  return <AssistantMessage content={content} />;
}
