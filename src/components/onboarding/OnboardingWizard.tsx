"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/context/UserProfileContext";
import { UserProfile, emptyProfile } from "@/types/profile";
import { DEMO_PROFILE } from "@/lib/demo-profile";
import ProgressBar from "./ProgressBar";
import StepName from "./StepName";
import StepPersonalInfo from "./StepPersonalInfo";
import StepConnectAccounts from "./StepConnectAccounts";
import StepDebt from "./StepDebt";
import StepReview from "./StepReview";

const TOTAL_STEPS = 5;

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
    setStep(TOTAL_STEPS - 1);
  };

  const handleComplete = () => {
    setProfile(data);
    router.push("/chat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <img
            src="/images/logo_empowHer.png"
            alt="empowHer"
            className="h-10 mx-auto"
          />
        </div>

        <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 sm:p-8">
          {step > 0 && (
            <div className="mb-6">
              <ProgressBar currentStep={step - 1} totalSteps={TOTAL_STEPS - 1} />
            </div>
          )}

          {step > 0 && (
            <button
              onClick={fillDemo}
              className="mb-6 text-xs px-3 py-1.5 rounded-full bg-accent-light text-accent hover:bg-accent hover:text-white transition-colors font-medium"
            >
              Use Demo Profile
            </button>
          )}

          {step === 0 && (
            <StepName
              name={data.personalInfo.name}
              onChange={(name) =>
                setData({ ...data, personalInfo: { ...data.personalInfo, name } })
              }
              onNext={goNext}
            />
          )}
          {step === 1 && (
            <StepPersonalInfo
              data={data.personalInfo}
              userName={data.personalInfo.name.split(" ")[0]}
              onChange={(personalInfo) => setData({ ...data, personalInfo })}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 2 && (
            <StepConnectAccounts
              brokerageAccounts={data.brokerageAccounts}
              bankAccounts={data.bankAccounts}
              investments={data.investments}
              retirement={data.retirement}
              onChangeBrokerage={(brokerageAccounts) => setData({ ...data, brokerageAccounts })}
              onChangeBank={(bankAccounts) => setData({ ...data, bankAccounts })}
              onChangeInvestments={(investments) => setData({ ...data, investments })}
              onChangeRetirement={(retirement) => setData({ ...data, retirement })}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 3 && (
            <StepDebt
              data={data.debts}
              onChange={(debts) => setData({ ...data, debts })}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 4 && (
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
