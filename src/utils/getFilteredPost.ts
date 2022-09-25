import { PostType } from "../types";
const getFilteredPost = (posts: PostType[], searchQuery: string) =>
  posts.filter(
    (post) =>
      post.post_author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.post_title.toLowerCase().includes(searchQuery.toLowerCase())
  );


export {getFilteredPost};