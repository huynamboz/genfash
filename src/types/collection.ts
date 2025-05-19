import { User } from '@supabase/supabase-js';

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
