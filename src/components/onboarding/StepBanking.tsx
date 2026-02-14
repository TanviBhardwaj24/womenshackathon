"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { BankAccount } from "@/types/profile";

const BANKS = [
  { value: "Chase", label: "Chase" },
  { value: "Bank of America", label: "Bank of America" },
  { value: "Wells Fargo", label: "Wells Fargo" },
  { value: "Citibank", label: "Citibank" },
  { value: "Capital One", label: "Capital One" },
  { value: "Ally Bank", label: "Ally Bank" },
  { value: "Marcus by Goldman Sachs", label: "Marcus by Goldman Sachs" },
  { value: "Other", label: "Other" },
];

interface Props {
  data: BankAccount[];
  onChange: (data: BankAccount[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepBanking({ data, onChange, onNext, onBack }: Props) {
  const addAccount = () => {
    onChange([...data, { bank: "", accountType: "checking", balance: 0 }]);
  };

  const removeAccount = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateAccount = (index: number, field: keyof BankAccount, value: string | number) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value } as BankAccount;
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Bank Accounts</h2>
        <p className="text-sm text-text-secondary mt-1">
          Add your checking and savings accounts.
        </p>
      </div>

      {data.map((account, i) => (
        <div key={i} className="p-4 border border-border rounded-lg space-y-3 relative">
          <button
            onClick={() => removeAccount(i)}
            className="absolute top-3 right-3 text-text-secondary hover:text-red-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Select
            label="Bank"
            options={BANKS}
            value={account.bank}
            onChange={(e) => updateAccount(i, "bank", e.target.value)}
          />
          <Select
            label="Account Type"
            options={[
              { value: "checking", label: "Checking" },
              { value: "savings", label: "Savings" },
            ]}
            value={account.accountType}
            onChange={(e) => updateAccount(i, "accountType", e.target.value)}
          />
          <Input
            label="Balance ($)"
            type="number"
            placeholder="0"
            value={account.balance || ""}
            onChange={(e) => updateAccount(i, "balance", parseInt(e.target.value) || 0)}
          />
        </div>
      ))}

      <button
        onClick={addAccount}
        className="w-full py-3 border-2 border-dashed border-border rounded-lg text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
      >
        + Add Bank Account
      </button>

      <div className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={onBack} className="flex-1" size="lg">
          Back
        </Button>
        <Button onClick={onNext} className="flex-1" size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
