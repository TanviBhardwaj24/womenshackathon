"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface Props {
  name: string;
  onChange: (name: string) => void;
  onNext: () => void;
}

export default function StepName({ name, onChange, onNext }: Props) {
  const [value, setValue] = useState(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const isValid = value.trim().length > 0;

  return (
    <div className="flex flex-col items-center text-center space-y-8">
      <div>
        <h2 className="text-2xl font-semibold font-serif text-heading">
          Welcome to empowHer
        </h2>
        <p className="text-sm text-text-secondary mt-2 leading-relaxed">
          {"Let's start by getting to know you. What should we call you?"}
        </p>
      </div>

      <div className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Your first name"
          value={value}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground text-center text-lg placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
          autoFocus
        />
      </div>

      <div className="w-full max-w-sm pt-2">
        <Button onClick={onNext} disabled={!isValid} className="w-full" size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
