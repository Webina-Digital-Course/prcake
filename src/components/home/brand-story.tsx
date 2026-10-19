import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkle } from "@/components/ui/decorative";

export function BrandStory() {
  return (
    <section aria-labelledby="story-title" className="px-4 pt-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-10 rounded-[2rem] bg-cream-deep px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-16">
          <div className="relative">
            <Image
              src="/images/about-bakery-placeholder.svg"
              alt="Illustration : le chef boulanger ROLLIN dans son atelier"
              width={900}
              height={800}
              className="aspect-[5/4] w-full rounded-[1.5rem] object-cover"
            />
            <Sparkle className="absolute -left-4 -top-4 h-8 w-8 text-bakery-orange" />
          </div>

          <div>
            <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">
              Notre histoire
            </p>
            <h2
              id="story-title"
              className="mt-4 font-display text-4xl uppercase leading-[0.95] sm:text-5xl"
            >
              Du levain, du temps,
              <br />
              beaucoup d'amour
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-chocolate/75">
              <p>
                ROLLIN est né d'une idée simple : faire du bon pain, comme on le ferait
                chez soi, mais en plus grand. Farines françaises et marocaines, beurre
                de tourage, fruits de saison — rien d'autre.
              </p>
              <p>
                Chaque nuit, le levain travaille. Chaque matin, nos boulangers façonnent
                à la main les premières baguettes avant l'aube. C'est long, c'est
                exigeant, et c'est exactement ce que l'on aime.
              </p>
            </div>
            <Button href="/about" variant="outline" size="lg" className="mt-8">
              Découvrir la maison
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
