"use client";

import Image from "next/image";
import Link from "next/link";
import css from "./LocationCard.module.css";
import type { Location } from "@/types/location";

interface Props {
  location: Location;
  isOwner?: boolean; 
}

export default function LocationCard({ location, isOwner }: Props) {
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
 <div className={css.rating}>
    {Array.from({ length: 5 }, (_, i) => {
      const full = i < Math.floor(location.rate);
      const half = !full && i < location.rate;
      return (
        <span key={i}>{full ? "★" : half ? "⭐" : "☆"}</span>
      );
    })}
  </div>
        <h3 className={css.title}>{location.name}</h3>

        
        <div className={css.actions}>
          
          <Link
            href={`/locations/${location._id}`}
            className={css.viewBtn}
          >
            Переглянути локацію
          </Link>

          {isOwner && (
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