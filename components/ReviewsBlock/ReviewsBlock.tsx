import type { ReactNode } from 'react';
import type { Review } from '@/types/review';
import styles from './ReviewsBlock.module.css';
import Slider from '../Swiper/Swiper';
import ReviewCards from '../ReviewCards/ReviewCards';

type Props = {
  readonly reviews: Review[];
  readonly title?: string;
  readonly action?: ReactNode;
  readonly showLocation?: boolean;
};

export default function ReviewsBlock({
  reviews,
  title = 'Відгуки',
  action,
  showLocation = true,
}: Props) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="reviews-heading">
      <div className="container">
        <div className={styles.header}>
          <h2 id="reviews-heading" className={styles.title}>
            {title}
          </h2>
          {action}
        </div>
        <Slider>
          {reviews.map((review) => (
            <ReviewCards
              key={review.id}
              review={review}
              showLocation={showLocation}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
}
