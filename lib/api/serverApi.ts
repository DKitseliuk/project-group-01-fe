import { cookies } from 'next/headers';
import { AxiosResponse } from 'axios';
import { api, nextServer } from './api';
import type { Location } from '@/types/location';

const refreshSession = async (): Promise<
  AxiosResponse<{ message: string }>
> => {
  const cookieStore = await cookies();
  const res = await api.post<{ message: string }>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

const fetchLocations = async (): Promise<Location[]> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<{ locations: Location[] }>(
    '/locations',
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  return data.locations;
};
export { fetchLocations, refreshSession };
