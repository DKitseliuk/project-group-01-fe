'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import css from './Swiper.module.css';

interface Props {
  children: React.ReactNode[];
  breakpoints?: Record<number, { slidesPerView: number }>;
  spaceBetween?: number;
}

export default function Slider({
  children,
  breakpoints = {
    768: { slidesPerView: 2 },
    1440: { slidesPerView: 3 },
  },
  spaceBetween = 24,
}: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={spaceBetween}
        slidesPerView={1}
        loop={true}
        breakpoints={breakpoints}
        preventClicks={false}
        preventClicksPropagation={false}
        noSwipingSelector="a"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} style={{ height: 'auto' }}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={css.navBtns}>
        <button
          className={css.navBtn}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <svg width="24" height="24">
            <use href="/img/icons.svg#icon-arrow-back" />
          </svg>
        </button>
        <button
          className={css.navBtn}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <svg width="24" height="24">
            <use href="/img/icons.svg#icon-arrow-forward" />
          </svg>
        </button>
      </div>
    </>
  );
}
