'use client';

import { getReviews } from '@/lib/api/clientApi';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import ReviewsSlider from './ReviewsSlider';
import styles from './ReviewsSection.module.css';

export default function ReviewsSectionClient() {
  console.log('ReviewsSectionClient');
  const { data, isLoading, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => getReviews({}),
    placeholderData: keepPreviousData,
    throwOnError: true,
    staleTime: 60 * 1000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reviews</div>;

  return (
    <section className={styles.section} aria-labelledby="reviews-heading">
      <div className="container">
        <h2 id="reviews-heading" className={styles.title}>
          Останні відгуки
        </h2>
        {data && data?.feedbacks?.length > 0 ? (
          <ReviewsSlider reviews={data.feedbacks} />
        ) : (
          <p className={styles.emptyState} role="status">
            Відгуків поки немає…
          </p>
        )}
      </div>
    </section>
  );
}
