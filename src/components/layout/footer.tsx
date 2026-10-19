import { Camera, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Wordmark } from "@/components/layout/wordmark";

// Evaluated once at build/startup so prerendering stays deterministic.
const COPYRIGHT_YEAR = new Date().getFullYear();

const shopLinks = [
  { label: "Toute la boutique", href: "/shop" },
  { label: "Gâteaux", href: "/category/cakes" },
  { label: "Pains", href: "/category/bread" },
  { label: "Biscuits", href: "/category/cookies" },
  { label: "Bagels", href: "/category/bagels" },
  { label: "Viennoiseries", href: "/category/pastries" },
];

const houseLinks = [
  { label: "Notre histoire", href: "/about" },
  { label: "Questions fréquentes", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Panier", href: "/cart" },
];

export function Footer() {
  return (
    <footer className="bg-chocolate text-cream">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Wordmark className="text-4xl text-cream" />
            <p className="mt-4 text-sm leading-relaxed text-cream/75">
              Boulangerie artisanale. Pains au levain, viennoiseries pur beurre et pâtisseries
              façonnés à la main, chaque matin, à partir de zéro.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (lien de démonstration)"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition-colors hover:bg-cream hover:text-chocolate"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook (lien de démonstration)"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition-colors hover:bg-cream hover:text-chocolate"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Boutique">
            <h2 className="font-display text-lg uppercase tracking-wide text-bakery-yellow">
              Boutique
            </h2>
            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/75 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="La maison">
            <h2 className="font-display text-lg uppercase tracking-wide text-bakery-yellow">
              La maison
            </h2>
            <ul className="mt-4 space-y-2.5">
              {houseLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/75 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-lg uppercase tracking-wide text-bakery-yellow">
              Nous trouver
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-cream/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bakery-orange" aria-hidden="true" />
                <span>
                  12, rue des Fournils
                  <br />
                  40000 Marrakech
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-bakery-orange" aria-hidden="true" />
                <a href="tel:+212522000000" className="transition-colors hover:text-cream">
                  +212 5 22 00 00 00
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-bakery-orange" aria-hidden="true" />
                <a href="mailto:bonjour@rollin.ma" className="transition-colors hover:text-cream">
                  bonjour@rollin.ma
                </a>
              </li>
              <li className="pt-1 text-cream/60">
                Mar – Dim : 7 h 30 – 19 h 30
                <br />
                Lundi : fermé
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {COPYRIGHT_YEAR} ROLLIN — Tous droits réservés. Site de démonstration.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-cream">
              Confidentialité
            </Link>
            <Link href="/terms" className="transition-colors hover:text-cream">
              Conditions générales
            </Link>
            <Link href="/contact" className="transition-colors hover:text-cream">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
