'use client';

import Image from 'next/image';
import Link from 'next/link';
import StarRating from '@/components/StarRating/StarRating';
import css from './LocationCard.module.css';
import type { Location } from '@/types/location';
import { useAuthStore } from '@/lib/store/authStore';

export type LocationWithTypeLabel = Location & { locationTypeLabel?: string };

interface Props {
  location: LocationWithTypeLabel;
  canEdit?: boolean;
}

export default function LocationCard({ location, canEdit = false }: Props) {
  const user = useAuthStore((state) => state.user);

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={location.image || '/placeholder.jpg'}
          alt={location.name}
          fill
          sizes="(min-width: 1440px) 421px, (min-width: 768px) 340px, 335px"
          className={css.image}
          priority
        />
      </div>
      <div className={css.info}>
        {location.locationTypeLabel && (
          <p className={css.tag}>{location.locationTypeLabel}</p>
        )}
        {location.rate ? <StarRating value={location.rate} /> : '—'}
        <h2 className={css.title}>{location.name}</h2>

        <div className={css.actions}>
          <Link href={`/locations/${location._id}`} className={css.viewBtn}>
            Переглянути локацію
          </Link>

          {location.ownerId === user?._id && canEdit && (
            <Link
              href={`/locations/${location._id}/edit`}
              className={css.editBtn}
              title="Редагувати"
            >
              <svg width="24" height="24">
                <use href="/img/icons.svg#icon-edit" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
