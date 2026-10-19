"use client";

import { Heart, ShieldCheck, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/format";
import type { Product, ProductVariant } from "@/types/product";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const variants = product.variants ?? [];
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    variants[0]?.id,
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(
    () => variants.find((variant) => variant.id === selectedVariantId),
    [variants, selectedVariantId],
  );

  const unitPrice = product.price + (selectedVariant?.priceDelta ?? 0);

  return (
    <div className="flex flex-col gap-6">
      {variants.length > 0 ? (
        <fieldset>
          <legend className="font-display text-lg uppercase tracking-wide">Format</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {variants.map((variant: ProductVariant) => {
              const active = variant.id === selectedVariantId;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  aria-pressed={active}
                  className={
                    "rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-colors " +
                    (active
                      ? "border-chocolate bg-chocolate text-cream"
                      : "border-chocolate/15 bg-cream text-chocolate hover:border-chocolate/40")
                  }
                >
                  {variant.label}
                  {variant.priceDelta !== 0 ? (
                    <span className="ml-2 opacity-70">
                      {variant.priceDelta > 0 ? "+" : ""}
                      {formatPrice(variant.priceDelta)}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <p className="font-display text-3xl" aria-live="polite">
          {formatPrice(unitPrice * quantity)}
        </p>
        {quantity > 1 ? (
          <p className="text-sm text-chocolate/55">
            {formatPrice(unitPrice)} × {quantity}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <QuantityStepper
          value={quantity}
          onChange={(next) => setQuantity(Math.max(1, next))}
          min={1}
          label={product.name}
        />
        <AddToCartButton product={product} variant={selectedVariant} quantity={quantity} size="lg" />
      </div>

      <ul className="flex flex-col gap-3 border-t border-chocolate/10 pt-6 text-sm text-chocolate/70">
        <li className="flex items-center gap-3">
          <Truck className="h-4 w-4 shrink-0 text-bakery-orange" aria-hidden="true" />
          Livraison à partir de 25 DH — offerte dès 150 DH. Retrait gratuit en boutique.
        </li>
        <li className="flex items-center gap-3">
          <ShieldCheck className="h-4 w-4 shrink-0 text-bakery-orange" aria-hidden="true" />
          Préparé à la commande, sans conservateur ni additif.
        </li>
        <li className="flex items-center gap-3">
          <Heart className="h-4 w-4 shrink-0 text-bakery-orange" aria-hidden="true" />
          Recette exclusive de la maison, façonnée à la main.
        </li>
      </ul>
    </div>
  );
}
