import { supabase } from '@/libs/supabase';
import { useAuthStore } from '@/stores/auth';
import { User } from '@/types/auth/user';

export const updateProfile = async (name: string, avatar: string): Promise<User | null> => {
  const { user } = useAuthStore.getState();
  const { data, error } = await supabase.from('users').update({ name, avatar }).eq('id', user?.id);
  if (error) {
    throw new Error(`Error updating profile: ${error.message}`);
  }
  return data;
};
