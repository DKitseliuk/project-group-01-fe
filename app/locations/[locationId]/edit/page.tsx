import styles from './EditLocationPage.module.css';
import  LocationForm  from '../../../../components/LocationForm/LocationForm';
import type { Metadata } from 'next';
import { fetchLocationById } from '@/lib/api/serverApi';
import {notFound } from 'next/navigation';



export async function generateMetadata(
  { params }: EditLocationPageProps
): Promise<Metadata> {
  const { locationId } = await params;

  const location = await fetchLocationById(locationId).catch(() => null);

  if (!location) {
    return {
      title: 'Локацію не знайдено',
      description: 'Запитувана локація не існує або була видалена',
    };
  }

  return {
    title: `Редагування: ${location.name}`,
    description: `Редагування інформації про локацію "${location.name}"`,
    openGraph: {
      title: `Редагування: ${location.name}`,
      description: `Редагування інформації про локацію "${location.name}"`,
      url: `https://project-group-01-fe.vercel.app/locations/${locationId}/edit`,
      images: [
        {
          url: location.image || 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}


type EditLocationPageProps = {
  params: Promise<{
    locationId: string;
  }>;
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


