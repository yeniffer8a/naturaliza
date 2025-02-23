import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors";
  const variantStyles = variant === "primary" ? "btn-primary" : "btn-secondary";

  const combinedClassName = `${baseStyles} ${variantStyles} ${className}`;

  if (href) {
    return (
      <Link to={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
