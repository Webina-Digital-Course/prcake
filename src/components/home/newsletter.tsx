import { NewsletterForm } from "@/components/forms/newsletter-form";
import { WheatOutline } from "@/components/ui/decorative";

export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="px-4 pt-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden rounded-[2rem] bg-chocolate px-6 py-14 sm:px-12 lg:px-16 lg:py-16">
          <WheatOutline className="absolute -right-6 -top-10 h-72 w-44 rotate-[18deg] text-cream/10" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-yellow">
                Newsletter
              </p>
              <h2
                id="newsletter-title"
                className="mt-4 font-display text-4xl uppercase leading-[0.95] text-cream sm:text-5xl"
              >
                Restez gourmands,<br />
                recevez −15 %
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-cream/70">
                Les fournées de la semaine, les nouveautés de saison et un code de
                bienvenue de −15 % sur votre première commande dès 100 DH.
              </p>
            </div>
            <div>
              <NewsletterForm />
              <p className="mt-4 text-xs text-cream/45">
                Formulaire de démonstration : aucune donnée n'est stockée ni transmise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
