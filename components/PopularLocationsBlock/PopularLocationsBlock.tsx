'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import 'swiper/css';

import css from './PopularLocationsBlock.module.css';
import { fetchLocations } from '@/lib/api/clientApi';
import type { Location } from '@/types/location';
import LocationCard from '@/components/LocationCard/LocationCard';

import Loader from '@/app/loading';

export default function PopularLocationsBlock() {
  const swiperRef = useRef<SwiperType | null>(null);

  const {
    data: locations = [],
    isLoading,
    isError,
  } = useQuery<Location[]>({
    queryKey: ['popularLocations'],
    queryFn: () => fetchLocations(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading locations</p>;

  const topLocations = [...locations]
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 6);

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.header}>
          <h2 className={css.title}>Популярні локації</h2>
          <Link href="/locations" className={css.viewAllButton}>
            Всі локації
          </Link>
        </div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            1440: { slidesPerView: 3 },
          }}
        >
          {topLocations.map((location) => (
            <SwiperSlide key={location._id}>
              <LocationCard location={location} />
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
      </div>
    </section>
  );
}
