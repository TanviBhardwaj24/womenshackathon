"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { PersonalInfo } from "@/types/profile";

const COUNTRIES = [
  { value: "United States", label: "United States" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "India", label: "India" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Brazil", label: "Brazil" },
  { value: "Japan", label: "Japan" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "South Africa", label: "South Africa" },
  { value: "Mexico", label: "Mexico" },
  { value: "Philippines", label: "Philippines" },
  { value: "Singapore", label: "Singapore" },
  { value: "Kenya", label: "Kenya" },
  { value: "Ghana", label: "Ghana" },
  { value: "Other", label: "Other" },
];

interface Props {
  data: PersonalInfo;
  userName: string;
  onChange: (data: PersonalInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepPersonalInfo({ data, userName, onChange, onNext, onBack }: Props) {
  const update = (field: keyof PersonalInfo, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  const isValid = data.age > 0 && data.annualIncome > 0 && data.location;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold font-serif text-heading">
          {"Nice to meet you, " + userName + "!"}
        </h2>
        <p className="text-sm text-text-secondary mt-1 leading-relaxed">
          Tell us a bit more so we can personalize your financial guidance.
        </p>
      </div>

      <Input
        label="Age"
        type="number"
        placeholder="e.g., 30"
        value={data.age || ""}
        onChange={(e) => update("age", parseInt(e.target.value) || 0)}
      />

      <Input
        label="Annual Income ($)"
        type="number"
        placeholder="e.g., 75000"
        value={data.annualIncome || ""}
        onChange={(e) => update("annualIncome", parseInt(e.target.value) || 0)}
      />

      <Select
        label="Country"
        options={COUNTRIES}
        value={data.location}
        onChange={(e) => update("location", e.target.value)}
      />

      <div className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={onBack} className="flex-1" size="lg">
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid} className="flex-1" size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
