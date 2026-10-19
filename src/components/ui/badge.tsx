import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "orange" | "turquoise" | "purple" | "yellow";

const tones: Record<Tone, string> = {
  default: "bg-cream-deep text-chocolate",
  orange: "bg-bakery-orange/25 text-chocolate",
  turquoise: "bg-turquoise text-chocolate",
  purple: "bg-promo/15 text-promo",
  yellow: "bg-bakery-yellow text-chocolate",
};

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function DietaryTags({ tags, className }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Labels alimentaires">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-chocolate/15 bg-cream px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-chocolate/70"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
