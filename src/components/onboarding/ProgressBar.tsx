"use client";

<<<<<<< HEAD
const STEP_LABELS = ["About You", "Accounts", "Balances", "Review"];
=======
const STEP_LABELS = ["Personal", "Brokerage", "Retirement", "Banking", "Investments", "Debt", "Review"];
>>>>>>> tanvi/main

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
<<<<<<< HEAD
                  className="h-0.5 flex-1 transition-colors bg-border"
                  style={i <= currentStep ? { backgroundColor: "#520404" } : undefined}
=======
                  className={`h-0.5 flex-1 transition-colors ${
                    i <= currentStep ? "bg-accent" : "bg-border"
                  }`}
>>>>>>> tanvi/main
                />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors shrink-0 ${
<<<<<<< HEAD
                  i <= currentStep ? "text-white" : "bg-border text-text-secondary"
                }`}
                style={
                  i <= currentStep
                    ? { backgroundColor: "#520404" }
                    : undefined
                }
=======
                  i < currentStep
                    ? "bg-accent text-white"
                    : i === currentStep
                    ? "bg-accent text-white ring-4 ring-accent-light"
                    : "bg-border text-text-secondary"
                }`}
>>>>>>> tanvi/main
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
<<<<<<< HEAD
                  className="h-0.5 flex-1 transition-colors bg-border"
                  style={i < currentStep ? { backgroundColor: "#520404" } : undefined}
=======
                  className={`h-0.5 flex-1 transition-colors ${
                    i < currentStep ? "bg-accent" : "bg-border"
                  }`}
>>>>>>> tanvi/main
                />
              )}
            </div>
            <span
<<<<<<< HEAD
              className="text-[10px] mt-1.5 hidden sm:block text-text-secondary"
              style={i === currentStep ? { color: "#520404", fontWeight: 500 } : undefined}
=======
              className={`text-[10px] mt-1.5 hidden sm:block ${
                i === currentStep ? "text-accent font-medium" : "text-text-secondary"
              }`}
>>>>>>> tanvi/main
            >
              {STEP_LABELS[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
