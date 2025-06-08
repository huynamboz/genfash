import { supabase } from '@/libs/supabase';
import { useAuthStore } from '@/stores/auth';
import mime from 'mime';
import { Alert } from 'react-native';

export const uploadToSupabase = async (uri: string): Promise<string | null> => {
  const { user } = useAuthStore.getState();
  if (!user) {
    Alert.alert('Error', 'User not found');
    return null;
  }
  const userId = user.id;
  const fileExt = uri.split('.').pop() || 'jpg';
  const fileName = `${userId}_${Date.now()}.${fileExt}`;
  const path = `avatars/${fileName}`;

  const response = await fetch(uri);
  const blob = await response.blob();
  const contentType = mime.getType(uri) || 'image/jpeg';

  const { error } = await supabase.storage
    .from('publicfiles') // tên bucket bạn đã tạo trong Supabase
    .upload(path, blob, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error('Upload failed:', error.message);
    Alert.alert('Upload failed', error.message);
    return null;
  }

  const { data: publicUrlData } = supabase.storage.from('publicfiles').getPublicUrl(path);

  return publicUrlData?.publicUrl || null;
};
