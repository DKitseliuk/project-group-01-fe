'use client';

import { useRouter, useParams } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import AddReviewForm from '@/components/AddReviewForm/AddReviewForm';
import css from './AddReviewModal.module.css';

interface AddReviewModalProps {
  handleCloseOverride?: () => void;
}

export default function AddReviewModal({
  handleCloseOverride,
}: AddReviewModalProps) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const handleClose = () => {
    if (handleCloseOverride) {
      handleCloseOverride();
      return;
    }
    router.back();
  };

  if (!id) {
    return null;
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.inner}>
        <h2 className={css.title} id="add-review-title">
          Залишити відгук
        </h2>
        <AddReviewForm
          id={id}
          handleSubmit={handleClose}
          handleCancel={handleClose}
        />
      </div>
    </Modal>
  );
}
