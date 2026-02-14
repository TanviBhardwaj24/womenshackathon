"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/context/UserProfileContext";
import ChatContainer from "@/components/chat/ChatContainer";

export default function ChatPage() {
  const { isOnboarded, isLoading } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isOnboarded) {
      router.push("/onboarding");
    }
  }, [isOnboarded, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
<<<<<<< HEAD
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#520404", borderTopColor: "transparent" }} />
=======
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
>>>>>>> tanvi/main
      </div>
    );
  }

  if (!isOnboarded) return null;

  return <ChatContainer />;
}
