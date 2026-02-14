"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/context/UserProfileContext";
import { UserProfile, emptyProfile } from "@/types/profile";
import { DEMO_PROFILE } from "@/lib/demo-profile";
import ProgressBar from "./ProgressBar";
<<<<<<< HEAD
import StepName from "./StepName";
import StepPersonalInfo from "./StepPersonalInfo";
import StepConnectAccounts from "./StepConnectAccounts";
import StepDebt from "./StepDebt";
import StepReview from "./StepReview";

const TOTAL_STEPS = 5;
=======
import StepPersonalInfo from "./StepPersonalInfo";
import StepBrokerageAccounts from "./StepBrokerageAccounts";
import StepRetirement from "./StepRetirement";
import StepBanking from "./StepBanking";
import StepInvestments from "./StepInvestments";
import StepDebt from "./StepDebt";
import StepReview from "./StepReview";

const TOTAL_STEPS = 7;
>>>>>>> tanvi/main

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
<<<<<<< HEAD
    setStep(TOTAL_STEPS - 1);
=======
    setStep(TOTAL_STEPS - 1); // Jump to review
>>>>>>> tanvi/main
  };

  const handleComplete = () => {
    setProfile(data);
    router.push("/chat");
  };

<<<<<<< HEAD
  // Step 0: Full-screen name input (no card wrapper)
  if (step === 0) {
    return (
      <StepName
        name={data.personalInfo.name}
        onChange={(name) =>
          setData({ ...data, personalInfo: { ...data.personalInfo, name } })
        }
        onNext={goNext}
      />
    );
  }

  // Steps 1-4: Card-based layout
=======
>>>>>>> tanvi/main
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
<<<<<<< HEAD
          <img
            src="/images/logo_empowHer.png"
            alt="empowHer"
            className="h-10 mx-auto"
          />
        </div>

        <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 sm:p-8">
          <div className="mb-6">
            <ProgressBar currentStep={step - 1} totalSteps={TOTAL_STEPS - 1} />
=======
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
>>>>>>> tanvi/main
          </div>

          <button
            onClick={fillDemo}
<<<<<<< HEAD
            className="mb-6 text-xs px-3 py-1.5 rounded-full font-medium transition-colors hover:text-white"
            style={{ backgroundColor: "#FFEDBD", color: "#520404" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#520404"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FFEDBD"; e.currentTarget.style.color = "#520404"; }}
=======
            className="mb-6 text-xs px-3 py-1.5 rounded-full bg-accent-light text-accent hover:bg-accent hover:text-white transition-colors font-medium"
>>>>>>> tanvi/main
          >
            Use Demo Profile
          </button>

<<<<<<< HEAD
          {step === 1 && (
            <StepPersonalInfo
              data={data.personalInfo}
              userName={data.personalInfo.name.split(" ")[0]}
              onChange={(personalInfo) => setData({ ...data, personalInfo })}
              onNext={goNext}
=======
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
>>>>>>> tanvi/main
              onBack={goBack}
            />
          )}
          {step === 2 && (
<<<<<<< HEAD
            <StepConnectAccounts
              brokerageAccounts={data.brokerageAccounts}
              bankAccounts={data.bankAccounts}
              investments={data.investments}
              retirement={data.retirement}
              onChangeBrokerage={(brokerageAccounts) => setData({ ...data, brokerageAccounts })}
              onChangeBank={(bankAccounts) => setData({ ...data, bankAccounts })}
              onChangeInvestments={(investments) => setData({ ...data, investments })}
              onChangeRetirement={(retirement) => setData({ ...data, retirement })}
=======
            <StepRetirement
              data={data.retirement}
              onChange={(retirement) => setData({ ...data, retirement })}
>>>>>>> tanvi/main
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 3 && (
<<<<<<< HEAD
=======
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
>>>>>>> tanvi/main
            <StepDebt
              data={data.debts}
              onChange={(debts) => setData({ ...data, debts })}
              onNext={goNext}
              onBack={goBack}
            />
          )}
<<<<<<< HEAD
          {step === 4 && (
=======
          {step === 6 && (
>>>>>>> tanvi/main
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
