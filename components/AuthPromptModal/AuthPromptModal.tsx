'use client';

import Link from 'next/link';
import Modal from '@/components/Modal/Modal';
import styles from './AuthPromptModal.module.css';

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthPromptModal = ({ isOpen, onClose }: AuthPromptModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Помилка під час додавання відгуку</h2>

      <p className={styles.text}>
        Щоб залишити відгук, Вам потрібно увійти. Якщо у Вас ще немає
        облікового запису - зареєструйтесь.
      </p>

      <div className={styles.actions}>
        <Link href="/login" className={styles.loginButton} onClick={onClose}>
          Увійти
        </Link>

        <Link
          href="/register"
          className={styles.registerButton}
          onClick={onClose}
        >
          Зареєструватись
        </Link>
      </div>
    </Modal>
  );
};

export default AuthPromptModal;