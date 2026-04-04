'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import type { Review } from '@/types/review';
import ReviewsSlider from '@/components/ReviewsSection/ReviewsSlider';
import css from './LeaveReviewSection.module.css';

interface LeaveReviewSectionProps {
  id: string;
  reviews?: readonly Review[];
}

export default function LeaveReviewSection({
  id,
  reviews = [],
}: LeaveReviewSectionProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const href = isAuthenticated
    ? `/locations/${id}/review`
    : `/locations/${id}/review/auth`;

  const hasReviews = reviews.length > 0;

  return (
    <section className={css.section} aria-labelledby="reviews-heading">
      <div className={css.head}>
        <h2 className={css.title} id="reviews-heading">
          Відгуки
        </h2>
        <Link
          href={href}
          className="btn btn--primary btn--regular"
        >
          Залишити відгук
        </Link>
      </div>

      {hasReviews ? (
        <ReviewsSlider key={id} reviews={[...reviews]} />
      ) : (
        <p className={css.emptyState} role="status">
          Відгуків поки немає…
        </p>
      )}
    </section>
  );
}
