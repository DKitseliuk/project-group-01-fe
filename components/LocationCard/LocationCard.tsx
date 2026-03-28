import styles from './LocationCard.module.css';

type Location = {
  _id: string;
  name: string;
  region: string;
  image: string;
  rate: number;
};

type LocationCardProps = {
  location: Location;
};

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <div className={styles.card}>
      <img
        src={location.image}
        alt={location.name}
        className={styles.image}
      />

      <div className={styles.content}>
        <h3 className={styles.title}>{location.name}</h3>
        <p className={styles.region}>{location.region}</p>
        <p className={styles.rate}>⭐ {location.rate}</p>
      </div>
    </div>
  );
}