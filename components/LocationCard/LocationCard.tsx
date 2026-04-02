"use client";

import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating/StarRating";
import css from "./LocationCard.module.css";
import type { Location } from "@/types/location";
import { useAuthStore } from "@/lib/store/authStore";
import { useCategoriesStore } from "@/lib/store/categoriesStore";

interface Props {
  location: Location;
  isOwner?: string;
  canEdit?: boolean;
}

export default function LocationCard({ location, isOwner, canEdit = false }: Props) {
  const user = useAuthStore(state => state.user);
  const { locationTypes } = useCategoriesStore(state => state.categories);

  const locationTypeLabel = locationTypes.find(t => t._id === location.locationType)?.type ?? location.locationType;

  return (
    <div className={css.card}>
    <Image
  src={location.image || "/placeholder.jpg"}
  alt={location.name}
  width={335}
  height={335}
  sizes="(min-width: 1440px) 421px, (min-width: 768px) 340px, 335px"
  className={css.image}
/>


  <p className={css.tag}>{locationTypeLabel}</p>
  <StarRating value={location.rate} />
  <h3 className={css.title}>{location.name}</h3>

  <div className={css.actions}>
    <Link href={`/locations/${location._id}`} className={css.viewBtn}>
      Переглянути локацію
    </Link>

    {isOwner === user?._id && canEdit && (
      <Link href={`/locations/${location._id}/edit`} className={css.editBtn} title="Редагувати">
        <svg width="24" height="24">
          <use href="/img/icons.svg#icon-edit" />
        </svg>
      </Link>
    )}
  </div>
</div>

  );
}