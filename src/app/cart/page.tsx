import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Panier",
  description: "Consultez et ajustez les articles de votre panier ROLLIN.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <header className="mb-10">
        <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">
          Étape 1 sur 3
        </p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">
          Votre panier
        </h1>
      </header>
      <CartView />
    </div>
  );
}
