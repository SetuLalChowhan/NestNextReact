"use client";

import React from "react";
import { Check } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password?: string;
  rules?: {
    hasLength: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
  };
  strengthPercent?: number;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  rules,
  strengthPercent,
}) => {
  const activeRules = rules || {
    hasLength: Boolean(password && password.length >= 8),
    hasUppercase: Boolean(password && /[A-Z]/.test(password)),
    hasNumber: Boolean(password && /[0-9]/.test(password)),
  };

  const passedCount = [
    activeRules.hasLength,
    activeRules.hasUppercase,
    activeRules.hasNumber,
  ].filter(Boolean).length;

  const activePercent =
    strengthPercent !== undefined ? strengthPercent : (passedCount / 3) * 100;
  return (
    <div className="space-y-2 p-3.5 rounded-xl bg-muted/40 border border-border/60 text-xs">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground font-medium">Password Strength</span>
        <span
          className={`font-bold ${
            activePercent === 100
              ? "text-emerald-600"
              : activePercent > 33
              ? "text-amber-600"
              : "text-red-500"
          }`}
        >
          {activePercent === 100 ? "Strong" : activePercent > 33 ? "Medium" : "Weak"}
        </span>
      </div>

      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            activePercent === 100
              ? "bg-emerald-500"
              : activePercent > 33
              ? "bg-amber-500"
              : "bg-red-500"
          }`}
          style={{ width: `${activePercent}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-muted-foreground">
        <span className={`flex items-center gap-1 ${activeRules.hasLength ? "text-emerald-600 font-semibold" : ""}`}>
          <Check className={`h-3 w-3 ${activeRules.hasLength ? "opacity-100" : "opacity-30"}`} />
          8+ chars
        </span>
        <span className={`flex items-center gap-1 ${activeRules.hasUppercase ? "text-emerald-600 font-semibold" : ""}`}>
          <Check className={`h-3 w-3 ${activeRules.hasUppercase ? "opacity-100" : "opacity-30"}`} />
          1 uppercase
        </span>
        <span className={`flex items-center gap-1 ${activeRules.hasNumber ? "text-emerald-600 font-semibold" : ""}`}>
          <Check className={`h-3 w-3 ${activeRules.hasNumber ? "opacity-100" : "opacity-30"}`} />
          1 number
        </span>
      </div>
    </div>
  );
};
