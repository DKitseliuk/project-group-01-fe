import Link from 'next/link';
import StarRating from '@/components/StarRating/StarRating';
import type { Review } from '@/types/review';
import styles from './ReviewCards.module.css';

type Props = {
  review: Review;
  showLocation?: boolean;
};

export default function ReviewCards({ review, showLocation = true }: Props) {
  const locationContent =
    showLocation && review.locationId ? (
      <Link
        href={`/locations/${review.locationId}`}
        className={styles.locationLink}
      >
        {review.locationName}
      </Link>
    ) : showLocation ? (
      <p className={styles.locationName}>{review.locationName}</p>
    ) : null;

  return (
    <article className={styles.card}>
      <StarRating value={review.rating} />
      <p className={styles.reviewText}>{review.text}</p>
      <div className={styles.authorBlock}>
        <span className={styles.authorName}>{review.authorName}</span>
        {locationContent}
      </div>
    </article>
  );
}
