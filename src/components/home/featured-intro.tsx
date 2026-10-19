import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { CookieDoodle, RoundBadge, Sparkle } from "@/components/ui/decorative";
import { DietaryTags } from "@/components/ui/badge";

export function FeaturedIntro() {
  const featured = getFeaturedProducts();

  return (
    <section aria-labelledby="featured-title" className="px-4 pt-20 sm:px-6 sm:pt-24 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative max-w-4xl">
          <CookieDoodle className="absolute -top-10 right-0 h-16 w-16 text-bakery-orange sm:-top-14 sm:h-24 sm:w-24 lg:right-24" />
          <h2
            id="featured-title"
            className="font-display text-[2.5rem] uppercase leading-[0.92] sm:text-6xl lg:text-7xl"
          >
            Votre dose quotidienne
            <br />
            de <span className="text-bakery-orange">bonheur</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <ul className="flex flex-col divide-y divide-chocolate/10 border-y border-chocolate/10">
            {featured.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/shop/${product.slug}`}
                  className="group flex items-center gap-5 py-6 transition-colors sm:gap-7"
                >
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-3xl border border-chocolate/10 bg-white sm:h-32 sm:w-32">
                    <Image
                      src={product.image}
                      alt={`Illustration : ${product.name}`}
                      width={256}
                      height={256}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-xl uppercase leading-tight transition-colors group-hover:text-bakery-orange sm:text-2xl">
                        {product.name}
                      </h3>
                      <p className="shrink-0 font-display text-lg">{formatPrice(product.price)}</p>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-chocolate/65">
                      {product.shortDescription}
                    </p>
                    <DietaryTags tags={product.dietaryLabels} className="mt-3" />
                  </div>
                  <ArrowRight
                    className="hidden h-5 w-5 shrink-0 text-chocolate/30 transition-all group-hover:translate-x-1 group-hover:text-bakery-orange sm:block"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative">
            <div className="rounded-[2rem] bg-turquoise px-6 pb-10 pt-16 sm:px-10 sm:pb-14 sm:pt-20">
              <Sparkle className="absolute right-6 top-8 h-7 w-7 text-chocolate/60" />
              <Image
                src="/images/featured-bread-placeholder.svg"
                alt="Illustration : grand pain de campagne au levain"
                width={900}
                height={900}
                className="mx-auto -mt-28 w-full max-w-md rounded-[1.75rem] border-8 border-cream sm:-mt-36"
              />
              <div className="mt-8 text-center">
                <p className="font-display text-3xl uppercase leading-none text-chocolate sm:text-4xl">
                  Pain du jour, tous les jours
                </p>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-chocolate/75">
                  Farine de meule, levain vivant et fermentation lente : notre pain de
                  campagne est nourri depuis l'ouverture du fournil.
                </p>
                <Link
                  href="/category/bread"
                  className="mt-6 inline-flex items-center gap-2 font-display text-sm uppercase tracking-wide underline decoration-chocolate/40 decoration-2 underline-offset-8 transition-colors hover:text-chocolate/70"
                >
                  Voir les pains
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <RoundBadge
              top="100 %"
              bottom="Fait en famille"
              className="absolute -left-4 -top-10 h-28 w-28 -rotate-12 sm:-left-8 sm:h-32 sm:w-32"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
