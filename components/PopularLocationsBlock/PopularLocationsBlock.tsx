'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import css from './PopularLocationsBlock.module.css';
import { fetchLocations } from '@/lib/api/clientApi';
import { categoriesOptionsClient } from '@/lib/queries/categoriesClient';
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
    queryFn: () =>
      fetchLocations({
        page: 1,
        perPage: 9,
        sortBy: 'rate',
        sortOrder: 'desc',
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const { data: locationTypes = [] } = useQuery(
    categoriesOptionsClient.locationTypes,
  );

  const locationTypeMap = new Map(
    locationTypes.map((type) => [type.slug, type.type]),
  );

  const updatedLocations = locations.map((location) => ({
    ...location,
    locationTypeLabel: locationTypeMap.get(location.locationType) ?? '',
  }));

  const { data: locationTypes = [] } = useQuery(
    categoriesOptionsClient.locationTypes,
  );

  const locationTypeMap = new Map(
    locationTypes.map((type) => [type.slug, type.type]),
  );

  const updatedLocations = locations.map((location) => ({
    ...location,
    locationTypeLabel: locationTypeMap.get(location.locationType) ?? '',
  }));

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
          {updatedLocations.map((location) => (
            <LocationCard key={location._id} location={location} />
          ))}
        </Slider>
      </div>
    </section>
  );
}