import { getReviews } from "@/lib/api/serverApi";

import ReviewsSlider from "./ReviewsSlider";
import styles from "./ReviewsSection.module.css";

export default async function ReviewsSection() {
  const reviews = await getReviews();

  return (
    <section
      className={styles.section}
      aria-labelledby="reviews-heading"
    >
      <div className="container">
        <h2 id="reviews-heading" className={styles.title}>
          Останні відгуки
        </h2>
        {reviews.length > 0 ? (
          <ReviewsSlider reviews={reviews} />
        ) : (
          <p className={styles.emptyState} role="status">
            Відгуків поки немає…
          </p>
        )}
      </div>
    </section>
  );
}
