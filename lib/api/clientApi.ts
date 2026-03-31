import { nextServer } from '@/lib/api/api';
import type { Location, FetchLocationsParams } from '@/types/location';
import type { LoginValues, RegisterValues } from '@/types/auth';
import type { User } from '@/types/user';
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

const fetchLocations = async ({
  page = 1,
  perPage = 6,
  search = '',
  region = '',
  type = '',
  sortBy = 'createdAt',
  sortOrder = 'desc',
}: FetchLocationsParams = {}): Promise<FetchLocationsResponse> => {
  const res = await nextServer.get<FetchLocationsResponse>('/locations', {
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

const getRegionsClient = async (): Promise<{ regions: Region[] }> => {
  const { data } = await nextServer.get<{ regions: Region[] }>(
    '/categories/regions'
  );
  return data;
};

const getLocationTypesClient = async (): Promise<{
  locationTypes: LocationType[];
}> => {
  const { data } = await nextServer.get<{ locationTypes: LocationType[] }>(
    '/categories/location-types'
  );
  return data;
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
  getRegionsClient,
  getLocationTypesClient,
  register,
  login,
  refreshSession,
  getMe,
  logout,
};