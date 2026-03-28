import styles from './LocationsPage.module.css';
import LocationsGrid from '@/components/LocationsGrid/LocationsGrid';

const LocationsPage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Усі місця відпочинку</h1>

      <LocationsGrid />
    </main>
  );
};

export default LocationsPage;