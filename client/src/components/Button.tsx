import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  href,
  children,
  ...props
}: ButtonProps) {
  const className = variant === "primary" ? "btn-primary" : "btn-secondary";

  if (href) {
    return (
      <Link to={href} className="{className}">
        {children}
      </Link>
    );
  }
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
