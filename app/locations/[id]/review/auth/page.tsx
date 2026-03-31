'use client';

import { useParams, useRouter } from 'next/navigation';
import AuthPromptModal from '@/components/AuthPromptModal/AuthPromptModal';

export default function LocationReviewAuthFullPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  return (
    <AuthPromptModal
      handleCloseOverride={() =>
        router.replace(id ? `/locations/${id}` : '/locations')
      }
    />
  );
}
