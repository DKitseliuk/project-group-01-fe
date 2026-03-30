import Hero from "@/components/Hero/Hero";
import ReviewsSection from "@/components/ReviewsSection/ReviewsSection";
import AdvantagesBlock from "@/components/AdvantagesBlock/AdvantagesBlock";
import PopularLocationsBlock from "@/components/PopularLocationsBlock/PopularLocationsBlock";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchLocations } from "@/lib/api/serverApi";

const Home = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["popularLocations"],
    queryFn: fetchLocations,
  });

  return (
    <main>
      <Hero />
      <AdvantagesBlock />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PopularLocationsBlock />
      </HydrationBoundary>
      <ReviewsSection />
    </main>
  );
};

export default Home;
