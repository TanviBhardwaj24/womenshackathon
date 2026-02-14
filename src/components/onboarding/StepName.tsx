"use client";

import { useState } from "react";

interface Props {
  name: string;
  onChange: (name: string) => void;
  onNext: () => void;
}

export default function StepName({ name, onChange, onNext }: Props) {
  const parts = name.split(" ");
  const [firstName, setFirstName] = useState(parts[0] || "");
  const [lastName, setLastName] = useState(parts.slice(1).join(" ") || "");

  const handleFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    onChange((e.target.value + " " + lastName).trim());
  };

  const handleLast = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    onChange((firstName + " " + e.target.value).trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && firstName.trim().length > 0 && lastName.trim().length > 0) {
      onNext();
    }
  };

  const isValid = firstName.trim().length > 0 && lastName.trim().length > 0;

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ backgroundColor: "#520404", zIndex: 50 }}
    >
      {/* Logo at top */}
      <div className="flex justify-center pt-14">
        <img
          src="/images/logo_empowHer.png"
          alt="empowHer"
          className="h-8 brightness-0 invert"
        />
      </div>

      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <h2
          className="text-3xl font-serif leading-snug text-center mb-14"
          style={{ color: "#FFEDBD" }}
        >
          Hey,
          <br />
          tell us your name
        </h2>

        <div className="w-full max-w-xs flex flex-col gap-8">
          {/* First name */}
          <div>
            <label
              className="block text-xs font-medium tracking-wide uppercase mb-2"
              style={{ color: "rgba(255, 237, 189, 0.6)" }}
            >
              First name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={handleFirst}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full bg-transparent border-0 border-b pb-2 text-lg focus:outline-none focus:ring-0"
              style={{
                color: "#FFEDBD",
                borderBottomColor: "rgba(255, 237, 189, 0.35)",
                caretColor: "#FFEDBD",
              }}
            />
          </div>

          {/* Last name */}
          <div>
            <label
              className="block text-xs font-medium tracking-wide uppercase mb-2"
              style={{ color: "rgba(255, 237, 189, 0.6)" }}
            >
              Last name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={handleLast}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-0 border-b pb-2 text-lg focus:outline-none focus:ring-0"
              style={{
                color: "#FFEDBD",
                borderBottomColor: "rgba(255, 237, 189, 0.35)",
                caretColor: "#FFEDBD",
              }}
            />
          </div>
        </div>
      </div>

      {/* Next button pinned to bottom */}
      <div className="px-8 pb-12">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="w-full max-w-xs mx-auto block py-4 rounded-full text-base font-semibold transition-opacity disabled:opacity-40"
          style={{
            backgroundColor: "#FFEDBD",
            color: "#520404",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
