"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/context/UserProfileContext";

export default function Home() {
  const { isOnboarded, isLoading } = useUserProfile();
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);
  const [splashReady, setSplashReady] = useState(false);
  const hasNavigated = useRef(false);

  // Mark splash as ready after minimum display time
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashReady(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Navigate once both splash is ready and profile loading is done
  useEffect(() => {
    if (splashReady && !isLoading && !hasNavigated.current) {
      hasNavigated.current = true;
      setFadeOut(true);
      const navTimer = setTimeout(() => {
        router.push(isOnboarded ? "/chat" : "/onboarding");
      }, 600);
      return () => clearTimeout(navTimer);
    }
  }, [splashReady, isLoading, isOnboarded, router]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center transition-opacity duration-500"
      style={{
        backgroundColor: "#FFEDBD",
        opacity: fadeOut ? 0 : 1,
        zIndex: 9999,
      }}
    >
      <div
        className="flex flex-col items-center opacity-0"
        style={{
          animation: "fade-in 0.8s ease-out 0.1s forwards",
        }}
      >
        <div
          style={{
            animation: "logo-breathe 2.4s ease-in-out infinite",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo_empowHer.png"
            alt="empowHer logo"
            width={280}
            height={80}
            style={{ display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
