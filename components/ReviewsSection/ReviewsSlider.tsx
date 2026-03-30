"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import type { Review } from "@/types/review";
import "swiper/css";
import styles from "./ReviewsSection.module.css";

type Props = { reviews: Review[] };

function NavArrow({ direction }: { direction: "prev" | "next" }) {
  const iconId =
    direction === "prev" ? "icon-arrow-back" : "icon-arrow-forward";
  return (
    <svg className={styles.navIcon} viewBox="0 0 32 32" aria-hidden>
      <use href={`/img/icons.svg#${iconId}`} />
    </svg>
  );
}

const starStyles = {
  itemShapes: Star,
  activeFillColor: "rgb(0, 0, 0)",
  inactiveFillColor: "transparent",
  activeStrokeColor: "rgb(0, 0, 0)",
  inactiveStrokeColor: "rgb(0, 0, 0)",
  itemStrokeWidth: 0.8,
};

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className={styles.card}>
      <Rating
        value={review.rating}
        readOnly
        halfFillMode="svg"
        itemStyles={starStyles}
        className={styles.stars}
      />
      <p className={styles.reviewText}>{review.text}</p>
      <div className={styles.authorBlock}>
        <span className={styles.authorName}>{review.authorName}</span>
        <p className={styles.locationName}>{review.locationName}</p>
      </div>
    </article>
  );
}

export default function ReviewsSlider({ reviews }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  return (
    <>
      <div className={styles.sliderWrap}>
        <Swiper
          className={styles.swiper}
          rewind
          spaceBetween={16}
          slidesPerView={1}
          slidesPerGroup={1}
          onSwiper={(s) => { swiperRef.current = s; }}
          breakpoints={{
            375: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 18 },
            768: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 20 },
            1440: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 24 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className={styles.slide}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.navRow}>
        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Попередній відгук"
            onClick={goPrev}
          >
            <NavArrow direction="prev" />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Наступний відгук"
            onClick={goNext}
          >
            <NavArrow direction="next" />
          </button>
        </div>
      </div>
    </>
  );
}
