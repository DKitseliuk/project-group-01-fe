import styles from './LocationDetailsPage.module.css';
import { LocationInfoBlock } from '@/components/LocationInfoBlock/LocationInfoBlock';

const LocationDetailsPage = () => {
  return (
    <main className={styles.main}>
      <LocationInfoBlock
        title="Бакотська затока"
        rating={4.5}
        region="Хмельницький"
        type="Пляж"
        authorId="1"
        authorName="Анастасія Сопільник"
        imageSrc="/img/Placeholder%20Image.jpg"
      />
    </main>
  );
};

export default LocationDetailsPage;
