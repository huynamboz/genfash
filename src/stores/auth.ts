// src/store/index.ts
import { User } from '@/types/auth/user';
import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthState {
  session: Session | null;
  user: User | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  setUser: (user: User | null) => set({ user }),
  setSession: (session: Session | null) => set({ session }),
  logOut: () => {
    set({ session: null, user: null });
  },
}));
