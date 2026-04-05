'use client';

import { useState } from 'react';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import AuthPromptModal from '@/components/AuthPromptModal/AuthPromptModal';
import EditProfileModal from '@/components/EditProfileModal/EditProfileModal';

const TestModalsPage = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  return (
    <main style={{ padding: '40px' }}>
      <button
        type="button"
        onClick={() => setIsConfirmationOpen(true)}
        style={{ marginRight: '16px', padding: '12px 16px' }}
      >
        Open Confirmation Modal
      </button>

      <button
        type="button"
        onClick={() => setIsAuthPromptOpen(true)}
        style={{ marginRight: '16px', padding: '12px 16px' }}
      >
        Open Auth Prompt Modal
      </button>

      <button
        type="button"
        onClick={() => setIsEditProfileOpen(true)}
        style={{ padding: '12px 16px' }}
      >
        Open Edit Profile Modal
      </button>

      {isConfirmationOpen && (
        <ConfirmationModal
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={() => {
            console.log('Confirmed');
            setIsConfirmationOpen(false);
          }}
        />
      )}

      {isAuthPromptOpen && (
        <AuthPromptModal onClose={() => setIsAuthPromptOpen(false)} />
      )}

      {isEditProfileOpen && (
        <EditProfileModal
          onClose={() => setIsEditProfileOpen(false)}
          userName={''}
          onSubmit={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      )}
    </main>
  );
};

export default TestModalsPage;
