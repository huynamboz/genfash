import { User } from './auth/user';

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  created_at: string;
  publisher: User;
  is_public: boolean;
  shape: string;
  style: string;
}
