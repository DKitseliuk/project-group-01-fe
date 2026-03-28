import styles from "./LocationsPage.module.css";
import LocationsGrid from "@/components/LocationsGrid/LocationsGrid";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getLocationsServer } from "@/lib/api/serverApi";

type LocationsPageProps = {
  searchParams?: Promise<{
    page?: string;
    search?: string;
    region?: string;
    type?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
};

const LocationsPage = async ({ searchParams }: LocationsPageProps) => {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const search = params?.search || "";
  const region = params?.region || "";
  const type = params?.type || "";
  const sortBy = params?.sortBy || "createdAt";
  const sortOrder = params?.sortOrder || "desc";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["locations", { page, perPage: 6, search, region, type, sortBy, sortOrder }],
    queryFn: () =>
      getLocationsServer({
        page,
        perPage: 6,
        search,
        region,
        type,
        sortBy,
        sortOrder,
      }),
  });

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Усі місця відпочинку</h1>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <LocationsGrid
          initialPage={page}
          initialFilters={{
            search,
            region,
            type,
            sortBy,
            sortOrder,
          }}
        />
      </HydrationBoundary>
    </main>
  );
};

export default LocationsPage;