'use client';

import { useRouter, useParams, notFound } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import AddReviewForm from '@/components/AddReviewForm/AddReviewForm';
import css from './AddReviewModal.module.css';

export default function AddReviewModal() {
  const router = useRouter();
  const params = useParams<{ locationId: string }>();
  const locationId = params.locationId;

  if (!locationId) {
    notFound();
  }

  const handleClose = () => {
    router.back();
  };
  const handleSubmit = () => {
    router.back();
    router.refresh();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.inner}>
        <h2 className={css.title} id="add-review-title">
          Залишити відгук
        </h2>
        <AddReviewForm
          id={locationId}
          handleSubmit={handleSubmit}
          handleCancel={handleClose}
        />
      </div>
    </Modal>
  );
}
