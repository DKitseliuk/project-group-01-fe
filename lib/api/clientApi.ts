import { nextServer } from '@/lib/api/api';
import type { Location, FetchLocationsParams } from '@/types/location';
import { LoginValues, RegisterValues } from '@/types/auth';
import { User } from '@/types/user';

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

interface ReviewParams {
  page?: number;
  perPage?: number;
}

const getReviews = async ({ page = 1, perPage = 9 }: ReviewParams) => {
  const params: ReviewParams = { page, perPage };

  const { data } = await nextServer.get('/feedbacks', {
    params,
  });

  return data;
};

export { register, login, refreshSession, getMe, logout, getReviews };
