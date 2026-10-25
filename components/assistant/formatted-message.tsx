import React from "react";

interface FormattedMessageProps {
  content: string;
}

/**
 * Parses inline formatting like **bold**, *italic*, and `code`
 */
function renderInlineText(text: string): React.ReactNode[] {
  // Regex pattern matching **bold**, *italic*, and `code`
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-brand-navy">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="italic text-slate-700">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-800"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function FormattedMessage({ content }: FormattedMessageProps) {
  if (!content) return null;

  // Split lines
  const rawLines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;
  let keyIndex = 0;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === "ul") {
      blocks.push(
        <ul
          key={`list-${keyIndex++}`}
          className="my-2 space-y-1.5 pl-5 list-disc text-sm leading-relaxed text-slate-700 marker:text-primary-blue/60"
        >
          {currentList.items.map((item, i) => (
            <li key={i}>{renderInlineText(item)}</li>
          ))}
        </ul>
      );
    } else {
      blocks.push(
        <ol
          key={`list-${keyIndex++}`}
          className="my-2 space-y-1.5 pl-5 list-decimal text-sm leading-relaxed text-slate-700 marker:text-brand-navy/60"
        >
          {currentList.items.map((item, i) => (
            <li key={i}>{renderInlineText(item)}</li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();

    if (!line) {
      flushList();
      continue;
    }

    // Bullet lists (* item, - item)
    if (/^[-*]\s+/.test(line)) {
      const itemText = line.replace(/^[-*]\s+/, "");
      if (currentList && currentList.type === "ul") {
        currentList.items.push(itemText);
      } else {
        flushList();
        currentList = { type: "ul", items: [itemText] };
      }
      continue;
    }

    // Numbered lists (1. item, 2. item)
    if (/^\d+\.\s+/.test(line)) {
      const itemText = line.replace(/^\d+\.\s+/, "");
      if (currentList && currentList.type === "ol") {
        currentList.items.push(itemText);
      } else {
        flushList();
        currentList = { type: "ol", items: [itemText] };
      }
      continue;
    }

    // Any other line breaks out of list
    flushList();

    // Headers (### or ## or #)
    if (line.startsWith("### ")) {
      blocks.push(
        <h4
          key={`h4-${keyIndex++}`}
          className="mt-3.5 mb-1.5 text-sm font-bold tracking-tight text-brand-navy"
        >
          {renderInlineText(line.replace(/^###\s+/, ""))}
        </h4>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h3
          key={`h3-${keyIndex++}`}
          className="mt-4 mb-2 text-base font-bold tracking-tight text-brand-navy"
        >
          {renderInlineText(line.replace(/^##\s+/, ""))}
        </h3>
      );
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <h2
          key={`h2-${keyIndex++}`}
          className="mt-4 mb-2 text-lg font-bold tracking-tight text-brand-navy"
        >
          {renderInlineText(line.replace(/^#\s+/, ""))}
        </h2>
      );
      continue;
    }

    // Blockquote (> quote)
    if (line.startsWith("> ")) {
      blocks.push(
        <blockquote
          key={`quote-${keyIndex++}`}
          className="my-2 border-l-3 border-[#7899B8] bg-slate-50/80 px-3.5 py-2 text-xs italic text-slate-700 rounded-r-md"
        >
          {renderInlineText(line.replace(/^>\s+/, ""))}
        </blockquote>
      );
      continue;
    }

    // Regular paragraph
    blocks.push(
      <p
        key={`p-${keyIndex++}`}
        className="my-1.5 text-sm leading-relaxed text-slate-800"
      >
        {renderInlineText(line)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1">{blocks}</div>;
}
