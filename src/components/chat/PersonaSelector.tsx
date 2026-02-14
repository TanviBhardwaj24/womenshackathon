"use client";

import { useState } from "react";
import { usePersona } from "@/context/PersonaContext";
import { Persona } from "@/types/persona";

function PersonaIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="30" cy="52" r="12" fill="#520404" />
      <circle cx="48" cy="48" r="8" fill="#520404" />
      <circle cx="50" cy="28" r="16" fill="#520404" />
    </svg>
  );
}

function PersonaCard({
  persona,
  onSelect,
}: {
  persona: Persona;
  onSelect: (p: Persona) => void;
}) {
  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Card -- flex-1 so all cards share the same height */}
      <div
        className="w-full rounded-3xl flex flex-col items-center justify-end pt-12 pb-8 px-6 flex-1"
        style={{ backgroundColor: persona.cardColor }}
      >
        <PersonaIcon />
        <h3
          className="text-2xl font-serif text-center mt-6 leading-snug"
          style={{ color: "#520404" }}
        >
          {persona.name === "Investor Friend" ? (
            <em>{persona.name}</em>
          ) : (
            <>
              {persona.name}
              {persona.id === "big-sister" && (
                <span className="text-base font-sans font-normal"> (Default)</span>
              )}
            </>
          )}
        </h3>
        <p
          className="text-sm text-center mt-3 leading-relaxed"
          style={{ color: "rgba(82, 4, 4, 0.7)" }}
        >
          {persona.description}
        </p>
      </div>

      {/* Let's talk button */}
      <button
        onClick={() => onSelect(persona)}
        className="mt-4 w-full py-3 rounded-full text-sm font-semibold border transition-colors"
        style={{
          borderColor: "#520404",
          color: "#520404",
          backgroundColor: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#520404";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#520404";
        }}
      >
        {"Let's talk"}
      </button>
    </div>
  );
}

interface Props {
  onClose: () => void;
}

export default function PersonaSelector({ onClose }: Props) {
  const { personas, setPersona } = usePersona();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => setCurrentIndex((i) => Math.min(i + 1, personas.length - 1));
  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  const handleSelect = (p: Persona) => {
    setPersona(p);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col" style={{ backgroundColor: "#FFFDF7" }}>
      {/* Top bar with close button */}
      <div className="flex justify-end px-5 pt-4">
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full text-text-secondary hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Heading */}
      <div className="px-6 pt-2 pb-6 text-center">
        <h1
          className="text-3xl sm:text-4xl font-bold font-serif leading-snug text-balance"
          style={{ color: "#520404" }}
        >
          Money Conversations, Your Way
        </h1>
        <p className="text-text-secondary mt-2 leading-relaxed" style={{ fontSize: "22px" }}>
          Support that matches your journey
        </p>
      </div>

      {/* Desktop: grid of all cards | Mobile: carousel */}
      <div className="flex-1 flex items-start md:items-center justify-center overflow-hidden px-4">
        {/* Desktop grid -- hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-4 gap-5 w-full max-w-4xl items-stretch">
          {personas.map((p) => (
            <PersonaCard key={p.id} persona={p} onSelect={handleSelect} />
          ))}
        </div>

        {/* Mobile carousel -- hidden on desktop */}
        <div className="md:hidden w-full flex items-stretch overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out w-full items-stretch"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {personas.map((p) => (
              <div key={p.id} className="w-full shrink-0 px-6 flex" style={{ minWidth: "100%" }}>
                <PersonaCard persona={p} onSelect={handleSelect} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation arrows -- mobile only */}
      <div className="flex md:hidden items-center justify-center gap-4 pb-10 pt-4">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-opacity disabled:opacity-30"
          style={{ borderColor: "#D1D5DB", color: "#9CA3AF" }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goNext}
          disabled={currentIndex === personas.length - 1}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-opacity disabled:opacity-30"
          style={{ backgroundColor: "#520404" }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
