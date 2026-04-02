import * as Yup from 'yup';


export const locationValidationSchema = Yup.object({
    title: Yup.string()
        .trim()
        .min(3, 'Назва має містити щонайменше 3 символи')
        .max(96, 'Назва має містити не більше 100 символів')
        .required("Введіть назву місця"),
    type: Yup.string().max(64).required('Оберіть тип місця'),
    region: Yup.string().max(64).required('Оберіть регіон'),
    description: Yup.string()
        .trim()
        .min(20, 'Опис має містити щонайменше 20 символів')
        .max(6000, 'Опис має містити не більше 6000 символів')
        .required('Додайте детальний опис'),
    image: Yup.mixed()
        .nullable()
        .required('Додайте фото')
        .test('fileSize', 'Розмір фото має бути менше 1 MB', value => {
            if (!value) return true;
            if (!(value instanceof File)) return false;

            return value.size <= 1 * 1024 * 1024;
        })
        .test('fileFormat', 'Дозволені лише JPG та PNG', value => {
            if (!value) return true;
            if (!(value instanceof File)) return false;

            return ['image/jpeg', 'image/png'].includes(value.type);
        }),
});