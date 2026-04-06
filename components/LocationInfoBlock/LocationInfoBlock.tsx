'use client';
import Link from 'next/link';
import styles from './LocationInfoBlock.module.css';
import { Location, LocationOwner } from '@/types/location';
import StarRating from '../StarRating/StarRating';
import { useQuery } from '@tanstack/react-query';
import { categoriesOptionsClient } from '@/lib/queries/categoriesClient';

type LocationInfoBlockProps = {
  location: Location;
};

export const LocationInfoBlock = ({ location }: LocationInfoBlockProps) => {
  const { data: locationTypes } = useQuery(
    categoriesOptionsClient.locationTypes,
  );
  const { data: regions } = useQuery(categoriesOptionsClient.regions);

  const locationType = locationTypes?.find(
    (locationType) => locationType.slug === location.locationType,
  )?.type;
  const region = regions?.find(
    (region) => region.slug === location.region,
  )?.region;

  const owner =
    typeof location.ownerId === 'string'
      ? null
      : (location.ownerId as LocationOwner);

  const authorId = owner?._id ?? '';
  const authorName = owner?.name ?? '—';

  return (
    <section
      className={[styles.locationInfoBlock].filter(Boolean).join(' ')}
      aria-labelledby="location-title"
    >
      {/* Rating */}
      <StarRating value={location.rate} />

      {/* Title */}
      <h1 id="location-title" className={styles.title}>
        {location.name}
      </h1>

      {/* Meta */}
      <div className={styles.metaList}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Регіон:</span>
          <span className={styles.metaText}>{region}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Тип локації:</span>
          <span className={styles.metaText}>{locationType}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Автор статті:</span>
          {location.ownerId ? (
            <Link
              href={`/profile/${authorId}`}
              className={`${styles.metaText} ${styles.metaTextLink}`}
            >
              {authorName}
            </Link>
          ) : (
            <span className={styles.metaText}>{'authorName'}</span>
          )}
        </div>
      </div>
    </section>
  );
};
