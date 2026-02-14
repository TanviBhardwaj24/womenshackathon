"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { InvestmentAccount } from "@/types/profile";

const PLATFORMS = [
  { value: "Coinbase", label: "Coinbase" },
  { value: "Binance", label: "Binance" },
  { value: "Kraken", label: "Kraken" },
  { value: "Gemini", label: "Gemini" },
  { value: "Wealthfront", label: "Wealthfront" },
  { value: "Betterment", label: "Betterment" },
  { value: "Other", label: "Other" },
];

interface Props {
  data: InvestmentAccount[];
  onChange: (data: InvestmentAccount[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepInvestments({ data, onChange, onNext, onBack }: Props) {
  const addAccount = () => {
    onChange([...data, { platform: "", holdings: "", balance: 0 }]);
  };

  const removeAccount = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateAccount = (index: number, field: keyof InvestmentAccount, value: string | number) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Investments & Crypto</h2>
        <p className="text-sm text-text-secondary mt-1">
          Add any other investment or cryptocurrency accounts.
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
            label="Platform"
            options={PLATFORMS}
            value={account.platform}
            onChange={(e) => updateAccount(i, "platform", e.target.value)}
          />
          <Input
            label="Holdings"
            placeholder="e.g., ETH (~$2,000), BTC (~$1,000)"
            value={account.holdings}
            onChange={(e) => updateAccount(i, "holdings", e.target.value)}
          />
          <Input
            label="Total Value ($)"
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
        + Add Investment Account
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
