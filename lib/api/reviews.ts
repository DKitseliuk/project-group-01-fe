import { apiClient } from '@/lib/api/client';

export type CreateReviewPayload = {
  rating: number;
  text: string;
};

export async function createReview(
  id: string,
  payload: CreateReviewPayload
): Promise<unknown> {
  const { data } = await apiClient.post(
    `/api/locations/${id}/feedbacks`,
    payload
  );
  return data;
}
