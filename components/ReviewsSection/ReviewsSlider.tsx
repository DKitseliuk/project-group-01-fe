"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Rating } from "@smastrom/react-rating";
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

const customStar = (
  <path d="M16.008 21.885l-5.639 4.296c-0.227 0.171-0.456 0.246-0.688 0.224s-0.447-0.097-0.646-0.224c-0.199-0.127-0.341-0.299-0.427-0.518s-0.093-0.463-0.021-0.734l2.152-7.007-5.531-3.979c-0.227-0.154-0.373-0.349-0.439-0.584s-0.061-0.457 0.017-0.667c0.077-0.204 0.203-0.388 0.377-0.551s0.405-0.245 0.692-0.245h6.858l2.193-7.307c0.072-0.276 0.215-0.483 0.427-0.622s0.435-0.207 0.667-0.207 0.454 0.069 0.667 0.207c0.213 0.138 0.358 0.345 0.435 0.622l2.185 7.307h6.866c0.282 0 0.509 0.082 0.684 0.245s0.3 0.347 0.377 0.551c0.077 0.21 0.083 0.432 0.017 0.667s-0.212 0.43-0.439 0.584l-5.531 3.979 2.152 6.999c0.072 0.276 0.065 0.522-0.021 0.738s-0.228 0.387-0.427 0.514c-0.199 0.132-0.413 0.209-0.643 0.232s-0.457-0.055-0.684-0.232l-5.631-4.289z" />
);

const starStyles = {
  itemShapes: customStar,
  activeFillColor: "rgb(0, 0, 0)",
  inactiveFillColor: "transparent",
  activeStrokeColor: "rgb(0, 0, 0)",
  inactiveStrokeColor: "rgb(0, 0, 0)",
  itemStrokeWidth: 1.5,
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
          loop
          spaceBetween={16}
          slidesPerView={1}
          slidesPerGroup={1}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
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
