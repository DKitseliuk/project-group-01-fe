// lib/store/authStore.ts
import { create } from 'zustand';

interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  articlesAmount: number;
}

interface AuthStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
   // user: {
   // _id: '1',
   // name: 'Ім\'я',
   // email: 'test@test.com',
   // avatarUrl: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
   // articlesAmount: 0,
// },
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));