import AdvantagesBlock from '@/components/AdvantagesBlock/AdvantagesBlock';
import styles from './HomePage.module.css';
import PopularLocationsBlock from '@/components/PopularLocationsBlock/PopularLocationsBlock';
const Home = () => {
  return (
    <main className={styles.main}>
      <AdvantagesBlock />
      <PopularLocationsBlock />
    </main>
  );
};

export default Home;
