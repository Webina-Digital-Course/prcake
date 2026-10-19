import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Leaf, Sunrise, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Squiggle } from "@/components/ui/decorative";

export const metadata: Metadata = {
  title: "Notre histoire",
  description:
    "L'histoire de ROLLIN : une boulangerie artisanale née d'une envie simple, faire du bon pain comme chez soi, en plus grand.",
};

const values = [
  {
    icon: Wheat,
    title: "Farines sélectionnées",
    description:
      "Meule française, semoule marocaine locale : chaque farine est choisie pour sa force, son goût et sa traçabilité.",
  },
  {
    icon: Sunrise,
    title: "Cuisson quotidienne",
    description:
      "Les premières baguettes sortent du four à 6 h 30. Ce qui n'est pas vendu le lendemain est donné, jamais resservi.",
  },
  {
    icon: Leaf,
    title: "Sans raccourci",
    description:
      "Pas d'arôme, pas de conservateur, pas de pâte surgelée. Le temps est notre seul additif.",
  },
  {
    icon: Heart,
    title: "Une maison de famille",
    description:
      "Trois générations autour du fournil, et la même recette de levain entretenue depuis le premier jour.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <header className="relative max-w-3xl">
        <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">
          Notre histoire
        </p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-[0.92] sm:text-6xl lg:text-7xl">
          Une histoire de
          <br />
          levain et de <span className="text-bakery-orange">patience</span>
        </h1>
        <Squiggle className="mt-6 h-6 w-28 text-bakery-orange" />
      </header>

      <section className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Image
          src="/images/story-kneading-placeholder.svg"
          alt="Illustration : des mains pétrissent la pâte sur un plan de travail fariné"
          width={900}
          height={800}
          className="aspect-[4/3] w-full rounded-[2rem] object-cover"
        />
        <div className="space-y-5 text-base leading-relaxed text-chocolate/75">
          <p>
            Tout a commencé dans une cuisine de quartier, un dimanche pluvieux, avec un
            saladier de pâte qui n'arrêtait pas de gonfler. ROLLIN est né de cette
            obstination : reproduire le pain de nos souvenirs, puis le partager avec le
            quartier, la ville, et maintenant avec vous.
          </p>
          <p>
            Notre fournil ouvre à 5 h du matin. Le levain, entretenu depuis l'ouverture,
            est nourri deux fois par jour. Les viennoiseries sont tourées à la main, les
            crèmes préparées le matin même, les fruits de saison livrés chaque semaine
            par des producteurs locaux.
          </p>
          <p>
            Nous croyons qu'un bon gâteau ne se résume pas à une liste d'ingrédients :
            c'est aussi une personne qui se lève avant l'aube pour que votre table ait
            quelque chose de beau dessus.
          </p>
        </div>
      </section>

      <section aria-labelledby="values-title" className="mt-24">
        <h2 id="values-title" className="font-display text-4xl uppercase sm:text-5xl">
          Ce qui nous tient à cœur
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="rounded-[1.5rem] border border-chocolate/10 bg-white/60 p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bakery-yellow text-chocolate">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl uppercase leading-tight">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-chocolate/70">{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24 rounded-[2rem] bg-turquoise px-6 py-12 text-center sm:px-12">
        <h2 className="font-display text-3xl uppercase leading-none sm:text-4xl">
          Passez nous voir au fournil
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-chocolate/75">
          12, rue des Fournils, Marrakech. Du mardi au dimanche, de 7 h 30 à 19 h 30 —
          et le café est toujours offert au premier visiteur.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/shop" variant="brown">
            Commander en ligne
          </Button>
          <Button href="/contact" variant="outline">
            Nous contacter
          </Button>
        </div>
      </section>
    </div>
  );
}
