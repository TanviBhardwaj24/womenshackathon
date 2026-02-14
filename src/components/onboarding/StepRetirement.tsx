"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Toggle from "@/components/ui/Toggle";
import { RetirementInfo } from "@/types/profile";

interface Props {
  data: RetirementInfo;
  onChange: (data: RetirementInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepRetirement({ data, onChange, onNext, onBack }: Props) {
  const update = (field: keyof RetirementInfo, value: string | number | boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Retirement Accounts</h2>
        <p className="text-sm text-text-secondary mt-1">
          Tell us about your retirement savings.
        </p>
      </div>

      <div className="p-4 border border-border rounded-lg space-y-4">
        <Toggle
          label="I have a 401(k)"
          enabled={data.has401k}
          onChange={(v) => update("has401k", v)}
        />
        {data.has401k && (
<<<<<<< HEAD
          <div className="space-y-3 pl-2 border-l-2 ml-1" style={{ borderLeftColor: "#FFEDBD" }}>
=======
          <div className="space-y-3 pl-2 border-l-2 border-accent-light ml-1">
>>>>>>> tanvi/main
            <Input
              label="401(k) Provider"
              placeholder="e.g., Fidelity"
              value={data.provider401k}
              onChange={(e) => update("provider401k", e.target.value)}
            />
            <Input
              label="Balance ($)"
              type="number"
              placeholder="0"
              value={data.balance401k || ""}
              onChange={(e) => update("balance401k", parseInt(e.target.value) || 0)}
            />
            <Input
              label="Employer Match (%)"
              type="number"
              placeholder="4"
              value={data.employerMatch || ""}
              onChange={(e) => update("employerMatch", parseFloat(e.target.value) || 0)}
            />
          </div>
        )}
      </div>

      <div className="p-4 border border-border rounded-lg space-y-4">
        <Toggle
          label="I have a Roth IRA"
          enabled={data.hasRothIRA}
          onChange={(v) => update("hasRothIRA", v)}
        />
        {data.hasRothIRA && (
<<<<<<< HEAD
          <div className="space-y-3 pl-2 border-l-2 ml-1" style={{ borderLeftColor: "#FFEDBD" }}>
=======
          <div className="space-y-3 pl-2 border-l-2 border-accent-light ml-1">
>>>>>>> tanvi/main
            <Input
              label="Roth IRA Provider"
              placeholder="e.g., Charles Schwab"
              value={data.providerRothIRA}
              onChange={(e) => update("providerRothIRA", e.target.value)}
            />
            <Input
              label="Balance ($)"
              type="number"
              placeholder="0"
              value={data.balanceRothIRA || ""}
              onChange={(e) => update("balanceRothIRA", parseInt(e.target.value) || 0)}
            />
          </div>
        )}
      </div>

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
