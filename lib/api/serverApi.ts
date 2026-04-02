import { cookies } from 'next/headers';
import { backendServer } from './api';
import type { Location, FetchLocationsParams } from '@/types/location';
import type { LocationType, Region } from '@/types/categories';

type FetchLocationsResponse = {
  locations: Location[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
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
    },
  );

  return data;
};

const fetchLocationById = async (locationId: string): Promise<Location> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await backendServer.get<{ location: Location }>(
    `/locations/${locationId}`,
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

  return data.location;
};

const getLocationTypes = async (): Promise<LocationType[]> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await backendServer.get<{ locationTypes: LocationType[] }>(
    '/categories/location-types',
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

  return data.locationTypes;
};

const getRegions = async (): Promise<Region[]> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await backendServer.get<{ regions: Region[] }>(
    '/categories/regions',
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

  return data.regions;
};

export {
  fetchLocations,
  fetchLocationById,
  getLocationTypes,
  getRegions,
};