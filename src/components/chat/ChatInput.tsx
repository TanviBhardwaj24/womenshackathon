"use client";

import { useState, KeyboardEvent } from "react";

interface Props {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-surface p-4">
      <div className="flex items-end gap-2 max-w-lg mx-auto">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your portfolio, investments, or financial goals..."
          disabled={disabled}
          rows={1}
<<<<<<< HEAD
          className="flex-1 resize-none px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:border-transparent text-sm"
          style={{ minHeight: "44px", maxHeight: "120px", "--tw-ring-color": "rgba(82, 4, 4, 0.3)" } as React.CSSProperties}
=======
          className="flex-1 resize-none px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
          style={{ minHeight: "44px", maxHeight: "120px" }}
>>>>>>> tanvi/main
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "44px";
            target.style.height = target.scrollHeight + "px";
          }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
<<<<<<< HEAD
          className="w-10 h-10 rounded-full text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          style={{ backgroundColor: "#520404" }}
=======
          className="w-10 h-10 rounded-full bg-accent hover:bg-accent-dark text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
>>>>>>> tanvi/main
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
