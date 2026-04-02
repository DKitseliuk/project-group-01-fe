import { cookies } from 'next/headers';
import { nextServer } from '@/lib/api/api';
import type { Review } from '@/types/review';

const LOCATIONS_PAGE_SIZE = 12;
const FEEDBACKS_PER_LOCATION = 10;
const MAX_HOME_REVIEWS = 30;

type PopulatedLocation = {
  _id?: string;
  name?: string;
};

type FeedbackItem = {
  _id: string;
  rate: number;
  description?: string;
  userName?: string;
  locationId?: PopulatedLocation | string;
};

function feedbackToReview(
  f: FeedbackItem,
  locationName: string,
): Review | null {
  const text = f.description?.trim() ?? '';
  if (!text) return null;

  return {
    id: String(f._id),
    rating: Math.min(5, Math.max(0, Number(f.rate) || 0)),
    text,
    authorName: (f.userName?.trim() || 'Користувач').slice(0, 120),
    locationName: locationName.trim() || 'Локація',
  };
}

export async function getReviews(): Promise<Review[]> {
  const cookieStore = await cookies();
  const headers = { Cookie: cookieStore.toString() };

  const locRes = await nextServer.get<{
    locations: Array<{ _id: string; name: string }>;
  }>('/locations', {
    headers,
    params: { page: 1, perPage: LOCATIONS_PAGE_SIZE },
  });

  const locations = locRes.data.locations?.filter((l) => l._id) ?? [];
  if (locations.length === 0) return [];

  const feedbackBatches = await Promise.all(
    locations.map((loc) =>
      nextServer
        .get<{ feedbacks: FeedbackItem[] }>(
          `/locations/${encodeURIComponent(loc._id)}/feedbacks`,
          { headers, params: { page: 1, perPage: FEEDBACKS_PER_LOCATION } },
        )
        .then((r) => ({ feedbacks: r.data.feedbacks, locationName: loc.name }))
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
      const rev = feedbackToReview(f, batch.locationName);
      if (rev) out.push(rev);
      if (out.length >= MAX_HOME_REVIEWS) return out;
    }
  }

  return out;
}
