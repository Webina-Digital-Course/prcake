import Link from "next/link";

export function Wordmark({
  className = "text-3xl",
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="ROLLIN — retour à l'accueil"
      className={`font-display uppercase leading-none tracking-wide ${className}`}
    >
      ROLLIN<span className="text-bakery-orange">.</span>
    </Link>
  );
}
