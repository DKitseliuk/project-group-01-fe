import styles from './LocationDetailsPage.module.css';
import { LocationGallery } from '@/components/LocationGallery/LocationGallery';
import { LocationInfoBlock } from '@/components/LocationInfoBlock/LocationInfoBlock';
import { LocationDescription } from '@/components/LocationDescription/LocationDescription';
import LocationMap from '@/components/LocationMap/LocationMap';
import { fetchLocationById } from '@/lib/api/serverApi';
import { notFound } from 'next/navigation';
import type { LocationOwner } from '@/types/location';

type Props = {
  params: Promise<{ locationId: string }>;
};

const humanize = (value: string) =>
  value
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const LocationDetailsPage = async ({ params }: Props) => {
  const { locationId } = await params;
  const location = await fetchLocationById(locationId).catch(() => notFound());

  const owner =
    typeof location.ownerId === 'string'
      ? null
      : (location.ownerId as LocationOwner);

  const authorId = owner?._id ?? '';
  const authorName = owner?.name ?? '—';

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

              <LocationInfoBlock
                className={styles.info}
                title={location.name}
                rating={location.rate}
                region={humanize(location.region)}
                type={humanize(location.locationType)}
                authorId={authorId}
                authorName={authorName}
              />
            </div>

            <LocationDescription text={location.description} />

            <LocationMap
              region={location.region}
              locationName={location.name}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LocationDetailsPage;