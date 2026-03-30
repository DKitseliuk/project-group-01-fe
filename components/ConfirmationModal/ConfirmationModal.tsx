'use client';

import Modal from '@/components/Modal/Modal';
import styles from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Ви точно хочете вийти?</h2>
      <p className={styles.text}>Ми будемо сумувати за Вами!</p>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onClose}
        >
          Відмінити
        </button>

        <button
          type="button"
          className={styles.confirmButton}
          onClick={onConfirm}
        >
          Вийти
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;