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
                  className={`h-0.5 flex-1 transition-colors ${
                    i <= currentStep ? "bg-accent" : "bg-border"
                  }`}
                />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors shrink-0 ${
                  i < currentStep
                    ? "bg-accent text-white"
                    : i === currentStep
                    ? "bg-accent text-white ring-4 ring-accent-light"
                    : "bg-border text-text-secondary"
                }`}
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
                  className={`h-0.5 flex-1 transition-colors ${
                    i < currentStep ? "bg-accent" : "bg-border"
                  }`}
                />
              )}
            </div>
            <span
              className={`text-[10px] mt-1.5 hidden sm:block ${
                i === currentStep ? "text-accent font-medium" : "text-text-secondary"
              }`}
            >
              {STEP_LABELS[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
