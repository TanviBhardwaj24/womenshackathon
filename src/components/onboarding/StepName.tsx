"use client";

import { useState } from "react";

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim().length > 0) {
      onNext();
    }
  };

  const isValid = value.trim().length > 0;

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ backgroundColor: "#520404", zIndex: 50 }}
    >
      {/* Logo at top */}
      <div className="flex justify-center pt-12 pb-6">
        <img
          src="/images/logo_empowHer.png"
          alt="empowHer"
          className="h-8 brightness-0 invert"
        />
      </div>

      {/* Spacer to push content down */}
      <div className="flex-1" />

      {/* Content area */}
      <div className="px-8 pb-8">
        <h2
          className="text-3xl font-serif leading-snug"
          style={{ color: "#FFEDBD" }}
        >
          Hey,
          <br />
          tell us your name
        </h2>

        {/* Underline-only input */}
        <div className="mt-16">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder=""
            autoFocus
            className="w-full bg-transparent border-0 border-b pb-3 text-lg focus:outline-none focus:ring-0 placeholder:text-transparent"
            style={{
              color: "#FFEDBD",
              borderBottomColor: "rgba(255, 237, 189, 0.4)",
              caretColor: "#FFEDBD",
            }}
          />
        </div>

        {/* Next button */}
        <div className="mt-16 pb-6">
          <button
            onClick={onNext}
            disabled={!isValid}
            className="w-full py-4 rounded-full text-base font-semibold transition-opacity disabled:opacity-40"
            style={{
              backgroundColor: "#FFEDBD",
              color: "#520404",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
