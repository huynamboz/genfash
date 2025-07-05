// src/api/getCollectionsApi.ts
import { supabase } from '@/libs/supabase';
import { useAuthStore } from '@/stores/auth';
import { Collection, CollectionDetail } from '@/types/collection';
import { Image } from 'react-native';

export const getCollectionsApi = async (): Promise<Collection[]> => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select(
        'id, name, is_public, main_image_url ,shape,style,description, created_at, publisher:users(*)',
      )
      .not('main_image_url', 'is', null)
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

export const getCollectionImagesApi = async (collection_id: string): Promise<Image[]> => {
  try {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('collection_id', collection_id);

    if (error) {
      throw new Error(`Error fetching collection images: ${error.message}`);
    }

    return (data as any as Image[]) ?? [];
  } catch (error) {
    console.error('Error fetching collection images:', error);
    return [];
  }
};

export const getMyCollectionsApi = async (): Promise<Collection[]> => {
  try {
    const { user } = useAuthStore.getState();
    const { data, error } = await supabase
      .from('collections')
      .select(
        'id, name, is_public, main_image_url,shape,style,description, created_at, publisher:users(*)',
      )
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

export const updateCollectionApi = async (
  collection_id: string,
  collection: Partial<Collection>,
): Promise<Collection | null> => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .update(collection)
      .eq('id', collection_id);

    if (error) {
      throw new Error(`Error updating collection: ${error.message}`);
    }

    return data as any as Collection;
  } catch (error) {
    console.error('Error updating collection:', error);
    return null;
  }
};

export const getCollectionDetailApi = async (
  collection_id: string,
): Promise<CollectionDetail | null> => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select(
        'id, name, is_public, main_image_url ,shape,style,description, created_at, publisher:users(*), view',
      )
      .eq('id', collection_id)
      .single();

    if (error) {
      throw new Error(`Error fetching collection detail: ${error.message}`);
    }

    // get images from images table
    const { data: images, error: imagesError } = await supabase
      .from('images')
      .select('*')
      .eq('collection_id', collection_id);

    if (imagesError) {
      throw new Error(`Error fetching collection images: ${imagesError.message}`);
    }

    return { collection: data, images: images } as any as CollectionDetail;
  } catch (error) {
    console.error('Error fetching collection detail:', error);
    return null;
  }
};

export const addCollectionImageApi = async (collection_id: string, image_url: string) => {
  try {
    const { data, error } = await supabase.from('images').insert({
      collection_id,
      image_url,
    });

    if (error) {
      throw new Error(`Error adding collection image: ${error.message}`);
    }

    return data as any as Image[];
  } catch (error) {
    console.error('Error adding collection image:', error);
    return null;
  }
};
