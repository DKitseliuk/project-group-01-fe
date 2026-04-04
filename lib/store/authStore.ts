import { create } from 'zustand';
import { User } from '@/types/user';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  redirectAfterAuth: string | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setRedirectAfterAuth: (path: string | null) => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  redirectAfterAuth: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
  setRedirectAfterAuth: (path) => {
    set(() => ({ redirectAfterAuth: path }));
  },
}));
