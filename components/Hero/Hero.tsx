import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-heading"
    >
      <div className={styles.inner}>
        <h1 id="hero-heading" className={styles.title}>
          Відкрий для себе Україну. Знайди ідеальне місце для відпочинку
        </h1>
        <p className={styles.subtitle}>
          Тисячі перевірених локацій з реальними фото та відгуками від
          мандрівників.
        </p>
        <form className={styles.form} role="search" action="/" method="get">
          <label htmlFor="hero-search" className="visually-hidden">
            Пошук місця відпочинку
          </label>
          <input
            id="hero-search"
            className={styles.input}
            type="search"
            name="q"
            placeholder="Введіть назву, тип або регіон..."
            autoComplete="off"
          />
          <button className={styles.button} type="submit">
            Знайти місце
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
