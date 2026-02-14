"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/context/UserProfileContext";
import Image from "next/image";

export default function Home() {
  const { isOnboarded, isLoading } = useUserProfile();
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2800);

    const navigateTimer = setTimeout(() => {
      if (!isLoading) {
        router.push(isOnboarded ? "/chat" : "/onboarding");
      }
    }, 3400);

    return () => {
      clearTimeout(redirectTimer);
      clearTimeout(navigateTimer);
    };
  }, [isOnboarded, isLoading, router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center transition-opacity duration-500"
      style={{
        backgroundColor: "#FFEDBD",
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <div
        className="flex flex-col items-center"
        style={{
          animation: "fade-in 0.8s ease-out forwards",
        }}
      >
        <div
          style={{
            animation: "logo-breathe 2.4s ease-in-out infinite",
          }}
        >
          <Image
            src="/images/logo_empowHer.png"
            alt="empowHer logo"
            width={280}
            height={80}
            priority
          />
        </div>
      </div>
    </div>
  );
}
