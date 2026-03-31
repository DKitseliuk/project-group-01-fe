import { cookies } from 'next/headers';
import { AxiosResponse } from 'axios';
import { backendServer } from './api';
import type { Location } from '@/types/location';

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
    '/locations',
    {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    }
  );

  return data.locations;
};

const fetchLocationById = async (locationId: string): Promise<Location> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await backendServer.get<{ location: Location }>(
    `/locations/${locationId}`,
    {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    }
  );

  return data.location;
};

export { fetchLocations, fetchLocationById, refreshSession };
