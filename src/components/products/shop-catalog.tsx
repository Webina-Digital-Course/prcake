"use client";

import { Search, SlidersHorizontal, PackageOpen } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, products } from "@/data/products";
import type { ProductCategory } from "@/types/product";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SortKey = "nouveautes" | "prix-croissant" | "prix-decroissant" | "az";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "nouveautes", label: "Nouveautés" },
  { value: "prix-croissant", label: "Prix croissant" },
  { value: "prix-decroissant", label: "Prix décroissant" },
  { value: "az", label: "Nom (A → Z)" },
];

const PAGE_SIZE = 9;

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function ShopCatalog({ initialCategory }: { initialCategory?: ProductCategory }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">(initialCategory ?? "all");
  const [sort, setSort] = useState<SortKey>("nouveautes");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    const list = products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const haystack = normalize(`${product.name} ${product.shortDescription} ${product.description}`);
      const matchesQuery = q.length === 0 || haystack.includes(q);
      return matchesCategory && matchesQuery;
    });

    return [...list].sort((a, b) => {
      switch (sort) {
        case "prix-croissant":
          return a.price - b.price;
        case "prix-decroissant":
          return b.price - a.price;
        case "az":
          return a.name.localeCompare(b.name, "fr");
        case "nouveautes":
        default:
          return b.releasedAt.localeCompare(a.releasedAt);
      }
    });
  }, [query, category, sort]);

  const visible = filtered.slice(0, visibleCount);

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setSort("nouveautes");
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-[1.75rem] border border-chocolate/10 bg-white/60 p-5 sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <label htmlFor="shop-search" className="sr-only">
              Rechercher un produit
            </label>
            <Search
              className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-chocolate/45"
              aria-hidden="true"
            />
            <input
              id="shop-search"
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Rechercher : croissant, levain, chocolat…"
              className="w-full rounded-full border-2 border-chocolate/15 bg-cream py-3.5 pl-12 pr-5 text-sm placeholder:text-chocolate/40 focus:border-chocolate/40 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <SlidersHorizontal className="h-4 w-4 text-chocolate/50" aria-hidden="true" />
            <label htmlFor="shop-sort" className="text-sm font-semibold text-chocolate/70">
              Trier par
            </label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as SortKey);
                setVisibleCount(PAGE_SIZE);
              }}
              className="rounded-full border-2 border-chocolate/15 bg-cream px-4 py-2.5 text-sm font-semibold focus:border-chocolate/40 focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <ul className="flex gap-2 overflow-x-auto pb-1" aria-label="Filtrer par catégorie">
            {(
              [{ value: "all", label: "Tout voir" }, ...categories.map((c) => ({ value: c.slug, label: c.label }))] as Array<{
                value: ProductCategory | "all";
                label: string;
              }>
            ).map((chip) => (
              <li key={chip.value} className="shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setCategory(chip.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  aria-pressed={category === chip.value}
                  className={cn(
                    "rounded-full border-2 px-4 py-2 font-display text-sm uppercase tracking-wide transition-colors",
                    category === chip.value
                      ? "border-chocolate bg-chocolate text-cream"
                      : "border-chocolate/15 bg-cream text-chocolate hover:border-chocolate/40",
                  )}
                >
                  {chip.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 text-sm text-chocolate/60" aria-live="polite">
        {filtered.length} produit{filtered.length === 1 ? "" : "s"} trouvé
        {filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-[1.75rem] border border-dashed border-chocolate/25 px-6 py-20 text-center">
          <PackageOpen className="h-10 w-10 text-chocolate/40" aria-hidden="true" />
          <p className="font-display text-2xl uppercase">Aucun résultat</p>
          <p className="max-w-sm text-sm text-chocolate/60">
            Essayez un autre mot-clé ou revenez à l'ensemble de nos créations.
          </p>
          <Button onClick={resetFilters} variant="outline">
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <>
          <ProductGrid products={visible} className="mt-10" />
          {visibleCount < filtered.length ? (
            <div className="mt-14 flex justify-center">
              <Button variant="outline" size="lg" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                Voir plus de produits
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
