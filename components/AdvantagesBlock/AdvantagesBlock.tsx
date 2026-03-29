import css from './AdvantagesBlock.module.css';


type AdvantageItem = {
  id: number;
  title: string;
  description: string;
  iconId: string;
};

const advantages: AdvantageItem[] = [
  {
    id: 1,
    title: 'Реальні відгуки',
    description:
      'Користувачі діляться чесними враженнями, щоб ви робили правильний вибір.',
    iconId: 'icon-checkbox',
  },
  {
    id: 2,
    title: 'Зручні фільтри',
    description:
      'Шукайте за типом локації, регіоном, наявністю зручностей та іншими критеріями.',
    iconId: 'icon-filter-alt',
  },
  {
    id: 3,
    title: 'Спільнота мандрівників',
    description:
      'Додавайте власні улюблені місця та діліться своїми неймовірними знахідками.',
    iconId: 'icon-communication',
  },
];

const AdvantagesBlock = () => {
  return (
    <section className={css.section} aria-labelledby="advantages-title">
          <div className="container">
        {/* <div className={css.wrapper}> */}
          <h2 id="advantages-title" className={css.title}>
            Ключові переваги
          </h2>

          <ul className={css.list}>
            {advantages.map(({ id, title, description, iconId }) => (
              <li key={id} className={css.card}>
                <svg className={css.icon} aria-hidden="true">
                    <use href={`/img/icons.svg#${iconId}`} />
                </svg>

                <h3 className={css.cardTitle}>{title}</h3>
                <p className={css.cardText}>{description}</p>
              </li>
            ))}
          </ul>
        </div>
      {/* </div> */}
    </section>
  );
};

export default AdvantagesBlock;