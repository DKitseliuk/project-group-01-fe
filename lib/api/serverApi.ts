import { cookies } from 'next/headers';
import { AxiosResponse } from 'axios';
import { backendServer } from './api';
import type { Location } from '@/types/location';
import { LocationType, Region } from '@/types/categories';
import type { User } from '@/types/user';

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const sessionId = cookieStore.get('sessionId')?.value;
  return `accessToken=${accessToken}; refreshToken=${refreshToken}; sessionId=${sessionId}`;
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

 const getUserById = async (userId: string): Promise<User> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await backendServer.get<User>(`/users/${userId}`, {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

 const getUserLocationsById = async (userId: string, page = 1, perPage = 6) => {
  const cookieHeader = await getCookieHeader();
  const { data } = await backendServer.get(`/users/${userId}/locations`, {
    headers: { Cookie: cookieHeader },
    params: { page, perPage },
  });
  return data;
};

export {
  fetchLocations,
  fetchLocationById,
  refreshSession,
  getLocationTypes,
  getRegions,
  getUserById,
  getUserLocationsById
};

