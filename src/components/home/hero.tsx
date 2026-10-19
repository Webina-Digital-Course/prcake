import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkle, Squiggle, WheatOutline } from "@/components/ui/decorative";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="px-4 pt-6 sm:px-6 sm:pt-8 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden rounded-[2rem] bg-chocolate px-5 py-8 sm:rounded-[2.5rem] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <Sparkle className="absolute right-8 top-8 h-8 w-8 text-bakery-orange sm:h-10 sm:w-10" />
          <Sparkle className="absolute bottom-10 left-[46%] hidden h-5 w-5 text-bakery-orange lg:block" />

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
                <Image
                  src="/images/hero-baker-placeholder.svg"
                  alt="Illustration : un boulanger façonne la pâte dans le fournil ROLLIN"
                  width={900}
                  height={1100}
                  priority
                  className="aspect-[4/5] w-full object-cover object-center lg:aspect-[5/6]"
                />
              </div>
              <div className="absolute -bottom-4 -right-3 rounded-full border-2 border-cream/20 bg-bakery-orange px-5 py-3 text-center font-display text-sm uppercase leading-tight text-chocolate sm:-right-5 sm:text-base">
                Cuit ce<br />matin
              </div>
            </div>

            <div className="relative">
              <WheatOutline className="absolute -right-4 -top-16 h-64 w-40 rotate-12 text-cream/15 sm:h-80 sm:w-48" />
              <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-yellow">
                Boulangerie artisanale
              </p>
              <h1
                id="hero-title"
                className="mt-4 font-display text-[2.75rem] uppercase leading-[0.92] text-cream sm:text-6xl lg:text-[4.25rem]"
              >
                Fait main,
                <br />
                de zéro,
                <br />
                <span className="text-bakery-yellow">avec amour.</span>
              </h1>
              <Squiggle className="mt-5 h-6 w-28 text-bakery-orange" />
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream/75 sm:text-lg">
                Pains au levain, viennoiseries pur beurre et gâteaux de saison : chaque
                création est façonnée à la main dans notre fournil, sans raccourci et
                sans additif.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button href="/shop" size="lg">
                  Commander
                </Button>
                <Link
                  href="/about"
                  className="font-display text-sm uppercase tracking-wide text-cream underline decoration-bakery-orange decoration-2 underline-offset-8 transition-colors hover:text-bakery-yellow"
                >
                  Notre histoire
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-3" aria-hidden="true">
                <span className="h-2 w-8 rounded-full bg-bakery-orange" />
                <span className="h-2 w-2 rounded-full bg-cream/30" />
                <span className="h-2 w-2 rounded-full bg-cream/30" />
                <span className="h-2 w-2 rounded-full bg-cream/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
