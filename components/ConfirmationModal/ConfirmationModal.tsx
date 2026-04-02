'use client';

import Modal from '@/components/Modal/Modal';
import styles from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = ({ onClose, onConfirm, }: ConfirmationModalProps) => {
  return (
    <Modal onClose={onClose}>
      <div className={styles.content}>
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
      </div>
    </Modal>
  );
};

export default ConfirmationModal;