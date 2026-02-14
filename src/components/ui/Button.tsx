"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-semibold rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    primary: "text-white",
    secondary: "border border-border hover:bg-accent-light text-foreground",
    ghost: "hover:bg-accent-light text-foreground",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const primaryStyle = variant === "primary" ? { backgroundColor: "#520404" } : undefined;

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={primaryStyle}
      {...props}
    >
      {children}
    </button>
  );
}
