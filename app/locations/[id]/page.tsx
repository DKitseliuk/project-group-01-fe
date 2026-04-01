import LeaveReviewSection from '@/components/LeaveReviewSection/LeaveReviewSection';
import { LocationGallery } from '@/components/LocationGallery/LocationGallery';
import { LocationInfoBlock } from '@/components/LocationInfoBlock/LocationInfoBlock';
import { LocationDescription } from '@/components/LocationDescription/LocationDescription';
import styles from './LocationDetailsPage.module.css';

interface LocationDetailsPageProps {
  params: Promise<{ id: string }>;
}

const LocationDetailsPage = async ({ params }: LocationDetailsPageProps) => {
  const { id } = await params;

  return (
    <main className={styles.main}>
      <div className="container">
      <section className={styles.locationSectionBg}>
        <div className={styles.topContainer}>
          <div className={styles.topRow}>
            <div className={styles.gallery}>
              <LocationGallery
                imageSrc="/img/Placeholder%20Image.jpg"
                imageAlt="Бакотська затока"
              />
            </div>

            <div className={styles.info}>
              <LocationInfoBlock
                title="Бакотська затока"
                rating={4.5}
                region="Хмельницький"
                type="Пляж"
                authorId="1"
                authorName="Анастасія Сопільник"
              />
            </div>
          </div>
        </div>

        <div className={styles.descriptionContainer}>
          <LocationDescription
            text={`"Бакотська затока — це справжня перлина Поділля, яку часто називають "українською Атлантидою". Розташована на річці Дністер, вона вражає своїми масштабами та неймовірними панорамними краєвидами, що відкриваються з високих скелястих берегів. Це місце з унікальною енергетикою, де поєднуються тиша, велич природи та багата історія затопленого села Бакота.
                \nТут можна насолодитися неспішними прогулянками вздовж берега, влаштувати пікнік з видом на затоку або вирушити на водну прогулянку на човні чи каяку. Завдяки унікальному мікроклімату, схожому на ялтинський, це місце ідеально підходить для відпочинку з наметами. Поруч знаходиться скельний монастир, що додає цій локації історичної та духовної цінності. Бакота — це ідеальний вибір для тих, хто шукає спокою, єднання з природою та незабутніх вражень."`}
          />
        </div>
      </section>
      
        <LeaveReviewSection id={id} feedbacks={[]} />
      </div>
    </main>
  );
};

export default LocationDetailsPage;
