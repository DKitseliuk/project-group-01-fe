'use client';

import Image from 'next/image';
import styles from './ProfileInfo.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { User } from '@/types/user';

import { useState } from 'react';
import EditProfileModal from '@/components/EditProfileModal/EditProfileModal';
import { updateMe } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';

type ProfileInfoProps = {
  user: User;
};

export const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const isOwnProfile = currentUser?._id === user?._id;
  const displayedUser = isOwnProfile && currentUser ? currentUser : user;
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  return (
    <section>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.avatar}>
            <Image
              src={
                displayedUser.avatarUrl  ||
                'https://ac.goit.global/fullstack/react/default-avatar.jpg'
              }
              alt={displayedUser.name || 'Аватар користувача'}
              fill
              sizes="144px"
              loading="eager"
            />
          </div>
          <div className={styles.infoRow}>
            <div className={styles.info}>
              <p className={styles.name}>{displayedUser.name}</p>
              <p className={styles.articles}>Статей: {displayedUser.articlesAmount}</p>
            </div>
            {isOwnProfile && (
              <button
                type="button"
                className={styles.editBtn}
                onClick={() => setIsEditProfileOpen(true)}
              >
                Редагувати профіль
              </button>
            )}
          </div>
        </div>
      </div>

    {isEditProfileOpen && (
        <EditProfileModal
          key={`${displayedUser.name}-${displayedUser.avatarUrl || 'no-avatar'}`}
          onClose={() => setIsEditProfileOpen(false)}
          userName={displayedUser.name}
          userAvatar={displayedUser.avatarUrl}
          onSubmit={async ({ name, avatarFile }) => {
            try {
              const updatedUser = await updateMe({
                name,
                avatarFile,
              });

              setUser(updatedUser);
              setIsEditProfileOpen(false);
              toast.success('Профіль оновлено');
            } catch {
              toast.error('Не вдалося оновити профіль');
            }
          }}
        />
      )}
  
    </section>
  );
};
