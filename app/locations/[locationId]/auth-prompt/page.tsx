'use client';

import { useParams, useRouter } from 'next/navigation';
import AuthPromptModal from '@/components/AuthPromptModal/AuthPromptModal';

export default function LocationAuthPromptFullPage() {
  const router = useRouter();
  const params = useParams<{ locationId: string }>();
  const locationId = params.locationId;

  return (
    <AuthPromptModal
      onClose={() =>
        router.replace(locationId ? `/locations/${locationId}` : '/locations')
      }
    />
  );
}
