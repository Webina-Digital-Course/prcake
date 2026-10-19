import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "left" && "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-display text-sm uppercase tracking-[0.2em] text-bakery-orange">
          {eyebrow}
        </p>
      ) : null}
      <div className={cn("flex w-full flex-col gap-4", align === "left" && "sm:flex-row sm:items-end sm:justify-between")}>
        <h2 className="max-w-3xl text-4xl uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {action}
      </div>
      {description ? (
        <p className={cn("max-w-2xl text-base leading-relaxed text-chocolate/70", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
