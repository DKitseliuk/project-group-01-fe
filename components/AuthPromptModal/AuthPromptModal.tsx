'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import css from './AuthPromptModal.module.css';

interface AuthPromptModalProps {
  handleCloseOverride?: () => void;
}

export default function AuthPromptModal({
  handleCloseOverride,
}: AuthPromptModalProps) {
  const router = useRouter();

  const handleClose = () => {
    if (handleCloseOverride) {
      handleCloseOverride();
      return;
    }
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.inner}>
        <h2 className={css.title} id="auth-prompt-title">
          Помилка під час додавання відгуку
        </h2>
        <p className={css.body}>
          Щоб залишити відгук вам треба увійти, якщо ще немає облікового запису
          зареєструйтесь
        </p>
        <div className={css.actions}>
          <div className={css.actionsRow}>
            <Link
              href="/login"
              className={`btn btn--secondary btn--regular ${css.modalBtn}`}
            >
              Увійти
            </Link>
            <Link
              href="/register"
              className={`btn btn--primary btn--regular ${css.modalBtn}`}
            >
              Зареєструватись
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
