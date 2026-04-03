'use client';

import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { nextServer } from '@/lib/api/api';

export const ToastProvider = () => {
  useEffect(() => {
    const interceptor = nextServer.interceptors.response.use(
      (response) => response,
      (error) => {
        const message = error.response?.data?.message;
        toast.error(message ?? 'Щось пішло не так');
        return Promise.reject(error);
      },
    );

    return () => nextServer.interceptors.response.eject(interceptor);
  }, []);

  return <Toaster position="top-right" />;
};
