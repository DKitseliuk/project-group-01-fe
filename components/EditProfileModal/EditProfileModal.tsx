/* eslint-disable @next/next/no-img-element */
'use client';


import { useEffect, useState } from 'react';
import Modal from '@/components/Modal/Modal';
import styles from './EditProfileModal.module.css';

interface EditProfileModalProps {
  onClose: () => void;
  userName: string;
  userAvatar?: string;
  onSubmit: (data: { name: string; avatarFile: File | null }) => void;
}

const EditProfileModal = ({ onClose, userName, userAvatar, onSubmit }: EditProfileModalProps) => {
    const [name, setName] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>('');

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(userName || '');
    setAvatarPreview(userAvatar || '/default-avatar.png'); // замінити потім !!!
  }, [userName, userAvatar]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    onSubmit({
        name,
        avatarFile,
    });
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h2 className={styles.title}>Редагувати профіль</h2>

        <p className={styles.label}>Аватар</p>

        <div className={styles.avatarBlock}>
            
            <img
            src={avatarPreview}
            alt="avatar"
            className={styles.avatar}
            />

            <label className={styles.uploadButton}>
                Завантажити фото
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </label>
        </div>

        <p className={styles.label}>Імʼя</p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder="Введіть нове імʼя"
        />

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
            className={styles.saveButton}
            onClick={handleSubmit}
          >
            Зберегти
          </button>
          
        </div>

      </div>

    </Modal>
  );
};

export default EditProfileModal;