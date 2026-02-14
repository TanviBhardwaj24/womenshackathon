"use client";

import { createContext, useContext, useReducer, ReactNode, useCallback } from "react";
import { Message, ChatState } from "@/types/chat";
import { UserProfile } from "@/types/profile";
<<<<<<< HEAD
import { Persona } from "@/types/persona";

interface ChatContextType {
  state: ChatState;
  sendMessage: (content: string, profile: UserProfile, persona?: Persona) => Promise<void>;
  clearMessages: () => void;
=======

interface ChatContextType {
  state: ChatState;
  sendMessage: (content: string, profile: UserProfile) => Promise<void>;
>>>>>>> tanvi/main
  toggleVoice: () => void;
  setIsPlaying: (playing: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

type Action =
  | { type: "ADD_MESSAGE"; message: Message }
  | { type: "UPDATE_LAST_ASSISTANT"; content: string }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "TOGGLE_VOICE" }
  | { type: "SET_PLAYING"; playing: boolean }
<<<<<<< HEAD
  | { type: "SET_AUDIO_URL"; messageId: string; url: string }
  | { type: "CLEAR_MESSAGES" };
=======
  | { type: "SET_AUDIO_URL"; messageId: string; url: string };
>>>>>>> tanvi/main

function reducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.message] };
    case "UPDATE_LAST_ASSISTANT": {
      const msgs = [...state.messages];
      const last = msgs[msgs.length - 1];
      if (last && last.role === "assistant") {
        msgs[msgs.length - 1] = { ...last, content: last.content + action.content };
      }
      return { ...state, messages: msgs };
    }
    case "SET_LOADING":
      return { ...state, isLoading: action.loading };
    case "TOGGLE_VOICE":
      return { ...state, voiceMode: !state.voiceMode };
    case "SET_PLAYING":
      return { ...state, isPlaying: action.playing };
    case "SET_AUDIO_URL": {
      const msgs = state.messages.map((m) =>
        m.id === action.messageId ? { ...m, audioUrl: action.url } : m
      );
      return { ...state, messages: msgs };
    }
<<<<<<< HEAD
    case "CLEAR_MESSAGES":
      return { ...state, messages: [], isLoading: false };
=======
>>>>>>> tanvi/main
    default:
      return state;
  }
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  voiceMode: false,
  isPlaying: false,
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

<<<<<<< HEAD
  const sendMessage = useCallback(async (content: string, profile: UserProfile, persona?: Persona) => {
=======
  const sendMessage = useCallback(async (content: string, profile: UserProfile) => {
>>>>>>> tanvi/main
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    dispatch({ type: "ADD_MESSAGE", message: userMsg });
    dispatch({ type: "SET_LOADING", loading: true });

    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };
    dispatch({ type: "ADD_MESSAGE", message: assistantMsg });

    try {
      const allMessages = [...state.messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
<<<<<<< HEAD
        body: JSON.stringify({ messages: allMessages, userProfile: profile, personaId: persona?.id }),
=======
        body: JSON.stringify({ messages: allMessages, userProfile: profile }),
>>>>>>> tanvi/main
      });

      if (!res.ok) throw new Error("Chat request failed");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let fullResponse = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  fullResponse += delta;
                  dispatch({ type: "UPDATE_LAST_ASSISTANT", content: delta });
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        }

        // If voice mode is on, fetch TTS
        if (state.voiceMode && fullResponse) {
          try {
            const ttsRes = await fetch("/api/tts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: fullResponse }),
            });
            if (ttsRes.ok) {
              const audioBlob = await ttsRes.blob();
              const audioUrl = URL.createObjectURL(audioBlob);
              dispatch({ type: "SET_AUDIO_URL", messageId: assistantMsg.id, url: audioUrl });
            }
          } catch {
            // TTS failed silently
          }
        }
      }
    } catch (error) {
      dispatch({
        type: "UPDATE_LAST_ASSISTANT",
        content: "I'm sorry, I had trouble connecting. Please try again.",
      });
    } finally {
      dispatch({ type: "SET_LOADING", loading: false });
    }
  }, [state.messages, state.voiceMode]);

<<<<<<< HEAD
  const clearMessages = useCallback(() => {
    dispatch({ type: "CLEAR_MESSAGES" });
  }, []);

=======
>>>>>>> tanvi/main
  const toggleVoice = useCallback(() => {
    dispatch({ type: "TOGGLE_VOICE" });
  }, []);

  const setIsPlaying = useCallback((playing: boolean) => {
    dispatch({ type: "SET_PLAYING", playing });
  }, []);

  return (
<<<<<<< HEAD
    <ChatContext.Provider value={{ state, sendMessage, clearMessages, toggleVoice, setIsPlaying }}>
=======
    <ChatContext.Provider value={{ state, sendMessage, toggleVoice, setIsPlaying }}>
>>>>>>> tanvi/main
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
