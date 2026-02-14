"use client";

import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2800);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

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
