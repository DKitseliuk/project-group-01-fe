import { cookies } from 'next/headers';
import { AxiosResponse } from 'axios';
import { backendServer } from './api';
import type {
  FetchLocationsParams,
  FetchLocationsResponse,
  Location,
} from '@/types/location';
import { LocationType, Region } from '@/types/categories';
import { User } from '@/types/user';
import { FeedbackItem, Review } from '@/types/review';
import { POPULAR_FEEDBACKS } from '@/constants/feedback';

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const sessionId = cookieStore.get('sessionId')?.value;

  const parts = [];
  if (accessToken) parts.push(`accessToken=${accessToken}`);
  if (refreshToken) parts.push(`refreshToken=${refreshToken}`);
  if (sessionId) parts.push(`sessionId=${sessionId}`);

  return parts.join('; ');
};

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await backendServer.get<User>('/users/me', {
    headers: { Cookie: cookieHeader },
  });

  return data;
};

const fetchLocations = async (
  params: FetchLocationsParams = {},
): Promise<FetchLocationsResponse> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await backendServer.get<FetchLocationsResponse>(
    'locations',
    {
      params,
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

  return data;
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

const getUserLocations = async (
  userId: string,
  params: FetchLocationsParams = {},
) => {
  const cookieHeader = await getCookieHeader();
  const { data } = await backendServer.get(`/users/${userId}/locations`, {
    headers: { Cookie: cookieHeader },
    params,
  });
  return data;
};

const getReviewsForLocation = async (locationId: string) => {
  const cookieHeader = await getCookieHeader();

  const { data } = await backendServer.get<{ feedbacks: FeedbackItem[] }>(
    `/locations/${locationId}/feedbacks`,
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

  return data;
};

function feedbackToReview(
  f: FeedbackItem,
  locationName: string,
  locationId?: string,
): Review | null {
  const text = f.description?.trim() ?? '';
  if (!text) return null;

  return {
    id: String(f._id),
    rating: Math.min(5, Math.max(0, Number(f.rate) || 0)),
    text,
    authorName: (f.userName?.trim() || 'Користувач').slice(0, 120),
    locationName: locationName.trim() || 'Локація',
    locationId,
  };
}

async function getReviews(): Promise<Review[]> {
  let cookieHeader = await getCookieHeader();
  const locRes = await backendServer.get<{
    locations: Array<{ _id: string; name: string }>;
  }>('/locations', {
    headers: { Cookie: cookieHeader },
    params: { page: 1, perPage: POPULAR_FEEDBACKS.LOCATIONS_PAGE_SIZE },
  });

  const locations = locRes.data.locations?.filter((l) => l._id) ?? [];
  if (locations.length === 0) return [];

  cookieHeader = await getCookieHeader();

  const feedbackBatches = await Promise.all(
    locations.map((loc) =>
      backendServer
        .get<{ feedbacks: FeedbackItem[] }>(
          `/locations/${encodeURIComponent(loc._id)}/feedbacks`,
          {
            headers: { Cookie: cookieHeader },
            params: {
              page: 1,
              perPage: POPULAR_FEEDBACKS.FEEDBACKS_PER_LOCATION,
            },
          },
        )
        .then((r) => ({ feedbacks: r.data.feedbacks, locationName: loc.name, locationId: loc._id }))
        .catch(() => null),
    ),
  );

  const seen = new Set<string>();
  const out: Review[] = [];

  for (const batch of feedbackBatches) {
    if (!batch) continue;
    for (const f of batch.feedbacks ?? []) {
      if (!f?._id || seen.has(f._id)) continue;
      seen.add(f._id);
      const rev = feedbackToReview(f, batch.locationName, batch.locationId);
      if (rev) out.push(rev);
      if (out.length >= POPULAR_FEEDBACKS.MAX_HOME_REVIEWS) return out;
    }
  }

  return out;
}

export {
  fetchLocations,
  fetchLocationById,
  refreshSession,
  getLocationTypes,
  getRegions,
  getUserById,
  getUserLocationsById,
  getUserLocations,
  getReviews,
  getReviewsForLocation,
};
