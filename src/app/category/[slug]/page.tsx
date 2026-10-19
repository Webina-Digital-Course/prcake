import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategory } from "@/data/products";
import { ProductGrid } from "@/components/products/product-grid";
import { Squiggle } from "@/components/ui/decorative";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return ["cakes", "bread", "cookies", "bagels", "pastries"].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Catégorie introuvable" };
  return {
    title: category.label,
    description: `${category.tagline} — découvrez toutes les créations ROLLIN de la catégorie ${category.label.toLowerCase()}.`,
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <nav aria-label="Fil d'ariane" className="mb-8 text-sm text-chocolate/55">
        <Link href="/shop" className="transition-colors hover:text-chocolate">
          Boutique
        </Link>{" "}
        / <span className="font-semibold text-chocolate">{category.label}</span>
      </nav>

      <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <header>
          <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">
            Catégorie
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl lg:text-7xl">
            {category.label}
          </h1>
          <Squiggle className="mt-5 h-5 w-24 text-bakery-orange" />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-chocolate/70">
            {category.tagline}. {categoryProducts.length} création
            {categoryProducts.length === 1 ? "" : "s"} disponible
            {categoryProducts.length === 1 ? "" : "s"} dans cette catégorie.
          </p>
        </header>
        <div className="overflow-hidden rounded-[1.75rem] border border-chocolate/10 bg-white">
          <Image
            src={category.image}
            alt={`Illustration : ${category.label}`}
            width={800}
            height={800}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </div>

      {categoryProducts.length > 0 ? (
        <ProductGrid products={categoryProducts} className="mt-14" />
      ) : (
        <p className="mt-14 rounded-[1.75rem] border border-dashed border-chocolate/25 px-6 py-16 text-center text-chocolate/60">
          Aucune création disponible dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  );
}
