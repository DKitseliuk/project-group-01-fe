import styles from './EditLocationPage.module.css';
import  LocationForm  from '../../../../components/LocationForm/LocationForm';
import { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Edit Location',
  description: 'Edit an existing location',
};

type EditLocationPageProps = {
  params: Promise<{
    locationId: string;
  }>;
};

const EditLocationsPage = async ({ params }: EditLocationPageProps) => {
  const { locationId } = await params;

  return (
    <main>
    <section className={styles.section} aria-labelledby="location-form-title">
      <div className="container">
        <h1 className={styles.title}>Редагування місця</h1>
        <LocationForm mode="edit" locationId={locationId} />
      </div>
    </section>
    </main>
  );
};

export default EditLocationsPage;


