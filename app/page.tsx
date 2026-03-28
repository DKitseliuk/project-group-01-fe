import styles from './HomePage.module.css';
import PopularLocationsBlock from "@/components/PopularLocationsBlock/PopularLocationsBlock";
const Home = () => {
  return (
    <main className={styles.main}>
      <h1>Home page</h1>
       <PopularLocationsBlock />
    </main>
  );
};

export default Home;
