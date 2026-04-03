'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom'
import styles from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      setMounted(true);
      document.body.style.overflow = '';
    };
  }, []);

    useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >

        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрити модальне вікно"
        >
          <svg className={styles.closeIcon} width="32" height="32">
            <use href="/img/icons.svg#icon-close" />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;