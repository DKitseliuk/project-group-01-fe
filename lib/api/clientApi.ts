import { nextServer, publicApi } from '@/lib/api/api';
import type { Location, FetchLocationsParams } from '@/types/location';
import type { LoginValues, RegisterValues } from '@/types/auth';
import type { User } from '@/types/user';
import type { Region, LocationType } from '@/types/categories';

type FetchLocationsResponse = {
  locations: Location[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
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
  const res = await publicApi.get<FetchLocationsResponse>('/locations', {
    params: {
      page,
      perPage,
      search: search || undefined,
      region: region || undefined,
      type: type || undefined,
      sortBy,
      sortOrder,
    },
  });

  return res.data;
};

const fetchPopularLocations = async (): Promise<Location[]> => {
  const res = await publicApi.get<FetchLocationsResponse>('/locations', {
    params: {
      page: 1,
      perPage: 100,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    },
  });

  return Array.isArray(res.data.locations) ? res.data.locations : [];
};

const fetchLocationTypes = async (): Promise<LocationType[]> => {
  const res = await publicApi.get<{ locationTypes: LocationType[] }>(
    '/categories/location-types',
  );

  return res.data.locationTypes;
};

const fetchRegions = async (): Promise<Region[]> => {
  const res = await publicApi.get<{ regions: Region[] }>(
    '/categories/regions',
  );

  return res.data.regions;
};

async function register(payload: RegisterValues) {
  const { data } = await nextServer.post('/auth/register', payload);
  return data;
}

async function login(payload: LoginValues) {
  const { data } = await nextServer.post('/auth/login', payload);
  return data;
}

const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

const refreshSession = async (): Promise<boolean> => {
  try {
    await nextServer.post<{ message: string }>('/auth/refresh');
    return true;
  } catch {
    return false;
  }
};

const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export {
  fetchLocations,
  fetchPopularLocations,
  fetchLocationTypes,
  fetchRegions,
  register,
  login,
  refreshSession,
  getMe,
  logout,
};

export type { FetchLocationsResponse };