"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { PersonalInfo } from "@/types/profile";

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  onNext: () => void;
}

export default function StepPersonalInfo({ data, onChange, onNext }: Props) {
  const update = (field: keyof PersonalInfo, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  const isValid = data.name && data.age > 0 && data.occupation && data.location;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Tell us about yourself</h2>
        <p className="text-sm text-text-secondary mt-1">
          Let&apos;s start with the basics so we can personalize your experience.
        </p>
      </div>

      <Input
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
        value={data.location}
        onChange={(e) => update("location", e.target.value)}
      />

      <div className="pt-4">
        <Button onClick={onNext} disabled={!isValid} className="w-full" size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
