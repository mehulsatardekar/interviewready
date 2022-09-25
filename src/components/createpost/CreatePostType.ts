type createPostType = {
  isOpen: boolean;
  onClose: () => void;
};

type createPostInitialType = {
  postImageURL: string;
  postTitle: string;
  postSubTitle: string;
  postContent: string;
  postAuthor: string;
  postAuthorImage: string;
};

export type { createPostType, createPostInitialType };
