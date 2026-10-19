import type { Metadata } from "next";
import { ShopCatalog } from "@/components/products/shop-catalog";

export const metadata: Metadata = {
  title: "Toute la boutique",
  description:
    "Parcourez toutes les créations ROLLIN : gâteaux, pains au levain, biscuits, bagels et viennoiseries faits main.",
};

type SearchParams = Promise<{ category?: string }>;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const allowed = ["cakes", "bread", "cookies", "bagels", "pastries"] as const;
  const initialCategory = allowed.includes(params.category as (typeof allowed)[number])
    ? (params.category as (typeof allowed)[number])
    : undefined;

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <header className="mb-10 max-w-2xl">
        <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">
          Boutique
        </p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">
          Nos créations
        </h1>
        <p className="mt-5 text-base leading-relaxed text-chocolate/70">
          Tout ce qui sort de notre fournil, façonné à la main et préparé en petites
          quantités. Recherchez, filtrez par catégorie et trouvez votre prochaine gourmandise.
        </p>
      </header>

      <ShopCatalog initialCategory={initialCategory} />
    </div>
  );
}
