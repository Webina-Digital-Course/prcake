import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Politique de confidentialité du site de démonstration ROLLIN.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[820px] px-4 pb-24 pt-12 sm:px-6">
      <header className="mb-10">
        <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">
          Mentions légales
        </p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">
          Confidentialité
        </h1>
      </header>

      <div className="space-y-6 text-sm leading-relaxed text-chocolate/75">
        <p className="rounded-2xl border-2 border-bakery-orange/40 bg-bakery-yellow/20 px-5 py-4 font-semibold text-chocolate">
          Document de démonstration — ce site ne constitue pas un service commercial réel.
        </p>

        <section>
          <h2 className="font-display text-2xl uppercase text-chocolate">1. Données collectées</h2>
          <p className="mt-2">
            Ce site de démonstration ne transmet aucune donnée à un serveur. Les
            informations saisies dans les formulaires (commande, contact, newsletter)
            restent dans votre navigateur et servent uniquement à illustrer le parcours
            utilisateur.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl uppercase text-chocolate">2. Stockage local</h2>
          <p className="mt-2">
            Le panier et la dernière commande de démonstration sont conservés dans le
            stockage local (`localStorage`) et la session (`sessionStorage`) de votre
            navigateur. Vous pouvez les effacer à tout moment depuis les réglages de ce
            dernier.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl uppercase text-chocolate">3. Paiement</h2>
          <p className="mt-2">
            Aucune donnée bancaire n'est collectée, ni affichée, ni enregistrée. Le
            parcours de commande simule une confirmation sans intervention d'un prestataire
            de paiement.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl uppercase text-chocolate">4. Cookies et mesure d'audience</h2>
          <p className="mt-2">
            Aucun cookie publicitaire ni outil de mesure d'audience n'est intégré pour le
            moment. Une version de production devra décrire ici ses éventuels services
            tiers et obtenir le consentement requis.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl uppercase text-chocolate">5. Vos droits</h2>
          <p className="mt-2">
            Dans un contexte réel, vous disposez d'un droit d'accès, de rectification et de
            suppression de vos données. Contactez-nous via la page Contact pour toute
            demande.
          </p>
        </section>
      </div>
    </div>
  );
}
