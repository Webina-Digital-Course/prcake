import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "yellow" | "brown" | "outline" | "cream" | "orange";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  yellow:
    "bg-bakery-yellow text-chocolate hover:bg-[#ffef6b] border-chocolate/10 shadow-[0_2px_0_0_rgba(53,31,29,0.25)]",
  brown: "bg-chocolate text-cream hover:bg-chocolate-soft",
  orange: "bg-bakery-orange text-chocolate hover:bg-[#ff9463]",
  cream: "bg-cream text-chocolate hover:bg-white",
  outline:
    "border-2 border-chocolate text-chocolate hover:bg-chocolate hover:text-cream bg-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-display uppercase tracking-wide leading-none transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type LinkProps = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    keyof CommonProps | "href"
  >;

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "yellow", size = "md", className, children, ...rest } = props;
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (props.href !== undefined) {
    const { href, ...linkRest } = rest as LinkProps & { href: string };
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
