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

        <div className={css.rating}>
          ⭐ {location.rate?.toFixed(1) || "0.0"}
        </div>
      </div>

      <div className={css.info}>
        <span className={css.tag}>
          {location.locationType}
        </span>

        <h3 className={css.title}>{location.name}</h3>

        <p className={css.description}>
          {location.description}
        </p>

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
              ✏️
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}