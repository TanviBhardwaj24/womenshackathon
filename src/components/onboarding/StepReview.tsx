"use client";

import Button from "@/components/ui/Button";
import { UserProfile } from "@/types/profile";

interface Props {
  data: UserProfile;
  onBack: () => void;
  onComplete: () => void;
  onEditStep: (step: number) => void;
}

function SectionHeader({ title, step, onEdit }: { title: string; step: number; onEdit: (s: number) => void }) {
  return (
    <div className="flex items-center justify-between mb-2">
<<<<<<< HEAD
      <h3 className="text-sm font-semibold font-serif" style={{ color: "#520404" }}>{title}</h3>
      <button
        onClick={() => onEdit(step)}
        className="text-xs transition-colors"
        style={{ color: "#520404" }}
=======
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <button
        onClick={() => onEdit(step)}
        className="text-xs text-accent hover:text-accent-dark transition-colors"
>>>>>>> tanvi/main
      >
        Edit
      </button>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

export default function StepReview({ data, onBack, onComplete, onEditStep }: Props) {
  const { personalInfo, brokerageAccounts, retirement, bankAccounts, investments, debts } = data;

  return (
    <div className="space-y-5">
      <div>
<<<<<<< HEAD
        <h2 className="text-xl font-semibold font-serif" style={{ color: "#520404" }}>Review Your Profile</h2>
        <p className="text-sm text-text-secondary mt-1 leading-relaxed">
=======
        <h2 className="text-xl font-semibold text-foreground">Review Your Profile</h2>
        <p className="text-sm text-text-secondary mt-1">
>>>>>>> tanvi/main
          Make sure everything looks right before we get started.
        </p>
      </div>

<<<<<<< HEAD
      {/* Personal Info - step 0 is Name, step 1 is PersonalInfo */}
      <div className="p-4 border border-border rounded-lg">
        <SectionHeader title="About You" step={1} onEdit={onEditStep} />
        <InfoRow label="Name" value={personalInfo.name} />
        <InfoRow label="Age" value={String(personalInfo.age)} />
        <InfoRow label="Location" value={personalInfo.location} />
        <InfoRow label="Income" value={"$" + personalInfo.annualIncome.toLocaleString() + "/yr"} />
      </div>

      {/* Accounts - step 2 is ConnectAccounts */}
      {(bankAccounts.length > 0 || brokerageAccounts.length > 0 || retirement.has401k || retirement.hasRothIRA || investments.length > 0) && (
        <div className="p-4 border border-border rounded-lg">
          <SectionHeader title="Connected Accounts" step={2} onEdit={onEditStep} />
          {bankAccounts.map((a, i) => (
            <InfoRow key={"bank-" + i} label={a.bank + " " + a.accountType} value={"$" + a.balance.toLocaleString()} />
          ))}
          {brokerageAccounts.map((a, i) => (
            <InfoRow key={"brok-" + i} label={a.provider + " -- " + a.accountType} value={"$" + a.balance.toLocaleString()} />
          ))}
          {retirement.has401k && (
            <InfoRow label={"401(k) at " + retirement.provider401k} value={"$" + retirement.balance401k.toLocaleString()} />
          )}
          {retirement.hasRothIRA && (
            <InfoRow label={"Roth IRA at " + retirement.providerRothIRA} value={"$" + retirement.balanceRothIRA.toLocaleString()} />
          )}
          {investments.map((a, i) => (
            <InfoRow key={"inv-" + i} label={a.platform + ": " + a.holdings} value={"$" + a.balance.toLocaleString()} />
=======
      <div className="p-4 border border-border rounded-lg">
        <SectionHeader title="Personal Info" step={0} onEdit={onEditStep} />
        <InfoRow label="Name" value={personalInfo.name} />
        <InfoRow label="Age" value={String(personalInfo.age)} />
        <InfoRow label="Occupation" value={personalInfo.occupation} />
        <InfoRow label="Location" value={personalInfo.location} />
        <InfoRow label="Income" value={`$${personalInfo.annualIncome.toLocaleString()}/yr`} />
      </div>

      {brokerageAccounts.length > 0 && (
        <div className="p-4 border border-border rounded-lg">
          <SectionHeader title="Brokerage Accounts" step={1} onEdit={onEditStep} />
          {brokerageAccounts.map((a, i) => (
            <InfoRow key={i} label={`${a.provider} — ${a.accountType}`} value={`$${a.balance.toLocaleString()}`} />
          ))}
        </div>
      )}

      <div className="p-4 border border-border rounded-lg">
        <SectionHeader title="Retirement" step={2} onEdit={onEditStep} />
        {retirement.has401k ? (
          <InfoRow label={`401(k) at ${retirement.provider401k}`} value={`$${retirement.balance401k.toLocaleString()}`} />
        ) : (
          <InfoRow label="401(k)" value="None" />
        )}
        {retirement.hasRothIRA ? (
          <InfoRow label={`Roth IRA at ${retirement.providerRothIRA}`} value={`$${retirement.balanceRothIRA.toLocaleString()}`} />
        ) : (
          <InfoRow label="Roth IRA" value="None" />
        )}
      </div>

      {bankAccounts.length > 0 && (
        <div className="p-4 border border-border rounded-lg">
          <SectionHeader title="Bank Accounts" step={3} onEdit={onEditStep} />
          {bankAccounts.map((a, i) => (
            <InfoRow key={i} label={`${a.bank} ${a.accountType}`} value={`$${a.balance.toLocaleString()}`} />
          ))}
        </div>
      )}

      {investments.length > 0 && (
        <div className="p-4 border border-border rounded-lg">
          <SectionHeader title="Investments & Crypto" step={4} onEdit={onEditStep} />
          {investments.map((a, i) => (
            <InfoRow key={i} label={`${a.platform}: ${a.holdings}`} value={`$${a.balance.toLocaleString()}`} />
>>>>>>> tanvi/main
          ))}
        </div>
      )}

<<<<<<< HEAD
      {/* Debts - step 3 */}
      {debts.length > 0 && (
        <div className="p-4 border border-border rounded-lg">
          <SectionHeader title="Balances & Payments" step={3} onEdit={onEditStep} />
          {debts.map((d, i) => (
            <InfoRow key={i} label={d.type + " (" + d.provider + ") @ " + d.interestRate + "%"} value={"$" + d.remainingBalance.toLocaleString()} />
=======
      {debts.length > 0 && (
        <div className="p-4 border border-border rounded-lg">
          <SectionHeader title="Debts" step={5} onEdit={onEditStep} />
          {debts.map((d, i) => (
            <InfoRow key={i} label={`${d.type} (${d.provider}) @ ${d.interestRate}%`} value={`$${d.remainingBalance.toLocaleString()}`} />
>>>>>>> tanvi/main
          ))}
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={onBack} className="flex-1" size="lg">
          Back
        </Button>
        <Button onClick={onComplete} className="flex-1" size="lg">
<<<<<<< HEAD
          {"Let's Go!"}
=======
          Start Chatting
>>>>>>> tanvi/main
        </Button>
      </div>
    </div>
  );
}
