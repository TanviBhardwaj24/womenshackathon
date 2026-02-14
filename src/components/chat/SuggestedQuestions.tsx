"use client";

import { usePersona } from "@/context/PersonaContext";
import { useUserProfile } from "@/context/UserProfileContext";

interface Props {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: Props) {
  const { persona } = usePersona();
  const { profile } = useUserProfile();
  const firstName = profile?.personalInfo.name.split(" ")[0] || "friend";

  return (
    <div className="flex flex-col py-8 px-2">
      {/* Large welcome headline */}
      <h1
        className="text-3xl sm:text-4xl font-bold font-serif leading-snug text-balance"
        style={{ color: "#520404" }}
      >
        {"Let's talk money, "}
        <em className="font-semibold">{firstName}.</em>
      </h1>
      <p className="text-sm text-text-secondary mt-3 leading-relaxed max-w-sm">
        {persona.greeting}
      </p>

      {/* Suggestion prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 w-full">
        {persona.suggestions.map((s) => (
          <button
            key={s.text}
            onClick={() => onSelect(s.text)}
            className="flex items-center gap-3 px-4 py-3 rounded-full border border-border bg-surface transition-all text-left text-sm text-foreground hover:bg-[#FFEDBD]/30"
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#520404"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
          >
            <span className="text-lg">{s.icon}</span>
            <span>{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
