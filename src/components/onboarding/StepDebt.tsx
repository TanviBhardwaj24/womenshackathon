"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { DebtItem } from "@/types/profile";

const DEBT_TYPES = [
  { value: "Student Loan", label: "Student Loan" },
  { value: "Credit Card", label: "Credit Card" },
  { value: "Car Loan", label: "Car Loan" },
  { value: "Mortgage", label: "Mortgage" },
  { value: "Personal Loan", label: "Personal Loan" },
  { value: "Other", label: "Other" },
];

interface Props {
  data: DebtItem[];
  onChange: (data: DebtItem[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepDebt({ data, onChange, onNext, onBack }: Props) {
  const addDebt = () => {
    onChange([...data, { type: "", provider: "", remainingBalance: 0, interestRate: 0 }]);
  };

  const removeDebt = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateDebt = (index: number, field: keyof DebtItem, value: string | number) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold font-serif text-heading">{"What You're Working Through"}</h2>
        <p className="text-sm text-text-secondary mt-1 leading-relaxed">
          {"No judgment here -- knowing your balances helps us build a plan that actually works for you."}
        </p>
      </div>

      {data.map((debt, i) => (
        <div key={i} className="p-4 border border-border rounded-lg space-y-3 relative">
          <button
            onClick={() => removeDebt(i)}
            className="absolute top-3 right-3 text-text-secondary hover:text-red-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Select
            label="Debt Type"
            options={DEBT_TYPES}
            value={debt.type}
            onChange={(e) => updateDebt(i, "type", e.target.value)}
          />
          <Input
            label="Lender / Provider"
            placeholder="e.g., Nelnet"
            value={debt.provider}
            onChange={(e) => updateDebt(i, "provider", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Remaining ($)"
              type="number"
              placeholder="0"
              value={debt.remainingBalance || ""}
              onChange={(e) => updateDebt(i, "remainingBalance", parseInt(e.target.value) || 0)}
            />
            <Input
              label="Interest Rate (%)"
              type="number"
              step="0.1"
              placeholder="4.5"
              value={debt.interestRate || ""}
              onChange={(e) => updateDebt(i, "interestRate", parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      ))}

      <button
        onClick={addDebt}
        className="w-full py-3 border-2 border-dashed border-border rounded-lg text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
      >
        + Add Debt
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
