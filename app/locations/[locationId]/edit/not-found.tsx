import Link from 'next/link';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>

        <p className={styles.text}>
          Локація, яку Ви намагаєтесь редагувати, не знайдена
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.primaryBtn}>
            На головну
          </Link>

           <Link href="/profile" className={styles.secondaryBtn}>
            Мій профіль
          </Link>


          <Link href="/profile/locations" className={styles.secondaryBtn}>
            Мої локації
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;