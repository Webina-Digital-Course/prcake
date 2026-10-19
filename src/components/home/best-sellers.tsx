import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBestSellers } from "@/data/products";
import { ProductGrid } from "@/components/products/product-grid";

export function BestSellers() {
  const bestSellers = getBestSellers();

  return (
    <section aria-labelledby="bestsellers-title" className="px-4 pt-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">
              Les préférés
            </p>
            <h2
              id="bestsellers-title"
              className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl lg:text-6xl"
            >
              Best-sellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-wide underline decoration-bakery-orange decoration-2 underline-offset-8 transition-colors hover:text-bakery-orange"
          >
            Toute la boutique
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ProductGrid products={bestSellers} columns={4} className="mt-12" />
      </div>
    </section>
  );
}
