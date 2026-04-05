'use client';

import { useAuthStore } from '@/lib/store/authStore';
import type { FeedbackItem, Review } from '@/types/review';
import Slider from '@/components/Swiper/Swiper';
import ReviewCards from '@/components/ReviewCards/ReviewCards';
import css from './LeaveReviewSection.module.css';
import { useRouter } from 'next/navigation';

function toReview(f: FeedbackItem, locationName: string): Review | null {
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

interface LeaveReviewSectionProps {
  id: string;
  locationName: string;
  feedbacks?: readonly FeedbackItem[];
}

export default function LeaveReviewSection({
  id,
  locationName,
  feedbacks = [],
}: LeaveReviewSectionProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();

  const handleClick = () => {
    if (isAuthenticated) {
      console.log('pushing to:', `/locations/${id}/add-review`);
      router.push(`/locations/${id}/add-review`);
    } else {
      console.log('pushing to:', `/locations/${id}/auth-prompt`);
      router.push(`/locations/${id}/auth-prompt`);
    }
  };

  const reviews: Review[] = feedbacks
    .map((f) => toReview(f, locationName))
    .filter((r): r is Review => r !== null);

  const hasReviews = reviews.length > 0;

  return (
    <section className={css.section} aria-labelledby="reviews-heading">
      <div className={css.head}>
        <h2 className={css.title} id="reviews-heading">
          Відгуки
        </h2>
        <button onClick={handleClick} className={css.ctaLink}>
          Залишити відгук
        </button>
      </div>

      {hasReviews ? (
        <Slider key={id}>
          {reviews.map((review) => (
            <ReviewCards key={review.id} review={review} showLocation={false} />
          ))}
        </Slider>
      ) : (
        <p className={css.emptyState} role="status">
          Відгуків поки немає…
        </p>
      )}
    </section>
  );
}
