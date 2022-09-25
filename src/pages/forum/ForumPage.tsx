import React, { useEffect, useState } from 'react';
import { SearchPost, PostList } from '../../components';
import { Container, Flex, Box, Text } from '@chakra-ui/react';
import { PostType, postDataType } from '../../types';
import { supabase } from '../../../supabaseClient';
import { useToast, usePost } from "../../contexts";
import { Toaster } from "react-hot-toast";

const ForumPage = () => {

    const { notifyError } = useToast();

    const { posts, setPosts } = usePost();

    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />

            <SearchPost />
            <Box as='section' display="flex" flexDirection="row" flexWrap="wrap" gap="1rem" justifyContent="center" mt={5} mb={5}>
                {
                    posts!?.length > 0 ? (
                        posts?.map(post => <PostList key={post.id} post={post} />)
                    ) : (
                        <Text>No Article Found</Text>
                    )
                }
            </Box>
        </>
    )
}

export { ForumPage }