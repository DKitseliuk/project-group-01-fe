'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import css from './LocationForm.module.css';
import { useQuery } from '@tanstack/react-query';
import { categoriesOptionsClient } from '@/lib/queries/categoriesClient';
import { locationValidationSchema } from '@/validation/locationValidationSchema';
import type { LocationFormValues } from '@/types/location';
import { createLocation } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast"


const initialValues: LocationFormValues = {
    title: '',
    type: '',
    region: '',
    description: '',
    image: null,
};

const LocationForm = () => {
    const [preview, setPreview] = useState<string>('');
    const router = useRouter();

    const { data: locationTypes = [] } = useQuery(categoriesOptionsClient.locationTypes);
    const { data: regions = [] } = useQuery(categoriesOptionsClient.regions);

  const handleSubmit = async (
  values: LocationFormValues,
  actions: FormikHelpers<LocationFormValues>
) => {
  try {
    const createdLocation = await createLocation({
      title: values.title.trim(),
      type: values.type,
      region: values.region,
      description: values.description.trim(),
      image: values.image instanceof File ? values.image : null,
    });

    // actions.resetForm();
    // setPreview('');

    router.push(`/locations/${createdLocation._id}`);
  } catch (error) {
    console.error('Submit error:', error);
    toast.error('Сталася помилка під час публікації. Спробуйте ще раз.');
  } finally {
    actions.setSubmitting(false);
  }
};
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={locationValidationSchema}
            validateOnMount
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, resetForm, isValid, isSubmitting, touched, errors }) => {
                const isFormFilled =
                    values.title.trim() !== '' &&
                    values.type.trim() !== '' &&
                    values.region.trim() !== '' &&
                    values.description.trim() !== '' &&
                    values.image !== null;
                const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.currentTarget.files?.[0] ?? null;
                    setFieldValue('image', file);

                    if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setPreview(imageUrl);
                    } else {
                        setPreview('');
                    }
                };

                return (
                    <Form className={css.form}>
                        <div className={css.fieldGroup}>
                            <label className={css.label} htmlFor="image">
                                {values.image ? 'Обкладинка статті' : 'Обкладинка'}
                            </label>

                            <div className={css.upload}>
                                {!preview && (
                                    <label
                                        htmlFor="image"
                                        className={`${css.uploadButton} ${css.desktopTopButton}`}
                                    >
                                        Завантажити фото
                                    </label>
                                )}

                                <div className={css.imageUploadBox}>
                                    <Image
                                        src={preview || '/img/PlaceholderImageCreate.jpg'}
                                        alt={preview ? 'Завантажене фото' : 'Placeholder'}
                                        fill
                                        className={css.uploadedImage}
                                        sizes="(min-width: 1440px) 1091px, (min-width: 768px) 100vw, 100vw"
                                    />
                                </div>

                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    className={css.hiddenInput}
                                    onChange={handleImageChange}
                                />

                                <label
                                    htmlFor="image"
                                    className={`${css.uploadButton} ${preview ? css.desktopBottomButton : ''}`}
                                >
                                    Завантажити фото
                                </label>

                                <ErrorMessage name="image" component="p" className={css.errorMessage} />
                            </div>

                        </div>

                        <div className={css.fieldGroup}>
                            <label className={css.label} htmlFor="title">
                                Назва місця
                            </label>
                            <Field
                                className={`${css.input} ${touched.title && errors.title ? css.inputError : ''
                                    }`}
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Введіть назву місця"
                            />
                            <ErrorMessage name="title" component="p" className={css.errorMessage} />
                        </div>

                        <div className={css.fieldGroup}>
                            <label className={css.label} htmlFor="type">
                                Тип місця
                            </label>

                            <Field
                                as="select"
                                id="type"
                                name="type"
                                className={`
    ${css.select}
    ${!values.type ? css.selectPlaceholder : ''}
    ${touched.type && errors.type ? css.inputError : ''}
  `}
                            >
                                <option value="" disabled>
                                    Оберіть тип місця
                                </option>

                                {locationTypes.map(({ _id, type }) => (
                                    <option key={_id} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Field>

                            <ErrorMessage name="type" component="p" className={css.errorMessage} />
                        </div>

                        <div className={css.fieldGroup}>
                            <label className={css.label} htmlFor="region">
                                Регіон
                            </label>
                            <Field
                                as="select"
                                id="region"
                                name="region"
                                className={`
    ${css.select}
    ${!values.region ? css.selectPlaceholder : ''}
    ${touched.region && errors.region ? css.inputError : ''}
  `}
                            >
                                <option value="" disabled>
                                    Оберіть регіон
                                </option>

                                {regions.map(({ _id, region }) => (
                                    <option key={_id} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="region" component="p" className={css.errorMessage} />
                        </div>

                        <div className={css.fieldGroup}>
                            <label className={css.label} htmlFor="description">
                                Детальний опис
                            </label>
                            <Field
                                as="textarea"
                                className={`${css.textarea} ${touched.description && errors.description ? css.inputError : ''
                                    }`}
                                id="description"
                                name="description"
                                placeholder="Детальний опис локації"
                                rows={6}
                            />
                            <ErrorMessage name="description" component="p" className={css.errorMessage} />
                        </div>

                        <div className={css.actions}>
                            <button
                                type="submit"
                                className={css.submitButton}
                                disabled={!isValid || isSubmitting}
                            >
                                {isSubmitting
                                    ? 'Публікація...'
                                    : isFormFilled
                                        ? 'Зберегти'
                                        : 'Опублікувати'}
                            </button>

                            <button
                                type="button"
                                className={css.cancelButton}
                                onClick={() => {
                                    resetForm();
                                    setPreview('');
                                }}
                            >
                                Відмінити
                            </button>
                            {/* <button type="reset" className={css.cancelButton}>
                                Відмінити
                            </button> */}
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LocationForm;


