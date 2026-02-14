"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { useUserProfile } from "@/context/UserProfileContext";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";
import VoiceToggle from "./VoiceToggle";

export default function ChatContainer() {
  const { state, sendMessage, toggleVoice } = useChat();
  const { profile, clearProfile } = useUserProfile();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages]);

  const handleSend = (content: string) => {
    if (!profile) return;
    sendMessage(content, profile);
  };

  const firstName = profile?.personalInfo.name.split(" ")[0] || "there";

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
              DF
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground">Didi Finance</h1>
              <p className="text-[11px] text-text-secondary">Your Financial Big Sister</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <VoiceToggle enabled={state.voiceMode} onChange={toggleVoice} />
            <button
              onClick={clearProfile}
              className="text-xs text-text-secondary hover:text-foreground transition-colors"
              title="Reset profile"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-4">
          {state.messages.length === 0 ? (
            <SuggestedQuestions onSelect={handleSend} />
          ) : (
            <>
              {state.messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  voiceMode={state.voiceMode}
                  onPlayAudio={() => {}}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={state.isLoading} />
    </div>
  );
}
