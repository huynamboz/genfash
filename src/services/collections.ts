// src/api/getCollectionsApi.ts
import { supabase } from '@/libs/supabase';
import { Collection } from '@/types/collection';

export const getCollectionsApi = async (): Promise<Collection[]> => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('id, name, is_public, image,shape,style,description, created_at, publisher:users(*)')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching collections: ${error.message}`);
    }

    return (data as any as Collection[]) ?? [];
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
};
