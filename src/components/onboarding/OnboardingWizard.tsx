"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/context/UserProfileContext";
import { UserProfile, emptyProfile } from "@/types/profile";
import { DEMO_PROFILE } from "@/lib/demo-profile";
import ProgressBar from "./ProgressBar";
import StepPersonalInfo from "./StepPersonalInfo";
import StepBrokerageAccounts from "./StepBrokerageAccounts";
import StepRetirement from "./StepRetirement";
import StepBanking from "./StepBanking";
import StepInvestments from "./StepInvestments";
import StepDebt from "./StepDebt";
import StepReview from "./StepReview";

const TOTAL_STEPS = 7;

export default function OnboardingWizard() {
  const router = useRouter();
  const { setProfile } = useUserProfile();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<UserProfile>({ ...emptyProfile });

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));
  const goToStep = (s: number) => setStep(s);

  const fillDemo = () => {
    setData({ ...DEMO_PROFILE });
    setStep(TOTAL_STEPS - 1); // Jump to review
  };

  const handleComplete = () => {
    setProfile(data);
    router.push("/chat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Didi Finance
          </h1>
          <p className="text-sm text-text-secondary mt-1">Your Financial Big Sister</p>
        </div>

        <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 sm:p-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
            </div>
          </div>

          <button
            onClick={fillDemo}
            className="mb-6 text-xs px-3 py-1.5 rounded-full bg-accent-light text-accent hover:bg-accent hover:text-white transition-colors font-medium"
          >
            Use Demo Profile
          </button>

          {step === 0 && (
            <StepPersonalInfo
              data={data.personalInfo}
              onChange={(personalInfo) => setData({ ...data, personalInfo })}
              onNext={goNext}
            />
          )}
          {step === 1 && (
            <StepBrokerageAccounts
              data={data.brokerageAccounts}
              onChange={(brokerageAccounts) => setData({ ...data, brokerageAccounts })}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 2 && (
            <StepRetirement
              data={data.retirement}
              onChange={(retirement) => setData({ ...data, retirement })}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 3 && (
            <StepBanking
              data={data.bankAccounts}
              onChange={(bankAccounts) => setData({ ...data, bankAccounts })}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 4 && (
            <StepInvestments
              data={data.investments}
              onChange={(investments) => setData({ ...data, investments })}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 5 && (
            <StepDebt
              data={data.debts}
              onChange={(debts) => setData({ ...data, debts })}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 6 && (
            <StepReview
              data={data}
              onBack={goBack}
              onComplete={handleComplete}
              onEditStep={goToStep}
            />
          )}
        </div>
      </div>
    </div>
  );
}
