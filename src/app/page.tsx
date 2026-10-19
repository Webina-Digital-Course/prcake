import { BestSellers } from "@/components/home/best-sellers";
import { BrandStory } from "@/components/home/brand-story";
import { Categories } from "@/components/home/categories";
import { FeaturedIntro } from "@/components/home/featured-intro";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedIntro />
      <Categories />
      <BestSellers />
      <BrandStory />
      <Newsletter />
      <div className="h-24" aria-hidden="true" />
    </>
  );
}
