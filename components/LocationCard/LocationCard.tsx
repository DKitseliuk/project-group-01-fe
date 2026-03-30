"use client";

import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating/StarRating";
import styles from "./LocationCard.module.css";
import type { LocationType } from "@/types/locationType";

type Location = {
  _id: string;
  name: string;
  region: string;
  image: string;
  rate: number;
  locationType?: string;
};

type Props = {
  location: Location;
  locationTypes?: LocationType[];
  isOwner?: boolean;
};

const getLocationTypeLabel = (
  slug?: string,
  locationTypes?: LocationType[]
) => {
  return locationTypes?.find((item) => item.slug === slug)?.type || "";
};

export default function LocationCard({
  location,
  locationTypes,
  isOwner,
}: Props) {
  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={location.image || "/placeholder.jpg"}
          alt={location.name}
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <span className={styles.tag}>
          {getLocationTypeLabel(location.locationType, locationTypes)}
        </span>

        <StarRating value={location.rate} />

        <h3 className={styles.title}>{location.name}</h3>

        <div className={styles.actions}>
          <Link
            href={`/locations/${location._id}`}
            className={styles.viewBtn}
          >
            Переглянути локацію
          </Link>

          {isOwner && (
            <Link
              href={`/locations/${location._id}/edit`}
              className={styles.editBtn}
              title="Редагувати"
            >
              <svg width="24" height="24">
                <use href="/img/icons.svg#icon-edit" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}