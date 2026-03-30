import type { Review } from "@/types/review";

const DEFAULT_API_BASE = "https://relax-map-api.onrender.com";

const LOCATIONS_PAGE_SIZE = 12;
const FEEDBACKS_PER_LOCATION = 10;
const MAX_HOME_REVIEWS = 30;

type LocationsPayload = {
  locations?: Array<{ _id: string }>;
};

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

type FeedbacksPayload = {
  feedbacks?: FeedbackItem[];
};

function apiUrl(base: string, path: string): string {
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 120 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function feedbackToReview(f: FeedbackItem): Review | null {
  const text = f.description?.trim() ?? "";
  if (!text) return null;

  const loc =
    f.locationId && typeof f.locationId === "object" ? f.locationId : undefined;
  const locationName = loc?.name?.trim() || "Локація";

  return {
    id: String(f._id),
    rating: Math.min(5, Math.max(0, Number(f.rate) || 0)),
    text,
    authorName: (f.userName?.trim() || "Користувач").slice(0, 120),
    locationName,
  };
}

export async function getReviews(): Promise<Review[]> {
  const base = (
    process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE
  ).replace(/\/$/, "");

  const locPayload = await fetchJson<LocationsPayload>(
    apiUrl(
      base,
      `/api/locations?page=1&perPage=${LOCATIONS_PAGE_SIZE}`
    )
  );

  const locationIds =
    locPayload?.locations?.map((l) => l._id).filter(Boolean) ?? [];
  if (locationIds.length === 0) {
    return [];
  }

  const feedbackBatches = await Promise.all(
    locationIds.map((locationId) =>
      fetchJson<FeedbacksPayload>(
        apiUrl(
          base,
          `/api/locations/${encodeURIComponent(locationId)}/feedbacks?page=1&perPage=${FEEDBACKS_PER_LOCATION}`
        )
      )
    )
  );

  const seen = new Set<string>();
  const out: Review[] = [];

  for (const batch of feedbackBatches) {
    for (const f of batch?.feedbacks ?? []) {
      if (!f?._id || seen.has(f._id)) continue;
      seen.add(f._id);
      const rev = feedbackToReview(f);
      if (rev) out.push(rev);
      if (out.length >= MAX_HOME_REVIEWS) return out;
    }
  }

  return out;
}
