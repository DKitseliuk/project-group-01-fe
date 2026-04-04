import { cookies } from 'next/headers';
import { AxiosResponse } from 'axios';
import { backendServer } from './api';
import type { Location } from '@/types/location';

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const sessionId = cookieStore.get('sessionId')?.value;
  return `accessToken=${accessToken}; refreshToken=${refreshToken}; sessionId=${sessionId}`;
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

const getReviewsForLocation = async (locationId: string) => {
  const cookieHeader = await getCookieHeader();

  const { data } = await backendServer.get(
    `/locations/${locationId}/feedbacks`,
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

  return data;
};

export {
  fetchLocations,
  refreshSession,
  fetchLocationById,
  getReviewsForLocation,
};
