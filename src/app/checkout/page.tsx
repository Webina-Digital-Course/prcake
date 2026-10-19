import type { Metadata } from "next";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { Sparkle } from "@/components/ui/decorative";

export const metadata: Metadata = {
  title: "Commande",
  description:
    "Finalisez votre commande ROLLIN : coordonnées, livraison ou retrait en boutique (démonstration).",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <header className="relative mb-8 max-w-2xl">
        <Sparkle className="absolute -top-4 right-2 h-6 w-6 text-bakery-orange sm:right-16" />
        <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">
          Étape 3 sur 3
        </p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">
          Commander
        </h1>
        <p className="mt-5 text-base leading-relaxed text-chocolate/70">
          Renseignez vos coordonnées et choisissez entre la livraison à domicile et le
          retrait en boutique. Cette commande est une démonstration : aucun paiement réel
          n'aura lieu.
        </p>
      </header>

      <div className="mb-10 rounded-2xl border-2 border-bakery-orange/40 bg-bakery-yellow/20 px-5 py-4 text-sm font-semibold text-chocolate">
        Mode démonstration — cette simulation génère une confirmation de commande sans
        encaisser de paiement ni transmettre vos informations.
      </div>

      <CheckoutForm />
    </div>
  );
}
