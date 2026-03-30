import Hero from "@/components/Hero/Hero";
import ReviewsSection from "@/components/ReviewsSection/ReviewsSection";
import AdvantagesBlock from "@/components/AdvantagesBlock/AdvantagesBlock";
import PopularLocationsBlock from "@/components/PopularLocationsBlock/PopularLocationsBlock";

export default async function Home() {
  return (
    <main>
      <Hero />
      <AdvantagesBlock />
      <PopularLocationsBlock />
      <ReviewsSection />
    </main>
  );
}
