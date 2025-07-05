import { User } from './auth/user';

export interface Collection {
  id: string;
  name: string;
  description: string;
  main_image_url: string;
  created_at: string;
  publisher: User;
  is_public: boolean;
  shape: string;
  style: string;
  view: number;
}

export interface CollectionDetail {
  collection: Collection;
  images: Image[];
}
export interface Image {
  id: number;
  created_at: string;
  image_url: string;
  collection_id: string;
}
