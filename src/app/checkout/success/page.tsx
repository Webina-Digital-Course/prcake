import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/cart/order-confirmation";

export const metadata: Metadata = {
  title: "Commande confirmée",
  description: "Confirmation de votre commande de démonstration ROLLIN.",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <header className="mb-10">
        <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">
          Merci pour votre commande
        </p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">
          Confirmation
        </h1>
      </header>
      <OrderConfirmation />
    </div>
  );
}
