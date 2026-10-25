import { AssistantMessage } from "./assistant-message";
import { UserMessage } from "./user-message";

export type ChatMessageProps = {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp?: string;
};

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  if (role === "user") {
    return <UserMessage content={content} timestamp={timestamp} />;
  }

  return <AssistantMessage content={content} timestamp={timestamp} />;
}
