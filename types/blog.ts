export interface Blog {
  id: BigInteger;

  title: string;
  poster_url: string;  // main picture/image of a blog.
  body: string;
  excerpt: string;
  is_verified: Boolean | null,
  status: string;  
  likes: BigInteger,
  
  deleted_by: string | null; // this reference the Editor.
  deleted_at: string | null;
  
  created_at: string;
  updated_at: string;
  
  user_id: string; // this reference the Author/user.
  categroy_id: string;
}


// profile/account aren't tables in the database.

// the "FAME" can be understood as (ration = likes count / blogs) > (0.7) and bingoo >>> author is famous.
// POPULAR blog (likes count / period of time .. plus other criteria)

export type NavbarResourcesType = {
  id: number;
  order: number;
  slug: string;
  name: string;
};
