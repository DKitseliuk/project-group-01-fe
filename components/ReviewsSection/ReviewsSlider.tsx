"use client";

import { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import type { Review } from "@/types/review";

import "swiper/css";

import styles from "./ReviewsSection.module.css";

type Props = {
  reviews: Review[];
};

/** Стрілки з «ніжкою» з `public/img/icons.svg` — `icon-arrow-back` / `icon-arrow-forward` */
function NavArrowFromSprite({
  className,
  direction,
}: {
  className?: string;
  direction: "prev" | "next";
}) {
  const id =
    direction === "prev" ? "icon-arrow-back" : "icon-arrow-forward";

  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <use href={`/img/icons.svg#${id}`} fill="currentColor" />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className={styles.stars} aria-label={`Оцінка ${clamped} з 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < clamped ? styles.starFilled : styles.starEmpty}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSlider({ reviews }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  const goPrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const goNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  return (
    <>
      <div className={styles.sliderWrap}>
        <Swiper
          className={styles.swiper}
          rewind
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={16}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            375: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 3,
              slidesPerGroup: 1,
              spaceBetween: 24,
            },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className={styles.slide}>
              <article className={styles.card}>
                <StarRow rating={review.rating} />
                <p className={styles.reviewText}>{review.text}</p>
                <div className={styles.authorBlock}>
                  <h3 className={styles.authorName}>{review.authorName}</h3>
                  <span className={styles.locationName}>
                    {review.locationName}
                  </span>
                </div>
              </article>
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
            <NavArrowFromSprite className={styles.navIcon} direction="prev" />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Наступний відгук"
            onClick={goNext}
          >
            <NavArrowFromSprite className={styles.navIcon} direction="next" />
          </button>
        </div>
      </div>
    </>
  );
}
