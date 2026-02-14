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
<<<<<<< HEAD
  const base = "inline-flex items-center justify-center font-semibold rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    primary: "text-white",
    secondary: "border border-border text-foreground",
    ghost: "text-foreground",
  };

  const hoverBg = variant !== "primary" ? "#FFEDBD" : undefined;

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const baseStyle = variant === "primary" ? { backgroundColor: "#520404" } : undefined;

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={baseStyle}
      onMouseEnter={(e) => {
        if (hoverBg) e.currentTarget.style.backgroundColor = hoverBg;
        if (variant === "primary") e.currentTarget.style.backgroundColor = "#3A0202";
      }}
      onMouseLeave={(e) => {
        if (hoverBg) e.currentTarget.style.backgroundColor = "";
        if (variant === "primary") e.currentTarget.style.backgroundColor = "#520404";
      }}
=======
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-accent hover:bg-accent-dark text-white",
    secondary: "border border-border hover:bg-accent-light text-foreground",
    ghost: "hover:bg-accent-light text-foreground",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
>>>>>>> tanvi/main
      {...props}
    >
      {children}
    </button>
  );
}
