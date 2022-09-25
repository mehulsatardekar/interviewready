import { postCommentType} from "../../types";

type CommentCardType = {
  comments: postCommentType;
  incrementlike: (
    commetId: number,
    commentLikeCount: number | null | undefined
  ) => Promise<void>;
};

export type { CommentCardType };
