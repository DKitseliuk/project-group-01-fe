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
  return `accessToken=${accessToken}; refreshToken=${refreshToken}; sessionId=${sessionId}`;
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
  console.log('locationTypes response:', data);
  
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
    }
  );
  return res;
};

const fetchLocations = async (): Promise<Location[]> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await backendServer.get<{ locations: Location[] }>(
    'locations',
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  return data.locations;
};

export { fetchLocations, refreshSession, getLocationTypes, getRegions };
