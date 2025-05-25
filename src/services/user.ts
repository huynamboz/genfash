import { supabase } from '@/libs/supabase';

export const GetUser = async (userId: string) => {
  // Query the 'users' table to get the current user's data

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
  if (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
  console.log('User data:', data);
  return data;
};
