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

  return null;
}
