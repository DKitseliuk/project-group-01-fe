import { cookies } from 'next/headers';
import { backendServer } from '@/lib/api/api';
import type { Location, FetchLocationsParams } from '@/types/location';
import type { LocationType } from '@/types/locationType';

type FetchLocationsResponse = {
  locations: Location[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
};

type Region = {
  _id: string;
  slug: string;
  region: string;
  level: string;
  note: string;
};

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const sessionId = cookieStore.get('sessionId')?.value;

  return `accessToken=${accessToken}; refreshToken=${refreshToken}; sessionId=${sessionId}`;
};

const fetchLocations = async ({
  page = 1,
  perPage = 6,
  search = '',
  region = '',
  type = '',
  sortBy = 'createdAt',
  sortOrder = 'desc',
}: FetchLocationsParams = {}): Promise<FetchLocationsResponse> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await backendServer.get<FetchLocationsResponse>(
    '/locations',
    {
      headers: {
        Cookie: cookieHeader,
      },
      params: {
        page,
        perPage,
        search: search || undefined,
        region: region || undefined,
        type: type || undefined,
        sortBy,
        sortOrder,
      },
    }
  );

  return data;
};

const getRegionsServer = async (): Promise<{ regions: Region[] }> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await backendServer.get<{ regions: Region[] }>(
    '/categories/regions',
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  return data;
};

const getLocationTypesServer = async (): Promise<{
  locationTypes: LocationType[];
}> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await backendServer.get<{ locationTypes: LocationType[] }>(
    '/categories/location-types',
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  return data;
};

export { fetchLocations, getRegionsServer, getLocationTypesServer };