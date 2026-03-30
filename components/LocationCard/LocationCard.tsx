import Image from "next/image";
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


type LocationCardProps = {
  location: Location;
  locationTypes?: LocationType[];
};

const getLocationTypeLabel = (
  typeSlug?: string,
  locationTypes?: LocationType[]
) => {
  return locationTypes?.find((item) => item.slug === typeSlug)?.type || "";
};

const renderStars = (rate?: number) => {
  const safeRate = Math.max(0, Math.min(5, rate || 0));
  const fullStars = Math.floor(safeRate);
  const emptyStars = 5 - fullStars;

  return "★".repeat(fullStars) + "☆".repeat(emptyStars);
};

export default function LocationCard({
  location,
  locationTypes,
}: LocationCardProps) {
  return (
    <li className={styles.card}>
      <Image
        src={location.image}
        alt={location.name}
        width={400}
        height={250}
        className={styles.image}
      />

      <div className={styles.content}>
        <p className={styles.type}>
          {getLocationTypeLabel(location.locationType, locationTypes)}
        </p>

        <p className={styles.rate}>{renderStars(location.rate)}</p>

        <h3 className={styles.title}>{location.name}</h3>

        <button type="button" className={styles.button}>
          Переглянути локацію
        </button>
      </div>
    </li>
  );
}