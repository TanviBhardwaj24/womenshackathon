"use client";

import { Message } from "@/types/chat";
import { useEffect, useRef, useState } from "react";

interface Props {
  message: Message;
  voiceMode: boolean;
  onPlayAudio: (url: string) => void;
}

export default function MessageBubble({ message, voiceMode, onPlayAudio }: Props) {
  const isUser = message.role === "user";
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Auto-play when audio URL is first set
    if (message.audioUrl && voiceMode && !audioRef.current) {
      const audio = new Audio(message.audioUrl);
      audioRef.current = audio;
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.onpause = () => setIsPlaying(false);
      audio.play().catch(() => {});
    }
  }, [message.audioUrl, voiceMode]);

  const toggleAudio = () => {
    if (!message.audioUrl) return;
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    } else {
      onPlayAudio(message.audioUrl);
    }
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
<<<<<<< HEAD
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mr-2 mt-1" style={{ backgroundColor: "#520404" }}>
          eH
=======
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold shrink-0 mr-2 mt-1">
          DF
>>>>>>> tanvi/main
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? "order-1" : ""}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
<<<<<<< HEAD
              ? "text-white rounded-br-md"
              : "bg-surface border border-border text-foreground rounded-bl-md"
          }`}
          style={isUser ? { backgroundColor: "#520404" } : undefined}
=======
              ? "bg-accent text-white rounded-br-md"
              : "bg-surface border border-border text-foreground rounded-bl-md"
          }`}
>>>>>>> tanvi/main
        >
          {message.content || (
            <span className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-text-secondary"
                  style={{
                    animation: "bounce-dot 1.4s ease-in-out infinite",
                    animationDelay: `${i * 0.16}s`,
                  }}
                />
              ))}
            </span>
          )}
        </div>
        {message.audioUrl && !isUser && (
          <button
            onClick={toggleAudio}
<<<<<<< HEAD
            className="mt-1.5 flex items-center gap-1.5 text-xs text-text-secondary transition-colors"
            onMouseEnter={(e) => { e.currentTarget.style.color = "#520404"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = ""; }}
=======
            className="mt-1.5 flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent transition-colors"
>>>>>>> tanvi/main
          >
            {isPlaying ? (
              <>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                Playing...
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play audio
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
