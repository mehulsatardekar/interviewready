import { PostType } from "../../types";

type postProviderContextProps = {
    children: React.ReactNode;
}

type PostContextType = {
    posts: PostType[] | null;
    setPosts: React.Dispatch<React.SetStateAction<PostType[] | null>>;
    getPosts: () => Promise<void>;
}

export type {postProviderContextProps, PostContextType}