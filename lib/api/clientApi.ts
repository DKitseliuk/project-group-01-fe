import { nextServer } from '@/lib/api/api';
import type { Location, FetchLocationsParams } from '@/types/location';
import { LoginValues, RegisterValues } from '@/types/auth';
import { User } from '@/types/user';
import { Region, LocationType } from '@/types/categories';
import { CreateLocationPayload } from './location';

export const fetchLocations = async ({
  page,
  perPage,
  search,
  region,
}: FetchLocationsParams = {}): Promise<Location[]> => {
  const res = await nextServer.get<{ locations: Location[] }>('/locations', {
    params: { page, perPage, search, region },
  });

  return res.data.locations;
};

const createLocation = async (payload: CreateLocationPayload): Promise<Location> => {
  const res = await nextServer.post<Location>('/locations', payload);
  return res.data;
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

const getLocationTypes = async (): Promise<LocationType[]> => {
  const { data } = await nextServer.get<LocationType[]>(
    '/categories/location-types',
  );
  return data;
};

const getRegions = async (): Promise<Region[]> => {
  const { data } = await nextServer.get<Region[]>('/categories/regions');
  return data;
};

export {
  register,
  login,
  refreshSession,
  getMe,
  logout,
  getLocationTypes,
  getRegions,
  createLocation,
};
