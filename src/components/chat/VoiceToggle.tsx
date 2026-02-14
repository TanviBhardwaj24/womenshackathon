"use client";

interface Props {
  enabled: boolean;
  onChange: () => void;
}

export default function VoiceToggle({ enabled, onChange }: Props) {
  return (
    <button
      onClick={onChange}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        enabled
<<<<<<< HEAD
          ? "text-white"
          : "bg-background border border-border text-text-secondary"
      }`}
      style={enabled ? { backgroundColor: "#520404" } : undefined}
      onMouseEnter={(e) => { if (!enabled) { e.currentTarget.style.borderColor = "#520404"; e.currentTarget.style.color = "#520404"; } }}
      onMouseLeave={(e) => { if (!enabled) { e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = ""; } }}
=======
          ? "bg-accent text-white"
          : "bg-background border border-border text-text-secondary hover:border-accent hover:text-accent"
      }`}
>>>>>>> tanvi/main
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {enabled ? (
          <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </>
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        )}
      </svg>
      Voice {enabled ? "On" : "Off"}
    </button>
  );
}
