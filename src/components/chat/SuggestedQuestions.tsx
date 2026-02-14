"use client";

<<<<<<< HEAD
import { usePersona } from "@/context/PersonaContext";
import { useUserProfile } from "@/context/UserProfileContext";
=======
const SUGGESTIONS = [
  { icon: "📊", text: "How does my portfolio look?" },
  { icon: "🌱", text: "What should I invest in next?" },
  { icon: "🏖️", text: "Help me plan for retirement" },
  { icon: "🔍", text: "Is this crypto address safe? 0x7F19720A857F834887FC9A7bC0a0fBe7Fc7f8102" },
];
>>>>>>> tanvi/main

interface Props {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: Props) {
<<<<<<< HEAD
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
=======
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-accent">DF</span>
        </div>
        <h2 className="text-xl font-semibold text-foreground">Hey, sis!</h2>
        <p className="text-sm text-text-secondary mt-1">
          I&apos;m Didi, your financial big sister. What can I help you with today?
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.text}
            onClick={() => onSelect(s.text)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-surface hover:border-accent hover:bg-accent-light/30 transition-all text-left text-sm text-foreground"
>>>>>>> tanvi/main
          >
            <span className="text-lg">{s.icon}</span>
            <span>{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
