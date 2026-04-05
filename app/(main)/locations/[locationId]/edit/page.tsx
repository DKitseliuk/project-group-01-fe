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

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

export async function generateMetadata({
  params,
}: EditLocationPageProps): Promise<Metadata> {
  const { locationId } = await params;

  const location = await fetchLocationById(locationId);

  return {
    title: `Редагування: ${location.name}`,
    description: `Редагування інформації про локацію "${location.name}"`,
    openGraph: {
      title: `Редагування: ${location.name}`,
      description: `Редагування інформації про локацію "${location.name}"`,
      url: `${FRONTEND_URL}/locations/action/edit/${locationId}`,
      images: [
        {
          url: location.image || `${FRONTEND_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: location.name,
        },
      ],
    },
  };
}

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
