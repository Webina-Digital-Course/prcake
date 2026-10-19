import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une question, une commande spéciale, un événement ? Contactez la boulangerie artisanale ROLLIN à Marrakech.",
};

const infos = [
  {
    icon: MapPin,
    title: "Adresse",
    lines: ["12, rue des Fournils", "40000 Marrakech, Maroc"],
  },
  {
    icon: Phone,
    title: "Téléphone",
    lines: ["+212 5 22 00 00 00"],
    href: "tel:+212522000000",
  },
  {
    icon: Mail,
    title: "E-mail",
    lines: ["bonjour@rollin.ma"],
    href: "mailto:bonjour@rollin.ma",
  },
  {
    icon: Clock,
    title: "Horaires",
    lines: ["Mardi – Dimanche : 7 h 30 – 19 h 30", "Lundi : fermé"],
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <header className="mb-12 max-w-2xl">
        <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">
          Contact
        </p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">
          Écrivez-nous
        </h1>
        <p className="mt-5 text-base leading-relaxed text-chocolate/70">
          Commande pour un mariage, une question allergie, un compliment (ou une critique
          constructive) : nous lisons tout, et nous répondons sous 48 h ouvrées.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="rounded-[1.75rem] border border-chocolate/10 bg-white/60 p-6 sm:p-8">
          <h2 className="font-display text-2xl uppercase">Formulaire</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {infos.map(({ icon: Icon, title, lines, href }) => (
            <div key={title} className="rounded-[1.5rem] bg-cream-deep p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bakery-yellow text-chocolate">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 className="font-display text-lg uppercase">{title}</h2>
              </div>
              <ul className="mt-4 space-y-1 text-sm text-chocolate/75">
                {lines.map((line) => (
                  <li key={line}>
                    {href ? (
                      <a href={href} className="font-semibold underline-offset-4 hover:underline">
                        {line}
                      </a>
                    ) : (
                      line
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="rounded-[1.5rem] bg-chocolate p-6 text-cream">
            <h2 className="font-display text-lg uppercase text-bakery-yellow">
              Commandes spéciales
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/75">
              Pour un gâteau d'anniversaire, une pièce montée ou un plateau de réception,
              comptez 72 h de préminimum. Mentionnez la date et le nombre de convives dans
              votre message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
