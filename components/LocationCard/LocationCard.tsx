import Image from "next/image";
import css from "./LocationCard.module.css";
import type { Location } from "@/types/location";

interface Props {
  location: Location;
}

export default function LocationCard({ location }: Props) {
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
          ⭐ {location.rate.toFixed(1)}
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
      </div>
    </div>
  );
}