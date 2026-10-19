"use client";

import { Loader2, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { computeShippingFee } from "@/lib/payment";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";

export function CartView() {
  const { lines, hydrated, setQuantity, removeLine, itemCount, subtotal } = useCart();

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-[1.75rem] border border-chocolate/10 bg-white/60 px-6 py-24 text-chocolate/60">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        Chargement du panier…
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-[1.75rem] border border-dashed border-chocolate/25 px-6 py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-chocolate/35" aria-hidden="true" />
        <h2 className="font-display text-3xl uppercase">Votre panier est vide</h2>
        <p className="max-w-md text-sm leading-relaxed text-chocolate/60">
          Il est temps de le remplir de bonnes choses : viennoiseries du matin, pain au
          levain ou gâteau de fête.
        </p>
        <Button href="/shop" size="lg">
          Découvrir la boutique
        </Button>
      </div>
    );
  }

  const shippingFee = computeShippingFee(subtotal, "delivery");

  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
      <div>
        <ul className="flex flex-col divide-y divide-chocolate/10 border-y border-chocolate/10">
          {lines.map((line) => (
            <li key={line.key} className="flex gap-4 py-6 sm:gap-6">
              <Link
                href={`/shop/${line.slug}`}
                className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-chocolate/10 bg-white sm:h-28 sm:w-28"
              >
                <Image
                  src={line.image}
                  alt={`Illustration : ${line.name}`}
                  width={224}
                  height={224}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-lg uppercase leading-tight">
                      <Link href={`/shop/${line.slug}`} className="hover:text-bakery-orange">
                        {line.name}
                      </Link>
                    </h2>
                    {line.variantLabel ? (
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-chocolate/55">
                        {line.variantLabel}
                      </p>
                    ) : null}
                  </div>
                  <p className="shrink-0 font-display text-lg">
                    {formatPrice(line.unitPrice * line.quantity)}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <QuantityStepper
                    value={line.quantity}
                    onChange={(next) => setQuantity(line.key, next)}
                    min={1}
                    label={line.name}
                  />
                  <button
                    type="button"
                    onClick={() => removeLine(line.key)}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-chocolate/55 transition-colors hover:bg-bakery-orange/15 hover:text-chocolate"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Retirer
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Button href="/shop" variant="outline">
            Continuer mes achats
          </Button>
        </div>
      </div>

      <aside
        aria-label="Récapitulatif de commande"
        className="h-fit rounded-[1.75rem] bg-chocolate p-6 text-cream sm:p-8 lg:sticky lg:top-8"
      >
        <h2 className="font-display text-2xl uppercase">Récapitulatif</h2>
        <dl className="mt-6 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-cream/70">Articles ({itemCount})</dt>
            <dd className="font-semibold">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-cream/70">Livraison (estimation)</dt>
            <dd className="font-semibold">
              {shippingFee === 0 ? "Offerte" : formatPrice(shippingFee)}
            </dd>
          </div>
          <div className="mt-3 flex justify-between border-t border-cream/15 pt-4 text-base">
            <dt className="font-display uppercase">Total estimé</dt>
            <dd className="font-display">{formatPrice(subtotal + shippingFee)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-cream/55">
          Frais de livraison définitifs confirmés à l'étape suivante. Retrait en boutique
          gratuit.
        </p>
        <Button href="/checkout" size="lg" className="mt-6 w-full">
          Commander
        </Button>
      </aside>
    </div>
  );
}
