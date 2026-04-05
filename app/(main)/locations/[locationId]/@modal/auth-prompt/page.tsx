'use client';

import Link from 'next/link';
import Modal from '@/components/Modal/Modal';
import styles from './AuthPromptModal.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

const AuthPromptModal = () => {
  const pathname = usePathname();
  const setRedirectAfterAuth = useAuthStore(
    (state) => state.setRedirectAfterAuth,
  );
  const router = useRouter();

  return (
    <Modal
      onClose={() => {
        router.back();
      }}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>Помилка під час додавання відгуку</h2>

        <p className={styles.text}>
          Щоб залишити відгук, Вам потрібно увійти. Якщо у Вас ще немає
          облікового запису - зареєструйтесь.
        </p>

        <div className={styles.actions}>
          <Link
            href="/login"
            className={styles.loginButton}
            onClick={() => setRedirectAfterAuth(pathname.slice(0, -12))}
          >
            Увійти
          </Link>

          <Link
            href="/register"
            className={styles.registerButton}
            onClick={() => setRedirectAfterAuth(pathname.slice(0, -12))}
          >
            Зареєструватись
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default AuthPromptModal;
