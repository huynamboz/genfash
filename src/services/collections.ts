// src/api/getCollectionsApi.ts
import { supabase } from '@/libs/supabase';
import { useAuthStore } from '@/stores/auth';
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

export const getMyCollectionsApi = async (): Promise<Collection[]> => {
  try {
    const { user } = useAuthStore.getState();
    const { data, error } = await supabase
      .from('collections')
      .select('id, name, is_public, image,shape,style,description, created_at, publisher:users(*)')
      .eq('publisher_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching collections: ${error.message}`);
    }

    console.log('data', data);
    return (data as any as Collection[]) ?? [];
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
};

export const addCollectionApi = async (
  collection: Partial<Collection>,
): Promise<Collection | null> => {
  try {
    const { user } = useAuthStore.getState();
    const { data, error } = await supabase
      .from('collections')
      .insert({
        ...collection,
        publisher_id: user?.id,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Error adding collection: ${error.message}`);
    }

    return data as Collection;
  } catch (error) {
    console.error('Error adding collection:', error);
    return null;
  }
};
