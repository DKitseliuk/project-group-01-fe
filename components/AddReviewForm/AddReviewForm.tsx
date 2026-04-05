'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { createReview } from '@/lib/api/clientApi';
import css from './AddReviewForm.module.css';

export type AddReviewFormValues = {
  rating: number;
  review: string;
};

const initialValues: AddReviewFormValues = {
  rating: 0,
  review: '',
};

const reviewSchema = Yup.object({
  rating: Yup.number()
    .min(1, 'Оберіть оцінку від 1 до 5')
    .max(5)
    .required('Оберіть оцінку'),
  review: Yup.string()
    .trim()
    .min(1, 'Відгук має містити щонайменше 1 символ')
    .max(200, 'Відгук не може перевищувати 200 символів')
    .required('Введіть текст відгуку'),
});

interface AddReviewFormProps {
  id: string;
  handleSubmit: () => void;
  handleCancel: () => void;
}

function getErrorMessage(err: unknown): string {
  if (isAxiosError(err)) {
    const data = err.response?.data as { message?: string } | undefined;
    if (data?.message && typeof data.message === 'string') return data.message;
    if (err.message) return err.message;
  }
  if (err instanceof Error) return err.message;
  return 'Не вдалося надіслати відгук. Спробуйте ще раз.';
}

export default function AddReviewForm({
  id,
  handleSubmit: onSuccessfulSubmit,
  handleCancel,
}: AddReviewFormProps) {
  const fieldId = useId();

  const mutation = useMutation({
    mutationFn: (values: AddReviewFormValues) =>
      createReview(id, { rate: values.rating, description: values.review }),
    onSuccess: () => {
      toast.success('Дякуємо! Ваш відгук надіслано на модерацію.');
      onSuccessfulSubmit();
    },
    onError: (err: unknown) => {
      toast.error(getErrorMessage(err));
    },
  });

  const handleSubmit = (values: AddReviewFormValues) =>
    mutation.mutateAsync(values);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={reviewSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched, isSubmitting }) => (
        <Form className={css.form} noValidate>
          <div className={css.reviewField}>
            <label className={css.label} htmlFor={`${fieldId}-review`}>
              Ваш відгук
            </label>
            <Field
              id={`${fieldId}-review`}
              as="textarea"
              name="review"
              rows={6}
              placeholder="Напишіть ваш відгук"
              className={`${css.textarea} ${errors.review && touched.review ? css.textareaError : ''}`}
              aria-invalid={Boolean(errors.review && touched.review)}
              aria-describedby={
                errors.review && touched.review
                  ? `${fieldId}-review-error`
                  : undefined
              }
            />
            <ErrorMessage
              name="review"
              component="span"
              className={css.error}
            />
          </div>

          <div>
            <div className={css.stars} role="group" aria-label="Оцінка">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled = values.rating >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    className={css.starButton}
                    aria-label={`${star} з 5 зірок`}
                    aria-pressed={filled}
                    onClick={() => setFieldValue('rating', star)}
                  >
                    <svg
                      className={css.starIcon}
                      viewBox="0 0 32 32"
                      aria-hidden
                    >
                      <use
                        href={
                          filled
                            ? '/img/icons.svg#icon-star-filled'
                            : '/img/icons.svg#icon-star-rate'
                        }
                      />
                    </svg>
                  </button>
                );
              })}
            </div>
            <ErrorMessage
              name="rating"
              component="span"
              className={css.error}
            />
          </div>

          {(isSubmitting || mutation.isPending) && (
            <p className={css.loadingNote} aria-live="polite">
              Завантаження...
            </p>
          )}

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Відмінити
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              Надіслати
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
