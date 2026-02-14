"use client";

import { useState, useCallback } from "react";
import { UserProfileProvider } from "@/context/UserProfileContext";
import { ChatProvider } from "@/context/ChatContext";
import { PersonaProvider } from "@/context/PersonaContext";
import SplashScreen from "@/components/SplashScreen";

export function Providers({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <UserProfileProvider>
      <PersonaProvider>
        <ChatProvider>
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          {children}
        </ChatProvider>
      </PersonaProvider>
    </UserProfileProvider>
  );
}
