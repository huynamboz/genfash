import { getCollectionsApi } from '@/services/collections';
import { Collection } from '@/types/collection';
import { create } from 'zustand';

interface CollectionState {
  collections: Collection[];
  setCollections: (collections: Collection[]) => void;
  fetchCollections: () => Promise<void>;
}

export const useCollectionStore = create<CollectionState>((set) => ({
  collections: [],
  setCollections: (collections: Collection[]) => set({ collections }),

  fetchCollections: async () => {
    const data = await getCollectionsApi();
    console.log('data', data);
    set({ collections: data as Collection[] });
  },
}));
