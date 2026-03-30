'use client';
import css from './LocationForm.module.css';
import { LOCATION_TYPES, REGIONS } from '@/constants/locationOptions';

const LocationForm = () => {
  return (
    <form className={css.form}>
      <div className={css.fieldGroup}>
        <label className={css.label} htmlFor="image">
          Обкладинка
        </label>

        <div className={css.imageUploadBox}>
          <div className={css.imagePlaceholder}>
          </div>

          <button type="button" className={css.uploadButton}>
            Завантажити фото
          </button>
        </div>
      </div>

      <div className={css.fieldGroup}>
        <label className={css.label} htmlFor="title">
          Назва місця
        </label>
        <input
          className={css.input}
          id="title"
          name="title"
          type="text"
          placeholder="Введіть назву місця"
        />
      </div>

      <div className={css.fieldGroup}>
        <label className={css.label} htmlFor="type">
          Тип місця
        </label>
              <select className={css.select} defaultValue="">
    <option value="" disabled>
    Оберіть тип місця
     </option>

    {LOCATION_TYPES.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
    ))}
            </select>
      </div>

      <div className={css.fieldGroup}>
        <label className={css.label} htmlFor="region">
          Регіон
        </label>
      <select className={css.select} defaultValue="">
  <option value="" disabled>
    Оберіть регіон
  </option>

  {REGIONS.map(region => (
    <option key={region.value} value={region.value}>
      {region.label}
    </option>
  ))}
</select>
        </div>
          
      <div className={css.fieldGroup}>
        <label className={css.label} htmlFor="description">
          Детальний опис
        </label>
        <textarea
          className={css.textarea}
          id="description"
          name="description"
          placeholder="Детальний опис локації"
          rows={6}
        />
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Опублікувати
              </button>
              
          <button type="button" className={css.cancelButton}>
          Відмінити
        </button>      
      </div>
    </form>
  );
};

export default LocationForm;