import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

export default function Textarea({ className = "", ...props }: TextareaProps) {
  const base =
    "w-full min-h-[6rem] rounded-lg border border-neutral-600 bg-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 resize-y";
  return (
    <textarea
      className={`${base} ${className}`.trim()}
      {...props}
    />
  );
}
