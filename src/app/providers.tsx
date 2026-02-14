"use client";

import { UserProfileProvider } from "@/context/UserProfileContext";
import { ChatProvider } from "@/context/ChatContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProfileProvider>
      <ChatProvider>{children}</ChatProvider>
    </UserProfileProvider>
  );
}
