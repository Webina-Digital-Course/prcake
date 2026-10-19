import { cn } from "@/lib/utils";

/** Outlined wheat stalk used as a decorative flourish. */
export function WheatOutline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 320"
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M100 310 V 70"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M100 90 C 70 78 58 52 62 26 C 90 32 104 58 100 90 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M100 90 C 130 78 142 52 138 26 C 110 32 96 58 100 90 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M100 150 C 70 138 58 112 62 86 C 90 92 104 118 100 150 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M100 150 C 130 138 142 112 138 86 C 110 92 96 118 100 150 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M100 210 C 70 198 58 172 62 146 C 90 152 104 178 100 210 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M100 210 C 130 198 142 172 138 146 C 110 152 96 178 100 210 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M100 268 C 70 256 58 230 62 204 C 90 210 104 236 100 268 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M100 268 C 130 256 142 230 138 204 C 110 210 96 236 100 268 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small orange squiggle flourish. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" fill="none" aria-hidden="true" className={cn("pointer-events-none", className)}>
      <path
        d="M4 28 C 20 4, 36 4, 52 20 S 84 36, 116 12"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Little outlined cookie with a bite taken out. */
export function CookieDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" className={cn("pointer-events-none", className)}>
      <path
        d="M48 6 a 42 42 0 1 0 42 42 c -8 2 -14 -4 -12 -12 c 2 -8 -6 -14 -12 -8 c -8 2 -14 -8 -6 -14 c 6 -4 4 -12 -4 -12 A 42 42 0 0 0 48 6 Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="36" cy="40" r="5" fill="currentColor" />
      <circle cx="56" cy="58" r="5" fill="currentColor" />
      <circle cx="34" cy="64" r="4" fill="currentColor" />
    </svg>
  );
}

/** Playful circular stamp badge. */
export function RoundBadge({
  top,
  bottom,
  className,
}: {
  top: string;
  bottom: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-full border-2 border-chocolate bg-bakery-yellow text-center text-chocolate shadow-[3px_4px_0_0_rgba(53,31,29,0.9)]",
        className,
      )}
    >
      <span className="font-display text-lg uppercase leading-none">{top}</span>
      <span className="mt-1 max-w-[80%] text-[10px] font-bold uppercase leading-tight tracking-wide">
        {bottom}
      </span>
    </div>
  );
}

/** Orange star / sparkle ornament. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={cn("pointer-events-none", className)}>
      <path
        d="M20 2 C 22 12, 28 18, 38 20 C 28 22, 22 28, 20 38 C 18 28, 12 22, 2 20 C 12 18, 18 12, 20 2 Z"
        fill="currentColor"
      />
    </svg>
  );
}
