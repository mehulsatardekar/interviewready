import { useDisclosure } from '@chakra-ui/react';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient';
import { PostType, postDataType } from '../../types';
import { postProviderContextProps, PostContextType } from './PostContextType'
import { useToast } from "../../contexts";


const PostContext = createContext<PostContextType | null>(null);

const PostData = ({ children }: postProviderContextProps) => {
    const { notifyError } = useToast();

    const [posts, setPosts] = useState<PostType[] | null>([]);

    const getPosts = async () => {
        const { data, error }: postDataType = await supabase.from("posts").select("*");
        if (error) {
            notifyError(error.message)
        }
        setPosts(data);
    };
    useEffect(() => {
        getPosts();
    }, [])

    return (
        <PostContext.Provider value={{ posts, setPosts, getPosts }}>
            {children}
        </PostContext.Provider>
    )
}

const usePost = () => useContext(PostContext) as PostContextType;

export { PostData, usePost };
