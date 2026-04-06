import styles from './LocationDetailsPage.module.css';
import { LocationGallery } from '@/components/LocationGallery/LocationGallery';
import { LocationInfoBlock } from '@/components/LocationInfoBlock/LocationInfoBlock';
import { LocationDescription } from '@/components/LocationDescription/LocationDescription';
import LeaveReviewSection from '@/components/LeaveReviewSection/LeaveReviewSection';
import { fetchLocationById, getReviewsForLocation } from '@/lib/api/serverApi';
import { notFound } from 'next/navigation';
import type { FeedbackItem } from '@/types/review';
import MapBox from '@/components/MapBox/MapBox';

type Props = {
  params: Promise<{ locationId: string }>;
};

const LocationDetailsPage = async ({ params }: Props) => {
  const { locationId } = await params;
  const location = await fetchLocationById(locationId).catch(() => notFound());

  let feedbacks: FeedbackItem[] = [];
  try {
    const reviewData = await getReviewsForLocation(locationId);
    feedbacks = reviewData.feedbacks ?? [];
  } catch {
    feedbacks = [];
  }

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.top}>
              <LocationGallery
                imageSrc={location.image || '/img/Placeholder%20Image.jpg'}
                imageAlt={location.name}
              />

              <LocationInfoBlock location={location} />
            </div>
            <div className={styles.bottom}>
              <LocationDescription text={location.description} />
              {location?.coordinates && (
                <MapBox coordinates={location?.coordinates} />
              )}
            </div>
          </div>
          <LeaveReviewSection
            id={locationId}
            locationName={location.name}
            feedbacks={feedbacks}
          />
        </div>
      </section>
    </main>
  );
};

export default LocationDetailsPage;
