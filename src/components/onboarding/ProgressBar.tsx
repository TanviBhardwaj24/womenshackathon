"use client";

const STEP_LABELS = ["About You", "Accounts", "Balances", "Review"];

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {i > 0 && (
                <div
                  className="h-0.5 flex-1 transition-colors bg-border"
                  style={i <= currentStep ? { backgroundColor: "#520404" } : undefined}
                />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors shrink-0 ${
                  i <= currentStep ? "text-white" : "bg-border text-text-secondary"
                }`}
                style={
                  i <= currentStep
                    ? { backgroundColor: "#520404" }
                    : undefined
                }
              >
                {i < currentStep ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className="h-0.5 flex-1 transition-colors bg-border"
                  style={i < currentStep ? { backgroundColor: "#520404" } : undefined}
                />
              )}
            </div>
            <span
              className="text-[10px] mt-1.5 hidden sm:block text-text-secondary"
              style={i === currentStep ? { color: "#520404", fontWeight: 500 } : undefined}
            >
              {STEP_LABELS[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
