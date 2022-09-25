import { PostgrestError } from "@supabase/supabase-js";

type CreatePostType = {
  post_imageurl: string;
  post_title: string;
  post_subtitle: string;
  post_content: string;
  post_author: string;
  post_author_image: string;
  post_like: number;
  created_at: string;
  id: number;
};

type CreatePostDataType = {
  data: CreatePostType[] | null;
  error: PostgrestError | null;
};
export type { CreatePostType, CreatePostDataType };
