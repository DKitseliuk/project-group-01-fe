"use client";

import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating/StarRating";
import css from "./LocationCard.module.css";
import type { Location } from "@/types/location";
import { useAuthStore } from "@/lib/store/authStore"; 

interface Props {
  location: Location;
  isOwner?: string; 
  canEdit?: boolean; 
}

export default function LocationCard({ location, isOwner, canEdit = false }: Props) {
  const user = useAuthStore(state => state.user); 

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={location.image || "/placeholder.jpg"}
          alt={location.name}
          fill
          className={css.image}
        />
      </div>

      <div className={css.info}>
        <span className={css.tag}>
          {location.locationType}
        </span>

        <StarRating value={location.rate} />

        <h3 className={css.title}>{location.name}</h3>

        <div className={css.actions}>
          <Link
            href={`/locations/${location._id}`}
            className={css.viewBtn}
          >
            Переглянути локацію
          </Link>

          {(isOwner === user?._id) && canEdit && ( 
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