import Image from 'next/image';
import Link from 'next/link';
import styles from './LocationInfoBlock.module.css';

type LocationInfoBlockProps = {
  title: string;
  rating?: number;
  region: string;
  type: string;
  authorId: string;
  authorName: string;
  imageSrc: string;
  imageAlt?: string;
};

export const LocationInfoBlock = ({
  title,
  rating,
  region,
  type,
  authorId,
  authorName,
  imageSrc,
  imageAlt,
}: LocationInfoBlockProps) => {
  const hasRating = typeof rating === 'number' && !Number.isNaN(rating);
  const ratingRounded = hasRating ? Math.round(rating * 2) / 2 : 0;
  const ratingText = hasRating ? rating.toFixed(1) : null;

  return (
    <section
      className={styles.locationInfoBlock}
      aria-labelledby="location-title"
    >
      <div className={styles.inner}>
        {/* Info */}
        <div className={styles.content}>
          {/* Rating */}
          <div className={styles.ratingRow}>
            <span className={styles.stars} aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => {
                const starValue = ratingRounded - index;
                const iconId =
                  starValue >= 1
                    ? 'icon-star-filled'
                    : starValue === 0.5
                      ? 'icon-star-half'
                      : 'icon-star-rate';

                return (
                  <svg
                    key={`star-${index}`}
                    width="24"
                    height="24"
                    className={styles.starIcon}
                    aria-hidden="true"
                  >
                    <use href={`/img/icons.svg#${iconId}`} />
                  </svg>
                );
              })}
            </span>
            <span className={styles.ratingValue}>
              {ratingText ?? '—'}
            </span>
          </div>

          {/* Title */}
          <h1 id="location-title" className={styles.title}>
            {title}
          </h1>

          {/* Meta */}
          <div className={styles.metaList}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Регіон:</span>
              <span className={styles.metaText}>{region}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Тип локації:</span>
              <span className={styles.metaText}>{type}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Автор статті:</span>
              <Link
                href={`/profile/${authorId}`}
                className={`${styles.metaText} ${styles.metaTextLink}`}
              >
                {authorName}
              </Link>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className={styles.imageWrapper}>
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            sizes="(min-width: 1440px) 760px, 100vw"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};
