import styles from "./Hero.module.css";
import HeroSearchForm from "./HeroSearchForm";

const Hero = () => {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.wrap}>
        <picture className={styles.bgPicture}>
          {/* Desktop: 1440px+ — WebP */}
          <source
            media="(min-width: 1440px)"
            type="image/webp"
            srcSet="/img/Hero/hero-desk@1x.webp 1x, /img/Hero/hero-desk@2x.webp 2x"
          />
          {/* Desktop: 1440px+ — JPG */}
          <source
            media="(min-width: 1440px)"
            srcSet="/img/Hero/hero-desk@1x.jpg 1x, /img/Hero/hero-desk@2x.jpg 2x"
          />
          {/* Tablet: 768px+ — WebP */}
          <source
            media="(min-width: 768px)"
            type="image/webp"
            srcSet="/img/Hero/hero-tab@1x.webp 1x, /img/Hero/hero-tab@2x.webp 2x"
          />
          {/* Tablet: 768px+ — JPG */}
          <source
            media="(min-width: 768px)"
            srcSet="/img/Hero/hero-tab@1x.jpg 1x, /img/Hero/hero-tab@2x.jpg 2x"
          />
          {/* Mobile: fallback — WebP */}
          <source
            type="image/webp"
            srcSet="/img/Hero/hero-mob@1x.webp 1x, /img/Hero/hero-mob@2x.webp 2x"
          />
          {/* Mobile: fallback — JPG */}
          <img
            className={styles.bgImage}
            src="/img/Hero/hero-mob@1x.jpg"
            srcSet="/img/Hero/hero-mob@1x.jpg 1x, /img/Hero/hero-mob@2x.jpg 2x"
            alt=""
            aria-hidden="true"
          />
        </picture>
        <div className={styles.overlay} aria-hidden="true" />
        <div className={`container ${styles.inner}`}>
          <h1 id="hero-heading" className={styles.title}>
            Відкрий для себе Україну. Знайди ідеальне місце для відпочинку
          </h1>
          <p className={styles.subtitle}>
            Тисячі перевірених локацій з реальними фото та відгуками від
            мандрівників.
          </p>
          <HeroSearchForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;
