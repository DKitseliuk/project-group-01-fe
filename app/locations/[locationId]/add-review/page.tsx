'use client';

import { useParams, useRouter } from 'next/navigation';
import AddReviewModal from '@/components/AddReviewModal/AddReviewModal';

export default function LocationAddReviewFullPage() {
  const router = useRouter();
  const params = useParams<{ locationId: string }>();
  const locationId = params.locationId;

  return (
    <AddReviewModal
      handleCloseOverride={() =>
        router.replace(locationId ? `/locations/${locationId}` : '/locations')
      }
    />
  );
}
