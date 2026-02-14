"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/context/UserProfileContext";

export default function Home() {
  const { isOnboarded, isLoading } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      router.push(isOnboarded ? "/chat" : "/onboarding");
    }
  }, [isOnboarded, isLoading, router]);

<<<<<<< HEAD
  return null;
=======
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-accent">DF</span>
        </div>
        <h1 className="text-xl font-semibold text-foreground">Didi Finance</h1>
        <p className="text-sm text-text-secondary mt-1">Your Financial Big Sister</p>
        <div className="mt-6">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    </div>
  );
>>>>>>> tanvi/main
}
