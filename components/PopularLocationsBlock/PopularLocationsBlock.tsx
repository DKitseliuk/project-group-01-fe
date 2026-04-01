'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import css from './PopularLocationsBlock.module.css';
import { fetchLocations } from '@/lib/api/clientApi';
import type { Location } from '@/types/location';
import Slider from '@/components/Swiper/Swiper';
import LocationCard from '@/components/LocationCard/LocationCard';

export default function PopularLocationsBlock() {
  const {
    data: locations = [],
    isLoading,
    isError,
  } = useQuery<Location[]>({
    queryKey: ['popularLocations'],
    queryFn: () => fetchLocations({ limit: 6, sort: 'rate', order: 'desc' }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
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

        <Slider>
          {locations.map(location => (
            <LocationCard key={location._id} location={location} />
          ))}
        </Slider>
      </div>
    </section>
  );
}