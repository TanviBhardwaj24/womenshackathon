"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}
      <input
<<<<<<< HEAD
        className={`w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${
          error ? "border-red-400 focus:ring-red-400" : ""
        } ${className}`}
        style={{ "--tw-ring-color": "rgba(82, 4, 4, 0.3)" } as React.CSSProperties}
=======
        className={`w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow ${
          error ? "border-red-400 focus:ring-red-400" : ""
        } ${className}`}
>>>>>>> tanvi/main
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
