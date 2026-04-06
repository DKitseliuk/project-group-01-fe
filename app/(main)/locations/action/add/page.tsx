import styles from './CreateLocationPage.module.css';
import LocationForm from '../../../../../components/LocationForm/LocationForm';
import { Metadata } from 'next';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Створення локації',
  description: 'Сторінка для створення нової локації',

  openGraph: {
    title: 'Створення локації',
    description: 'Сторінка для створення нової локації',
    url: `${FRONTEND_URL}/locations/action/add`,
    images: [
      {
        url: `${FRONTEND_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Створення локації',
      },
    ],
  },
};

const CreateLocationPage = () => {
  return (
    <main>
      <section className={styles.section} aria-labelledby="location-form-title">
        <div className="container">
          <h1 className={styles.title}>Додавання нового місця</h1>
          <LocationForm />
        </div>
      </section>
    </main>
  );
};

export default CreateLocationPage;
