import LeaveReviewSection from '@/components/LeaveReviewSection/LeaveReviewSection';
import { LocationGallery } from '@/components/LocationGallery/LocationGallery';
import { LocationInfoBlock } from '@/components/LocationInfoBlock/LocationInfoBlock';
import { LocationDescription } from '@/components/LocationDescription/LocationDescription';
import { fetchLocationById, getReviewsForLocation } from '@/lib/api/serverApi';
import styles from './LocationDetailsPage.module.css';

interface LocationDetailsPageProps {
  params: Promise<{ id: string }>;
}

const LocationDetailsPage = async ({ params }: LocationDetailsPageProps) => {
  const { id } = await params;

  const location = await fetchLocationById(id);
 
  const data = await getReviewsForLocation(id);

  return (
    <main className={styles.main}>
      <div className="container">
        <section className={styles.locationSectionBg}>
          <div className={styles.topContainer}>
            <div className={styles.topRow}>
              <div className={styles.gallery}>
                <LocationGallery
                  imageSrc={location.image}
                  imageAlt={location.name}
                />
              </div>

              <div className={styles.info}>
                <LocationInfoBlock
                  title={location.name}
                  rating={location.rate}
                  region="Хмельницький"
                  type="Пляж"
                  authorId="1"
                  authorName={location.ownerId.name}
                />
              </div>
            </div>
          </div>

          <div className={styles.descriptionContainer}>
            <LocationDescription text={location.description} />
          </div>
        </section>

        <LeaveReviewSection id={id} reviews={data.feedbacks} />
      </div>
    </main>
  );
};

export default LocationDetailsPage;
