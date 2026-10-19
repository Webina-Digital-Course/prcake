import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales",
  description: "Conditions générales d'utilisation et de vente du site de démonstration ROLLIN.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[820px] px-4 pb-24 pt-12 sm:px-6">
      <header className="mb-10">
        <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">
          Mentions légales
        </p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">
          Conditions générales
        </h1>
      </header>

      <div className="space-y-6 text-sm leading-relaxed text-chocolate/75">
        <p className="rounded-2xl border-2 border-bakery-orange/40 bg-bakery-yellow/20 px-5 py-4 font-semibold text-chocolate">
          Document de démonstration — aucun contrat de vente n'est conclu via ce site.
        </p>

        <section>
          <h2 className="font-display text-2xl uppercase text-chocolate">1. Objet</h2>
          <p className="mt-2">
            Les présentes conditions encadrent l'utilisation du site de démonstration
            ROLLIN, vitrine d'une boulangerie artisanale fictive. Le parcours de commande
            est simulé : aucune commande ferme, aucun paiement, aucune livraison.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl uppercase text-chocolate">2. Prix et disponibilité</h2>
          <p className="mt-2">
            Les prix sont affichés en dirhams marocains (DH) toutes taxes comprises et
            servent uniquement d'exemple. La disponibilité des produits est simulée à
            partir d'un catalogue de démonstration.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl uppercase text-chocolate">3. Commande</h2>
          <p className="mt-2">
            Valider le formulaire de commande génère une confirmation de démonstration,
            affichée sur l'écran de confirmation et conservée temporairement dans la
            session du navigateur. Cette confirmation ne vaut ni contrat, ni preuve de
            paiement.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl uppercase text-chocolate">4. Livraison et retrait</h2>
          <p className="mt-2">
            Les modes de livraison (25 DH, offerte dès 150 DH) et de retrait en boutique
            sont présentés à titre d'exemple de UX. Aucun service de livraison n'est
            assuré.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl uppercase text-chocolate">5. Propriété intellectuelle</h2>
          <p className="mt-2">
            Le nom ROLLIN, les textes et les illustrations de démonstration sont la
            propriété de leurs respectifs auteurs. Toute reproduction réelle est interdite
            sans autorisation.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl uppercase text-chocolate">6. Contact</h2>
          <p className="mt-2">
            Pour toute question relative à ce site de démonstration, utilisez la page
            Contact du site.
          </p>
        </section>
      </div>
    </div>
  );
}
