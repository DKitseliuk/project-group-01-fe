"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import "swiper/css";

import css from "./PopularLocationsBlock.module.css";
import { fetchLocations } from "@/lib/api/clientApi";
import type { Location } from "@/types/location";
import LocationCard from "@/components/LocationCard/LocationCard";

export default function PopularLocationsBlock() {
  const swiperRef = useRef<SwiperType | null>(null);

  const { data: locations = [], isLoading, isError } = useQuery<Location[]>({
    queryKey: ["popularLocations"],
    queryFn: () => fetchLocations().then(locs => locs.slice(0, 6)),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading locations</p>;

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
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          breakpoints={{
            768:  { slidesPerView: 2 },
            1440: { slidesPerView: 3 },
          }}
        >
          {locations.map((location) => (
            <SwiperSlide key={location._id}>
              <LocationCard location={location} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={css.navBtns}>
          <button className={css.navBtn} onClick={() => swiperRef.current?.slidePrev()}>
            <svg width="24" height="24">
              <use href="/img/icons.svg#icon-arrow-back" />
            </svg>
          </button>
          <button className={css.navBtn} onClick={() => swiperRef.current?.slideNext()}>
            <svg width="24" height="24">
              <use href="/img/icons.svg#icon-arrow-forward" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}