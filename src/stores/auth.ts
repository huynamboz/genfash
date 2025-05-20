// src/store/index.ts
import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthState {
  session: Session | null;
  user: User | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  setUser: (user: User | null) => set({ user }),
  setSession: (session: Session | null) => set({ session }),
}));
