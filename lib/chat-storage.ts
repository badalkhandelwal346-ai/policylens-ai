export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  policyId?: string;
  messages: ChatMessage[];
}

export const CHAT_STORAGE_KEY = "policylens_chat_conversations";
export const ACTIVE_CHAT_ID_KEY = "policylens_active_chat_id";

/**
 * Generate a clean, readable conversation title from the first message
 */
export function generateConversationTitle(prompt: string): string {
  const trimmed = prompt.trim().replace(/^["']|["']$/g, "");
  if (!trimmed) return "New conversation";

  // If prompt has multiple lines, take first line
  const firstLine = trimmed.split("\n")[0].trim();

  // Strip leading punctuation or greeting phrases if any
  const cleaned = firstLine.replace(/^[#\s\-*]+/, "");

  if (cleaned.length <= 38) {
    return cleaned;
  }

  // Truncate at word boundary
  const truncated = cleaned.slice(0, 36);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 20) {
    return `${truncated.slice(0, lastSpace)}...`;
  }
  return `${truncated}...`;
}

/**
 * Format timestamp as human-readable relative time
 */
export function formatRelativeTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;

    // Format like "Oct 24"
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

/**
 * Safely load saved conversations from localStorage
 */
export function loadStoredConversations(): ChatConversation[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Validate and sanitize records
    const valid: ChatConversation[] = parsed
      .filter((item): item is ChatConversation => {
        return (
          item &&
          typeof item === "object" &&
          typeof item.id === "string" &&
          typeof item.title === "string" &&
          Array.isArray(item.messages)
        );
      })
      .map((item) => ({
        id: item.id,
        title: item.title || "New conversation",
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
        policyId: typeof item.policyId === "string" ? item.policyId : undefined,
        messages: Array.isArray(item.messages) ? item.messages : [],
      }));

    // Sort by updatedAt descending
    return valid.sort((a, b) => {
      const timeA = new Date(a.updatedAt).getTime();
      const timeB = new Date(b.updatedAt).getTime();
      return timeB - timeA;
    });
  } catch (error) {
    console.error("Failed to load chat conversations from localStorage:", error);
    return [];
  }
}

/**
 * Safely save conversations to localStorage
 */
export function saveStoredConversations(conversations: ChatConversation[]): boolean {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(conversations));
    return true;
  } catch (error) {
    console.error("Failed to save chat conversations to localStorage:", error);
    return false;
  }
}

/**
 * Get active conversation ID
 */
export function getStoredActiveChatId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(ACTIVE_CHAT_ID_KEY);
  } catch {
    return null;
  }
}

/**
 * Set active conversation ID
 */
export function setStoredActiveChatId(id: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (id) {
      window.localStorage.setItem(ACTIVE_CHAT_ID_KEY, id);
    } else {
      window.localStorage.removeItem(ACTIVE_CHAT_ID_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

/**
 * Create a new empty conversation
 */
export function createNewConversation(policyId?: string, title?: string): ChatConversation {
  const now = new Date().toISOString();
  return {
    id: `chat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    title: title || "New conversation",
    createdAt: now,
    updatedAt: now,
    policyId: policyId || undefined,
    messages: [],
  };
}

/**
 * Search saved conversations by title and message content
 */
export function searchConversations(
  conversations: ChatConversation[],
  query: string
): ChatConversation[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return conversations;

  return conversations.filter((conv) => {
    // Check title
    if (conv.title.toLowerCase().includes(normalized)) return true;

    // Check message content
    return conv.messages.some((msg) =>
      msg.content.toLowerCase().includes(normalized)
    );
  });
}
