import React from "react";

type MessageAlertProps = {
  children: React.ReactNode;
  variant: "success" | "error";
  className?: string;
};

const variantClasses = {
  success:
    "bg-yellow-500/20 text-yellow-300 border-yellow-500/50",
  error:
    "bg-red-900/30 text-red-300 border-red-500/50",
};

export default function MessageAlert({
  children,
  variant,
  className = "",
}: MessageAlertProps) {
  const base =
    "rounded-lg border px-3 py-2 text-sm";
  return (
    <div
      className={`${base} ${variantClasses[variant]} ${className}`.trim()}
      role="alert"
    >
      {children}
    </div>
  );
}
