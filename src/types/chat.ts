export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  voiceMode: boolean;
  isPlaying: boolean;
}
