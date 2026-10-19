"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  label = "Quantité",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border-2 border-chocolate/15 bg-cream p-1",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min - 1, value - 1))}
        disabled={value <= min}
        aria-label={`Diminuer la quantité de ${label}`}
        className="flex h-9 w-9 items-center justify-center rounded-full text-chocolate transition-colors hover:bg-chocolate/10 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span
        className="min-w-8 text-center font-display text-lg tabular-nums"
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Augmenter la quantité de ${label}`}
        className="flex h-9 w-9 items-center justify-center rounded-full text-chocolate transition-colors hover:bg-chocolate/10 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
