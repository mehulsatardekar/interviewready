import { Box, Container, Flex, IconButton, useColorMode, Text, Image, Textarea, Button, FormErrorMessage, FormControl, FormLabel } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { useDarkModeTheme, useToast } from '../../contexts';
import { postDataType, PostType, singlePostDataType, postLikeCountDataType, postCommentType, getCommentsOfPostType, commentOnPostType } from '../../types';
import { supabase } from '../../../supabaseClient';
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { CommentCard } from '../../components';
import { Toaster } from "react-hot-toast";



const SingleForumPostPage = () => {

    const { post_id } = useParams();

    const {
        colorProp: { bodybg, cardBg, cardText, cardLightText },
    } = useDarkModeTheme();
    const { notifyError } = useToast();


    const [post, setPost] = useState<PostType | null>();
    const [postLikeCount, setPostLikeCount] = useState<number | null | undefined>();
    const [postComments, setPostComments] = useState<postCommentType[] | null>([]);

    const initialValues: commentOnPostType = {
        postComment: "",
    };

    const createPostCommentValidationSchema = Yup.object({
        postComment: Yup.string().required('Type something to post comment')
    });

    const getPosts = async () => {
        const { data, error }: singlePostDataType = await supabase.from("posts").select("*").eq('id', post_id).single();
        if (error) {
            notifyError(error.message)
        }
        setPost(data);
        setPostLikeCount(data?.post_like)
    };


    const incrementPostLike = async () => {
        setPostLikeCount(prevPostLikeCount => prevPostLikeCount! + 1);
        const { data, error }: postLikeCountDataType = await supabase.from("posts").update({ post_like: postLikeCount! + 1 }).match({ id: post_id }).single();
        setPostLikeCount(data?.post_like)
    }

    const decrementPostLike = async () => {
        if (postLikeCount! > 0) {
            setPostLikeCount(prevPostLikeCount => prevPostLikeCount! - 1);
            const { data, error }: postLikeCountDataType = await supabase.from("posts").update({ post_like: postLikeCount! - 1 }).match({ id: post_id }).single();
            setPostLikeCount(data?.post_like)
        }
    }

    const postCommentSubmitForm = async (values: commentOnPostType) => {
        try {
            const { data, error } = await supabase.from('post_replies_likes').insert([{
                id: post_id,
                post_comment: values.postComment,
                likes: 0,
                created_at: new Date().toLocaleString()
            }]).eq('id', post_id);
            setPostComments([...postComments!, ...data!]);
            if (error) throw error;

        } catch (error: any) {
            notifyError(error.message);
        }

    }

    const getCommentsOfPost = async () => {
        try {
            const { data, error }: getCommentsOfPostType = await supabase.from("post_replies_likes").select("*").eq('id', post_id);
            if (error) throw error;
            setPostComments(data);
        } catch (error: any) {
            notifyError(error.message)
        }
    }


    const incrementLike = async (commetId: number, commentLikeCount: number | null | undefined) => {
        const { data, error }: getCommentsOfPostType = await supabase.from("post_replies_likes")
            .update({ likes: commentLikeCount! + 1 }).match({ post_replies_id: commetId }).single();
    }

    useEffect(() => {
        getPosts();
    }, [])

    useEffect(() => {
        getCommentsOfPost();
    }, [])


    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />

            <Box as="main" display="flex" minHeight="100vh">
                <Box flex="0.5" bg={bodybg}>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="1rem">
                        <IconButton aria-label='Search database' icon={<TriangleUpIcon />} width="70%" bg={cardBg} mt="2rem" onClick={incrementPostLike} />
                        <Text fontWeight="bold" p="7px" title='Likes'>
                            {postLikeCount}
                        </Text>
                        <IconButton aria-label='Search database' icon={<TriangleDownIcon />} width="70%" bg={cardBg} onClick={decrementPostLike} />
                    </Box>
                </Box>
                <Box flex="11" >
                    <Box bg={cardBg} p="1rem">
                        <Text fontSize='3xl' fontWeight="bold">
                            {post?.post_title}
                        </Text>

                        <Box maxW="100%" p="5px" mt="2rem" display="flex" justifyContent="center">
                            <Image src={post?.post_imageurl}
                                w="60vw" h="50vh" alt={post?.post_title} />
                        </Box>
                        <Box mt="1rem">
                            <Text>
                                {post?.post_content}
                            </Text>
                        </Box>
                    </Box>

                    <Box as='section' mt={3} bg={cardBg} p="1rem" mb="2rem">
                        <Text fontSize='2xl' fontWeight="bold">Post Comment</Text>

                        <Box display="flex" flexDirection="column" pt="2rem">
                            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap="5px">
                                <Image
                                    borderRadius='full'
                                    boxSize='40px'
                                    src='https://d34xlmh0rv7u44.cloudfront.net/gkcs.jpeg'
                                    alt='Gaurav Sen'
                                />
                                <Box width="full">
                                    <Formik initialValues={initialValues} validationSchema={createPostCommentValidationSchema}
                                        onSubmit={postCommentSubmitForm}>
                                        {
                                            ({ errors, touched, setFieldValue }) => (
                                                <Form>
                                                    <FormControl id="postComment" isInvalid={!!errors.postComment && touched.postComment} >
                                                        <Field as={Textarea} type="text" placeholder='Add comment' name="postComment" />
                                                        <FormErrorMessage>{errors.postComment}</FormErrorMessage>

                                                    </FormControl>
                                                    <Button type='submit' mt="3">Post</Button>

                                                </Form>)
                                        }
                                    </Formik>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box mb="2rem">
                        <Box display="flex" flexDirection="column" pt="2rem" p="1rem" gap="10px">
                            {
                                postComments && postComments.map((postcomment, i) =>
                                    <CommentCard key={i} comments={postcomment} incrementlike={incrementLike} />)
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export { SingleForumPostPage }

