'use client';

import Link from 'next/link';
import Modal from '@/components/Modal/Modal';
import styles from './AuthPromptModal.module.css';

interface AuthPromptModalProps {
  onClose: () => void;
}

const AuthPromptModal = ({ onClose }: AuthPromptModalProps) => {
  return (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h2 className={styles.title}>Помилка під час додавання відгуку</h2>

        <p className={styles.text}>
          Щоб залишити відгук, Вам потрібно увійти. Якщо у Вас ще немає
          облікового запису - зареєструйтесь.
        </p>

        <div className={styles.actions}>
          <Link href="/login" className={styles.loginButton} onClick={onClose}>
            Увійти
          </Link>

          <Link href="/register" className={styles.registerButton}>
            Зареєструватись
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default AuthPromptModal;
