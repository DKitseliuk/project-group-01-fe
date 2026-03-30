'use client';

import { useState } from 'react';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import AuthPromptModal from '@/components/AuthPromptModal/AuthPromptModal';

const TestModalsPage = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);

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
        style={{ padding: '12px 16px' }}
      >
        Open Auth Prompt Modal
      </button>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={() => {
          console.log('Confirmed');
          setIsConfirmationOpen(false);
        }}
      />

      <AuthPromptModal
        isOpen={isAuthPromptOpen}
        onClose={() => setIsAuthPromptOpen(false)}
      />
    </main>
  );
};

export default TestModalsPage;