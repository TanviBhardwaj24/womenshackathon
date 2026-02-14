"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { BrokerageAccount } from "@/types/profile";

const PROVIDERS = [
  { value: "Fidelity", label: "Fidelity" },
  { value: "Charles Schwab", label: "Charles Schwab" },
  { value: "Vanguard", label: "Vanguard" },
  { value: "TD Ameritrade", label: "TD Ameritrade" },
  { value: "E-Trade", label: "E-Trade" },
  { value: "Robinhood", label: "Robinhood" },
  { value: "Other", label: "Other" },
];

const ACCOUNT_TYPES = [
  { value: "Individual Brokerage", label: "Individual Brokerage" },
  { value: "Joint Brokerage", label: "Joint Brokerage" },
  { value: "Margin Account", label: "Margin Account" },
];

interface Props {
  data: BrokerageAccount[];
  onChange: (data: BrokerageAccount[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepBrokerageAccounts({ data, onChange, onNext, onBack }: Props) {
  const addAccount = () => {
    onChange([...data, { provider: "", accountType: "", balance: 0 }]);
  };

  const removeAccount = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateAccount = (index: number, field: keyof BrokerageAccount, value: string | number) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Brokerage Accounts</h2>
        <p className="text-sm text-text-secondary mt-1">
          Add any brokerage or trading accounts you have.
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
            label="Provider"
            options={PROVIDERS}
            value={account.provider}
            onChange={(e) => updateAccount(i, "provider", e.target.value)}
          />
          <Select
            label="Account Type"
            options={ACCOUNT_TYPES}
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
<<<<<<< HEAD
        className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-text-secondary transition-colors"
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#520404"; e.currentTarget.style.color = "#520404"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = ""; }}
=======
        className="w-full py-3 border-2 border-dashed border-border rounded-lg text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
>>>>>>> tanvi/main
      >
        + Add Brokerage Account
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
