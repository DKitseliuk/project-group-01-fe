import Link from 'next/link';
import styles from './NotFound.module.css';
const NotFound = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.text}>Ресурс не знайдено!</p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primaryBtn}>
            На головну
          </Link>
          <Link href="/locations" className={styles.secondaryBtn}>
            До локацій
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
