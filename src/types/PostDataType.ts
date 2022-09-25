import { PostgrestError } from "@supabase/supabase-js";
import { PostType } from ".";

type postDataType = {
  data: PostType[] | null;
  error: PostgrestError | null;
};

type singlePostDataType = {
  data: PostType | null;
  error: PostgrestError | null;
};

type postLikeCountDataType = {
  data: {
    post_like: number;
  }| null;
  error: PostgrestError | null;
};
export type { postDataType, singlePostDataType, postLikeCountDataType };
