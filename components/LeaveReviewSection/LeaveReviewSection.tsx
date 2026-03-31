'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import css from './LeaveReviewSection.module.css';

export type LocationFeedback = {
  id: string;
};

interface LeaveReviewSectionProps {
  id: string;
  feedbacks?: readonly LocationFeedback[];
}

export default function LeaveReviewSection({
  id,
  feedbacks = [],
}: LeaveReviewSectionProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const href = isAuthenticated
    ? `/locations/${id}/review`
    : `/locations/${id}/review/auth`;

  const hasFeedbacks = feedbacks.length > 0;

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

      {/* TODO: Add feedbacks list */}
      {hasFeedbacks ? (
        <ul className={css.list} aria-label="Список відгуків">
          {feedbacks.map((item, index) => (
            <li key={item.id}>
              <p>Відгук {index + 1}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.emptyState} role="status">
          Відгуків поки немає…
        </p>
      )}
    </section>
  );
}
