import Image from 'next/image';
import styles from './ProfileInfo.module.css';
import Link from 'next/link';

type ProfileInfoProps = {
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  isOwnProfile: boolean;
};

export const ProfileInfo = ({ name, avatarUrl, articlesAmount, isOwnProfile }: ProfileInfoProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <Image
            src={avatarUrl || 'https://ac.goit.global/fullstack/react/default-avatar.jpg'}
            alt={name || 'Аватар користувача'}
          width={145}
          height={145}
        />
      </div>
      <div className={styles.infoRow}>
        <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.articles}>Статей: {articlesAmount}</p>
        </div>
        {isOwnProfile && (
          <Link href="/profile/edit" className={styles.editBtn}>
            Редагувати профіль
          </Link>
        )}

      </div>
    </div>
  );
};