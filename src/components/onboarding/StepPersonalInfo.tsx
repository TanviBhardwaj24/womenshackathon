"use client";

import Input from "@/components/ui/Input";
<<<<<<< HEAD
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
=======
import Button from "@/components/ui/Button";
import { PersonalInfo } from "@/types/profile";

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  onNext: () => void;
}

export default function StepPersonalInfo({ data, onChange, onNext }: Props) {
>>>>>>> tanvi/main
  const update = (field: keyof PersonalInfo, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

<<<<<<< HEAD
  const isValid = data.age > 0 && data.annualIncome > 0 && data.location;
=======
  const isValid = data.name && data.age > 0 && data.occupation && data.location;
>>>>>>> tanvi/main

  return (
    <div className="space-y-5">
      <div>
<<<<<<< HEAD
        <h2 className="text-xl font-semibold font-serif" style={{ color: "#520404" }}>
          {"Hi " + userName}
        </h2>
        <p className="text-sm text-text-secondary mt-1 leading-relaxed">
          Tell us a bit more so we can personalize your financial guidance.
=======
        <h2 className="text-xl font-semibold text-foreground">Tell us about yourself</h2>
        <p className="text-sm text-text-secondary mt-1">
          Let&apos;s start with the basics so we can personalize your experience.
>>>>>>> tanvi/main
        </p>
      </div>

      <Input
<<<<<<< HEAD
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
=======
        label="Full Name"
        placeholder="e.g., Priya Sharma"
        value={data.name}
        onChange={(e) => update("name", e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Age"
          type="number"
          placeholder="30"
          value={data.age || ""}
          onChange={(e) => update("age", parseInt(e.target.value) || 0)}
        />
        <Input
          label="Annual Income"
          type="number"
          placeholder="180000"
          value={data.annualIncome || ""}
          onChange={(e) => update("annualIncome", parseInt(e.target.value) || 0)}
        />
      </div>

      <Input
        label="Occupation"
        placeholder="e.g., Software Engineer"
        value={data.occupation}
        onChange={(e) => update("occupation", e.target.value)}
      />

      <Input
        label="Location"
        placeholder="e.g., San Francisco, CA"
>>>>>>> tanvi/main
        value={data.location}
        onChange={(e) => update("location", e.target.value)}
      />

<<<<<<< HEAD
      <div className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={onBack} className="flex-1" size="lg">
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid} className="flex-1" size="lg">
=======
      <div className="pt-4">
        <Button onClick={onNext} disabled={!isValid} className="w-full" size="lg">
>>>>>>> tanvi/main
          Continue
        </Button>
      </div>
    </div>
  );
}
