'use client';

import { useParams, useRouter } from 'next/navigation';
import AddReviewModal from '@/components/AddReviewModal/AddReviewModal';

export default function LocationReviewFullPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  return (
    <AddReviewModal
      handleCloseOverride={() =>
        router.replace(id ? `/locations/${id}` : '/locations')
      }
    />
  );
}
