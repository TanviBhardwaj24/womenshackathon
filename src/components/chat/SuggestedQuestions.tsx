"use client";

import { usePersona } from "@/context/PersonaContext";

interface Props {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: Props) {
  const { persona } = usePersona();

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4">
      <div className="text-center mb-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: persona.cardColor }}
        >
          <span className="text-2xl font-bold" style={{ color: "#520404" }}>eH</span>
        </div>
        <h2 className="text-xl font-semibold font-serif text-foreground">{persona.name}</h2>
        <p className="text-sm text-text-secondary mt-1 leading-relaxed max-w-xs mx-auto">
          {persona.greeting}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
        {persona.suggestions.map((s) => (
          <button
            key={s.text}
            onClick={() => onSelect(s.text)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-surface transition-all text-left text-sm text-foreground hover:bg-[#FFEDBD]/30"
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
