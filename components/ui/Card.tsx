import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  const base =
    "rounded-lg border border-neutral-700 bg-neutral-800/80 p-4 shadow-sm";
  return <div className={`${base} ${className}`.trim()}>{children}</div>;
}
