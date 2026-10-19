import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductPurchasePanel } from "@/components/products/product-purchase-panel";
import { Badge, DietaryTags } from "@/components/ui/badge";
import { Sparkle } from "@/components/ui/decorative";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.name,
    description: `${product.name} — ${product.shortDescription} À partir de ${product.price} DH.`,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const categoryLabel =
    product.category === "cakes"
      ? "Gâteaux"
      : product.category === "bread"
        ? "Pains"
        : product.category === "cookies"
          ? "Biscuits"
          : product.category === "bagels"
            ? "Bagels"
            : "Viennoiseries";

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <nav aria-label="Fil d'ariane" className="mb-8 text-sm text-chocolate/55">
        <Link href="/shop" className="transition-colors hover:text-chocolate">
          Boutique
        </Link>{" "}
        /{" "}
        <Link
          href={`/category/${product.category}`}
          className="transition-colors hover:text-chocolate"
        >
          {categoryLabel}
        </Link>{" "}
        / <span className="font-semibold text-chocolate">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-chocolate/10 bg-white">
            <Image
              src={product.gallery[0] ?? product.image}
              alt={`Illustration : ${product.name}`}
              width={900}
              height={900}
              priority
              className="aspect-square w-full object-cover"
            />
          </div>
          {product.gallery.length > 1 ? (
            <ul className="mt-4 flex gap-3" aria-label="Autres vues du produit">
              {product.gallery.map((image, index) => (
                <li
                  key={`${image}-${index}`}
                  className="h-20 w-20 overflow-hidden rounded-2xl border-2 border-chocolate/10 bg-white"
                >
                  <Image
                    src={image}
                    alt={`Vue ${index + 1} de ${product.name}`}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </li>
              ))}
            </ul>
          ) : null}
          <Sparkle className="absolute -right-3 -top-3 h-8 w-8 text-bakery-orange" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="turquoise">{categoryLabel}</Badge>
            {product.badge ? <Badge tone="orange">{product.badge}</Badge> : null}
          </div>
          <h1 className="mt-4 font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-chocolate/75">{product.description}</p>
          <DietaryTags tags={product.dietaryLabels} className="mt-6" />

          <div className="mt-8 border-t border-chocolate/10 pt-8">
            <ProductPurchasePanel product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="mt-24">
          <h2 id="related-title" className="font-display text-3xl uppercase sm:text-4xl">
            Vous aimerez aussi
          </h2>
          <ProductGrid products={related} columns={4} className="mt-10" />
        </section>
      ) : null}
      <p className="sr-only">Prix de base : {formatPrice(product.price)}.</p>
    </div>
  );
}
