import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export default function Input({ className = "", ...props }: InputProps) {
  const base =
    "w-full rounded-lg border border-neutral-600 bg-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500";
  return (
    <input
      className={`${base} ${className}`.trim()}
      {...props}
    />
  );
}
