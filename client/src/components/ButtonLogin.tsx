import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function ButtonLogin({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClassName = "px-6 py-3 rounded-md transition-opacity";
  const variantClassName =
    variant === "primary"
      ? "bg-primary text-background"
      : "bg-secondary text-primary";

  return (
    <button
      className={`${baseClassName} ${variantClassName} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
