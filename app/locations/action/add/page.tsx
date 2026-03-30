import styles from './CreateLocationPage.module.css';
import  LocationForm  from '../../../../components/LocationForm/LocationForm';

const CreateLocationPage = () => {
  return (
    <section className={styles.section} aria-labelledby="location-form-title">
      <div className="container">
        <h1 className={styles.title}>Додавання нового місця</h1>
        <LocationForm />
      </div>
    </section>
  );
};

export default CreateLocationPage;