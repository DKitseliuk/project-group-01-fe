import styles from "./LocationsPage.module.css";
import LocationsGrid from "@/components/LocationsGrid/LocationsGrid";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  getLocationsServer,
  getRegionsServer,
  getLocationTypesServer,
} from "@/lib/api/serverApi";
import { LOCATIONS_PER_PAGE } from "@/constants/pagination";

type Filters = {
  search: string;
  region: string;
  type: string;
  sortBy: string;
  sortOrder: string;
};

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

  const filters: Filters = {
    search,
    region,
    type,
    sortBy,
    sortOrder,
  };

  const queryClient = new QueryClient();

  const [regionsData, locationTypesData] = await Promise.all([
    getRegionsServer(),
    getLocationTypesServer(),
  ]);

  await queryClient.prefetchQuery({
    queryKey: ["locations", { page, perPage: LOCATIONS_PER_PAGE, ...filters }],
    queryFn: () =>
      getLocationsServer({
        page,
        perPage: LOCATIONS_PER_PAGE,
        ...filters,
      }),
  });

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Усі місця відпочинку</h1>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <FilterPanel
          filters={filters}
          regions={regionsData.regions}
          locationTypes={locationTypesData.locationTypes}
        />
        <LocationsGrid
          initialPage={page}
          initialFilters={filters}
          locationTypes={locationTypesData.locationTypes}
        />
      </HydrationBoundary>
    </main>
  );
};

export default LocationsPage;
