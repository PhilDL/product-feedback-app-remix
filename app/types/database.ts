export type uniqueId = string | number;

export interface Category {
  id: number;
  created_at?: string;
  name: string;
  slug?: string;
}

export interface UserProfile {
  id: string;
  updated_at?: string;
  username?: string;
  avatar_url?: string;
  website?: string;
  full_name?: string;
}

export interface SupabaseUser {
  id: string;
  email: string;
}

export interface Comment {
  id: number;
  created_at?: string;
  user_id: string;
  content: string;
  feedback_id: number;
  parent_id: number | null;
  has_replies?: boolean;
  replying_to: string | null;
}

export interface InsertComment {
  user_id: string;
  content: string;
  feedback_id: number;
  parent_id?: number | null;
  has_replies?: boolean;
  replying_to?: string | null;
}

export interface Feedback {
  id: number;
  created_at?: string;
  title: string;
  user_id: string;
  description: string;
  slug: string;
  category_id: number;
  status?: string;
}

export interface InsertFeedback {
  title: string;
  user_id: string;
  description: string;
  slug: string;
  category_id: number;
  status?: string;
}

export interface UpdateFeedback {
  title?: string;
  description?: string;
  slug?: string;
  category_id?: number;
  status?: string;
}

export interface Upvotes {
  user_id: string;
  created_at?: string;
  feedback_id: number;
}
