import styles from './EditLocationPage.module.css';
import LocationForm from '../../../../../components/LocationForm/LocationForm';
import type { Metadata } from 'next';
import { fetchLocationById } from '@/lib/api/serverApi';
import { notFound } from 'next/navigation';

type EditLocationPageProps = {
  params: Promise<{
    locationId: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Редагувати локацію',
  description: 'Редагування локації на Relax Map.',
  robots: { index: false },
};

const EditLocationsPage = async ({ params }: EditLocationPageProps) => {
  const { locationId } = await params;
  const location = await fetchLocationById(locationId).catch(() => notFound());

  return (
    <main>
      <section className={styles.section} aria-labelledby="location-form-title">
        <div className="container">
          <h1 className={styles.title}>Редагування місця</h1>
          <LocationForm mode="edit" location={location} />
        </div>
      </section>
    </main>
  );
};

export default EditLocationsPage;
