import styles from "./LocationCard.module.css";
import { LOCATION_TYPES } from "@/constants/filters";

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
};

const getLocationTypeLabel = (type?: string) => {
  return LOCATION_TYPES.find((item) => item.value === type)?.label || "";
};

const renderStars = (rate?: number) => {
  const safeRate = Math.max(0, Math.min(5, rate || 0));
  const fullStars = Math.floor(safeRate);
  const emptyStars = 5 - fullStars;

  return "★".repeat(fullStars) + "☆".repeat(emptyStars);
};

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <li className={styles.card}>
      <img
        src={location.image}
        alt={location.name}
        className={styles.image}
      />

      <div className={styles.content}>
        <p className={styles.type}>
          {getLocationTypeLabel(location.locationType)}
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