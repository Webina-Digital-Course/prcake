import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Livraison, allergènes, conservation, commandes spéciales : toutes les réponses aux questions fréquentes sur ROLLIN.",
};

const faqs = [
  {
    question: "Quels sont vos horaires de livraison ?",
    answer:
      "Nous livrons du mardi au dimanche, entre 9 h et 18 h, sur Marrakech et ses environs immédiats. Le retrait en boutique est possible pendant toute ouverture du fournil. Les créneaux sont confirmés par téléphone après la commande.",
  },
  {
    question: "Comment conserver mon pain et mes viennoiseries ?",
    answer:
      "Le pain se conserve dans un torchon propre ou une paperine, à température ambiante, et se rafraîchit 5 minutes au four. Les viennoiseries sont à déguster le jour même — un passage de 3 minutes à 160 °C leur rend tout leur croustillant.",
  },
  {
    question: "Proposez-vous des options sans gluten ?",
    answer:
      "Oui : cookies sans gluten, cheesecake et macarons sont préparés dans un espace dédié. Nous indiquons systématiquement les allergènes sur chaque fiche produit. En cas d'allergie sévère, contactez-nous avant de commander.",
  },
  {
    question: "Puis-je commander un gâteau personnalisé ?",
    answer:
      "Absolument. Comptez 72 h de délai minimum pour un gâteau d'anniversaire et une semaine pour une pièce montée. Utilisez le formulaire de contact en précisant la date, le nombre de convives et vos envies.",
  },
  {
    question: "Le paiement en ligne est-il sécurisé ?",
    answer:
      "Ce site est une démonstration : le parcours de commande simule une confirmation sans encaisser aucun paiement et sans transmettre de données. Dans une version de production, le paiement serait traité par un prestataire certifié (par exemple Stripe) côté serveur.",
  },
  {
    question: "Où trouver vos farines et votre levain ?",
    answer:
      "Nos farines viennent de moulins français et marocains sélectionnés pour leur qualité. Notre levain, lui, n'a jamais quitté le fournil : il est nourri deux fois par jour depuis l'ouverture, il a donc un nom (Bernard).",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 pb-24 pt-12 sm:px-6">
      <header className="mb-12">
        <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">
          Aide
        </p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">
          Questions fréquentes
        </h1>
        <p className="mt-5 text-base leading-relaxed text-chocolate/70">
          Tout ce qu'on nous demande souvent, réuni au même endroit. Une question reste en
          suspens ? Écrivez-nous.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => (
          <details
            key={faq.question}
            className="group rounded-[1.25rem] border border-chocolate/10 bg-white/60 px-6 py-5 open:border-chocolate/25"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg uppercase leading-tight [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bakery-yellow text-chocolate transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 text-sm leading-relaxed text-chocolate/75">
              <span className="sr-only">Réponse {index + 1} : </span>
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-14 rounded-[1.75rem] bg-chocolate px-8 py-10 text-center text-cream">
        <h2 className="font-display text-3xl uppercase">Une autre question ?</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/70">
          Notre équipe vous répond sous 48 h ouvrées, du mardi au dimanche.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="yellow">
            Nous contacter
          </Button>
          <Button href="/shop" variant="cream">
            Voir la boutique
          </Button>
        </div>
      </div>
    </div>
  );
}
