import { PostgrestError } from "@supabase/supabase-js";

type postCommentType = {
  post_comment: string;
  likes: number;
  id: number;
  post_replies_id: number;
};

type getCommentsOfPostType = {
  data: postCommentType[] | null;
  error: PostgrestError | null;
};

type commentOnPostType = {
  postComment: string;
};
export type { postCommentType, getCommentsOfPostType,commentOnPostType };
