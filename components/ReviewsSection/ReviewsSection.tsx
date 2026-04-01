import type { ReactNode } from "react";
import type { Review } from "@/types/review";
import ReviewsSlider from "./ReviewsSlider";
import styles from "./ReviewsSection.module.css";

type Props = {
  reviews: Review[];
  title?: string;
  action?: ReactNode;
  showLocation?: boolean;
};

export default function ReviewsSection({ reviews, title = "Відгуки", action, showLocation = true }: Props) {
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
        <ReviewsSlider reviews={reviews} showLocation={showLocation} />
      </div>
    </section>
  );
}
