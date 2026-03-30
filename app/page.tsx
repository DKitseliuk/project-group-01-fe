import AdvantagesBlock from '@/components/AdvantagesBlock/AdvantagesBlock';
import styles from './HomePage.module.css';


const Home = () => {
  return (
    <main className={styles.main}>
      <h1>Home page</h1>
      <AdvantagesBlock />
    </main>
  );
};

export default Home;
