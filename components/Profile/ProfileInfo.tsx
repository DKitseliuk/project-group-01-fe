import Image from 'next/image';
import styles from './ProfileInfo.module.css';

type ProfileInfoProps = {
  name: string;
  avatarUrl: string;
  articlesAmount: number;
};

export const ProfileInfo = ({ name, avatarUrl, articlesAmount }: ProfileInfoProps) => {
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
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.articles}>Статей: {articlesAmount}</p>
      </div>
    </div>
  );
};