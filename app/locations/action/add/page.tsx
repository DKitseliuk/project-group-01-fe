import styles from './CreateLocationPage.module.css';
import  LocationForm  from '../../../../components/LocationForm/LocationForm';
import { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Create Location',
  description: 'Create a new location',
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