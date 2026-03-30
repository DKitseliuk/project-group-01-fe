import Hero from "@/components/Hero/Hero";
import ReviewsSection from "@/components/ReviewsSection/ReviewsSection";
import AdvantagesBlock from "@/components/AdvantagesBlock/AdvantagesBlock";

export default async function Home() {
  return (
    <main>
      <Hero />
      <AdvantagesBlock />
      <ReviewsSection />
    </main>
  );
}
