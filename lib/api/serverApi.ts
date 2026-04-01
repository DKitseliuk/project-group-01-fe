import { cookies } from 'next/headers';
import { AxiosResponse } from 'axios';
import { backendServer } from './api';
import type { Location } from '@/types/location';
import { LocationType, Region } from '@/types/categories';

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const sessionId = cookieStore.get('sessionId')?.value;

  const pairs = [
    ['accessToken', accessToken],
    ['refreshToken', refreshToken],
    ['sessionId', sessionId],
  ].filter(([, value]) => Boolean(value)) as Array<[string, string]>;

  return pairs.map(([key, value]) => `${key}=${value}`).join('; ');
};

const fetchLocations = async (): Promise<Location[]> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await backendServer.get<{ locations: Location[] }>(
    'locations',
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

  return data.locations;
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
  const { data } = await backendServer.get<LocationType[]>(
    'categories/location-types',
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );
  return data;
};
const getRegions = async (): Promise<Region[]> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await backendServer.get<Region[]>('categories/regions', {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
};

const refreshSession = async (): Promise<
  AxiosResponse<{ message: string }>
> => {
  const cookieHeader = await getCookieHeader();

  const res = await backendServer.post<{ message: string }>(
    '/auth/refresh',
    null,
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );
  return res;
};

export {
  fetchLocations,
  fetchLocationById,
  refreshSession,
  getLocationTypes,
  getRegions,
};
