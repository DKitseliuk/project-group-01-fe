'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import css from './LocationForm.module.css';
import { LOCATION_TYPES, REGIONS } from '@/constants/locationOptions';

type FormValues = {
    title: string;
    type: string;
    region: string;
    description: string;
    image: File | null;
};

const validationSchema = Yup.object({
    title: Yup.string()
        .trim()
        .min(3, 'Назва має містити щонайменше 3 символи')
        .max(100, 'Назва має містити не більше 100 символів')
        .required("Введіть назву місця"),
    type: Yup.string().required('Оберіть тип місця'),
    region: Yup.string().required('Оберіть регіон'),
    description: Yup.string()
        .trim()
        .min(10, 'Опис має містити щонайменше 10 символів')
        .max(1000, 'Опис має містити не більше 1000 символів')
        .required('Додайте детальний опис'),
    image: Yup.mixed()
        .nullable()
        .required('Додайте фото')
        .test('fileSize', 'Розмір фото має бути менше 5 MB', value => {
            if (!value) return true;
            return value.size <= 5 * 1024 * 1024;
        })
        .test('fileFormat', 'Дозволені лише JPG, JPEG, PNG, WEBP', value => {
            if (!value) return true;
            return ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(value.type);
        }),
});

const initialValues: FormValues = {
    title: '',
    type: '',
    region: '',
    description: '',
    image: null,
};

const LocationForm = () => {
    const [preview, setPreview] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        try {
            console.log('Form values:', values);

            // Тут буде запит на бекенд / dispatch / mutation
            // Наприклад:
            // await createLocation(values);

            actions.resetForm();
            setPreview('');
        } catch (error) {
            console.error('Submit error:', error);
            actions.setStatus('Сталася помилка під час публікації. Спробуйте ще раз.');
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, isValid, isSubmitting, touched, errors, status }) => {
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
                                Обкладинка
                            </label>

                            <div className={css.upload}>
                                <div className={css.imageUploadBox}>
                                    <Image
                                        src={preview || '/img/PlaceholderImageCreate.jpg'}
                                        alt={preview ? 'Завантажене фото' : 'Placeholder'}
                                        fill
                                        className={css.uploadedImage}
                                        sizes="(min-width: 1440px) 1091px, (min-width: 768px) 100vw, 100vw"
                                        priority
                                    />
                                </div>

                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/jpg"
                                    className={css.hiddenInput}
                                    onChange={handleImageChange}
                                />

                                <label htmlFor="image" className={css.uploadButton}>
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
                            {/* <Field
                                as="select"
                                className={`${css.select} ${touched.type && errors.type ? css.inputError : ''
                                    }`}
                                id="type"
                                name="type"
                            >
                                <option value="" disabled>
                                    Оберіть тип місця
                                </option>
                                {LOCATION_TYPES.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Field> */}

                            <Field
                            as="select"
                            id="type"
                            name="type"
                            className={`
                             ${css.select}
                            ${!values.type ? css.selectPlaceholder : ''}
                            ${touched.type && errors.type ? css.inputError : ''}
                            `}>
                            <option value="" disabled>
                            Оберіть тип місця
                             </option>

                            {LOCATION_TYPES.map(option => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                            ))}
                            </Field>
                            
                            <ErrorMessage name="type" component="p" className={css.errorMessage} />
                        </div>

                        <div className={css.fieldGroup}>
                            <label className={css.label} htmlFor="region">
                                Регіон
                            </label>
                            {/* <Field
                                as="select"
                                className={`${css.select} ${touched.region && errors.region ? css.inputError : ''
                                    }`}
                                id="region"
                                name="region"
                            >
                                <option value="" disabled>
                                    Оберіть регіон
                                </option>
                                {REGIONS.map(region => (
                                    <option key={region.value} value={region.value}>
                                        {region.label}
                                    </option>
                                ))}
                            </Field> */}
                            <Field
                                as="select"
                                id="region"
                                name="region"
                                className={`
                                ${css.select}
                                ${!values.region ? css.selectPlaceholder : ''}
                                ${touched.region && errors.region ? css.inputError : ''}
                                    `}>
                                <option value="" disabled>
                                    Оберіть регіон
                                </option>

                                {REGIONS.map(region => (
                                    <option key={region.value} value={region.value}>
                                        {region.label}
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

                        {status ? <p className={css.submitError}>{status}</p> : null}

                        <div className={css.actions}>
                            <button
                                type="submit"
                                className={css.submitButton}
                                disabled={!isValid || isSubmitting}
                            >
                                {isSubmitting ? 'Публікація...' : 'Опублікувати'}
                            </button>

                            <button type="reset" className={css.cancelButton}>
                                Відмінити
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LocationForm;




//         <form className={css.form}>
//             <div className={css.fieldGroup}>
//                 <label className={css.label} htmlFor="image">
//                     Обкладинка
//                 </label>

//                 <div className={css.upload}>
//                     <div className={css.imageUploadBox}>
//                         {preview ? (
//                             <Image
//                                 src={preview}
//                                 alt="Завантажене фото"
//                                 fill
//                                 className={css.uploadedImage}
//                             />
//                         ) : (
//                             <Image
//                                 src="/img/PlaceholderImageCreate.jpg"
//                                 alt="Placeholder"
//                                 fill
//                                 className={css.uploadedImage}
//                             />
//                         )}
//                     </div>

//                     <button type="button" className={css.uploadButton}>
//                         Завантажити фото
//                     </button>
//                 </div>
//             </div>

//             <div className={css.fieldGroup}>
//                 <label className={css.label} htmlFor="title">
//                     Назва місця
//                 </label>
//                 <input
//                     className={css.input}
//                     id="title"
//                     name="title"
//                     type="text"
//                     placeholder="Введіть назву місця"
//                 />
//             </div>

//             <div className={css.fieldGroup}>
//                 <label className={css.label} htmlFor="type">
//                     Тип місця
//                 </label>
//                 <select className={css.select} id="type" name="type" defaultValue="">
//                     <option value="" disabled>
//                         Оберіть тип місця
//                     </option>

//                     {LOCATION_TYPES.map(option => (
//                         <option key={option.value} value={option.value}>
//                             {option.label}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <div className={css.fieldGroup}>
//                 <label className={css.label} htmlFor="region">
//                     Регіон
//                 </label>
//                 <select className={css.select} id="region" name="region" defaultValue="">
//                     <option value="" disabled>
//                         Оберіть регіон
//                     </option>

//                     {REGIONS.map(region => (
//                         <option key={region.value} value={region.value}>
//                             {region.label}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <div className={css.fieldGroup}>
//                 <label className={css.label} htmlFor="description">
//                     Детальний опис
//                 </label>
//                 <textarea
//                     className={css.textarea}
//                     id="description"
//                     name="description"
//                     placeholder="Детальний опис локації"
//                     rows={6}
//                 />
//             </div>

//             <div className={css.actions}>
//                 <button type="submit" className={css.submitButton}>
//                     Опублікувати
//                 </button>

//                 <button type="button" className={css.cancelButton}>
//                     Відмінити
//                 </button>
//             </div>
//         </form>
//     );