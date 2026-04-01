'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import type { Review } from '@/types/review';
import ReviewCards from '@/components/ReviewCards/ReviewCards';
import 'swiper/css';
import styles from './ReviewsSection.module.css';

type Props = {
  reviews: Review[];
  showLocation?: boolean;
};

function NavArrow({ direction }: { direction: 'prev' | 'next' }) {
  const iconId =
    direction === 'prev' ? 'icon-arrow-back' : 'icon-arrow-forward';
  return (
    <svg className={styles.navIcon} viewBox="0 0 32 32" aria-hidden>
      <use href={`/img/icons.svg#${iconId}`} />
    </svg>
  );
}


export default function ReviewsSlider({ reviews, showLocation = true }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

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
              <ReviewCards review={review} showLocation={showLocation} />
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
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <NavArrow direction="prev" />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Наступний відгук"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <NavArrow direction="next" />
          </button>
        </div>
      </div>
    </>
  );
}
