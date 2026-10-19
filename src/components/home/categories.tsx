import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";
import { Squiggle } from "@/components/ui/decorative";

export function Categories() {
  return (
    <section aria-labelledby="categories-title" className="px-4 pt-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">
              Par envie
            </p>
            <h2
              id="categories-title"
              className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl lg:text-6xl"
            >
              Nos créations
            </h2>
            <Squiggle className="mt-4 h-5 w-24 text-bakery-orange" />
          </div>
          <Link
            href="/shop"
            className="font-display text-sm uppercase tracking-wide underline decoration-bakery-orange decoration-2 underline-offset-8 transition-colors hover:text-bakery-orange"
          >
            Tout voir
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {categories.map((category, index) => (
            <li key={category.slug} className={index === 0 ? "sm:col-span-1" : undefined}>
              <Link
                href={`/category/${category.slug}`}
                className="group block focus-visible:outline-offset-4"
              >
                <div className="overflow-hidden rounded-[1.5rem] border border-chocolate/10 bg-white">
                  <Image
                    src={category.image}
                    alt={`Illustration : ${category.label}`}
                    width={800}
                    height={800}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 px-1">
                  <p className="font-display text-lg uppercase leading-none transition-colors group-hover:text-bakery-orange">
                    {category.label}
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-chocolate/60">
                    {category.tagline}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
