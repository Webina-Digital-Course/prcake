import { Button } from "@/components/ui/button";
import { CookieDoodle } from "@/components/ui/decorative";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-4 py-28 text-center sm:px-6">
      <CookieDoodle className="h-20 w-20 text-bakery-orange" />
      <p className="font-display text-sm uppercase tracking-[0.25em] text-bakery-orange">404</p>
      <h1 className="font-display text-5xl uppercase leading-none sm:text-6xl">
        Page introuvable
      </h1>
      <p className="max-w-md text-base leading-relaxed text-chocolate/65">
        Cette page s'est évaporée comme une croûte de croissant. Reprenez au début, le
        fournil est juste ici.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-4">
        <Button href="/" size="lg">
          Retour à l'accueil
        </Button>
        <Button href="/shop" variant="outline" size="lg">
          Voir la boutique
        </Button>
      </div>
    </div>
  );
}
