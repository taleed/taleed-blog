export interface BaseBlog {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  body: string;
  excerpt: string;
  status: string;
  user_id: string;
  delete_at: string | null;
  deleted_by: string | null;
  thumbnail: string;
  categroy_id: string;
}

export interface Profile {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  username: string;
  field: string;
  speciality: string;
  about: string;
  facebook_account: string;
  instagram_account: string;
  twitter_account: string;
  avatar_url: string;
}

export interface FamousAuthor {
  first_name: string;
  last_name: string;
  avatar_url: string;
  speciality: string;
  posts_count: number;
}

export interface BlogWithCategories extends BaseBlog {
  categories: { name: string };
}

export interface BlogWithCategoriesProfiles extends BlogWithCategories {
  profiles: Profile;
}
