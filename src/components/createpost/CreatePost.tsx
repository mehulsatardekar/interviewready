import React from 'react'
import { Button, FormControl, Link, Avatar, Text, Modal, ModalBody, Flex, ModalCloseButton, ModalContent, ModalFooter, FormHelperText, Input, ModalHeader, ModalOverlay, useDisclosure, FormLabel, Textarea, Box, Divider, FormErrorMessage, Tooltip, useColorMode } from '@chakra-ui/react'
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { CreatePostDataType } from "../../types";
import { useDarkModeTheme, usePost } from "../../contexts";
import { supabase } from '../../../supabaseClient';
import { createPostType, createPostInitialType } from './CreatePostType'


const CreatePost = ({ isOpen, onClose }: createPostType) => {
    const { posts, setPosts } = usePost();

    const { colorMode, toggleColorMode } = useColorMode();
    const {
        colorProp: { bodybg, cardBg, cardText, cardLightText },
    } = useDarkModeTheme();


    const initialValues: createPostInitialType = {
        postImageURL: "",
        postTitle: "",
        postSubTitle: "",
        postContent: "",
        postAuthor: "",
        postAuthorImage: ""
    };
    const createPostValidationSchema = Yup.object({
        postImageURL: Yup.string().required("Image Url path is required"),
        postTitle: Yup.string().required("PostTitle is required"),
        postSubTitle: Yup.string().required("PostSubTitle is required"),
        postContent: Yup.string().required("PostContent is required"),
        postAuthor: Yup.string().required("Auther name is required"),
        postAuthorImage: Yup.string().required("Author Image is required")
    });

    const postSubmitForm = async (values: createPostInitialType) => {
        const { data, error }: CreatePostDataType = await supabase.from('posts').insert([{
            post_imageurl: values.postImageURL,
            post_title: values.postTitle,
            post_subtitle: values.postSubTitle,
            post_content: values.postContent,
            post_author: values.postAuthor,
            post_author_image: values.postAuthorImage,
            post_like: 0,
            created_at: new Date().toLocaleString()
        }])
        setPosts([...posts!, ...data!])
        onClose();

    }

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent border="white">
                <ModalHeader color={cardText} bg={cardBg}>Create Post</ModalHeader>
                <ModalCloseButton color={cardText} />
                <ModalBody pb={6} bg={cardBg} >
                    <Flex direction="column" justify="center" alignItems="center" gap="2" mb={3}>
                        <Avatar name="" src={""} />
                        <Text>Gaurav Sen</Text>
                    </Flex>
                    <Divider border="1px solid" mb={4} />
                    <Formik initialValues={initialValues} validationSchema={createPostValidationSchema} onSubmit={postSubmitForm}>
                        {
                            ({ errors, touched, setFieldValue }) => (<Form>
                                <Box display="flex" flexDirection="column" gap="3">
                                    <FormControl id="files">
                                        <Box display="flex" flexDirection="column" gap="1" >
                                            <FormLabel>Upload image</FormLabel>
                                            <FormControl id="postImageURL" isInvalid={!!errors.postImageURL && touched.postImageURL}>
                                                <Field as={Input} type="text" placeholder='Add image url' name="postImageURL" />
                                                <FormErrorMessage>{errors.postImageURL}</FormErrorMessage>

                                            </FormControl>
                                        </Box>

                                    </FormControl>

                                    <FormControl id="postTitle" isInvalid={!!errors.postTitle && touched.postTitle}>
                                        <FormLabel>Add Post Title</FormLabel>

                                        <Field as={Input} type="text" placeholder='Add Post Title' name="postTitle" />
                                        <FormErrorMessage>{errors.postTitle}</FormErrorMessage>

                                    </FormControl>

                                    <FormControl id="postSubTitle" isInvalid={!!errors.postSubTitle && touched.postSubTitle}>
                                        <FormLabel>Add Post Sub Title</FormLabel>

                                        <Field as={Textarea} type="text" placeholder='Add Post subtitle' name="postSubTitle" />
                                        <FormErrorMessage>{errors.postSubTitle}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl id="postContent" isInvalid={!!errors.postContent && touched.postContent}>
                                        <FormLabel>Add Post Content </FormLabel>

                                        <Field as={Textarea} cols={125} type="text" placeholder='Add Post Content' name="postContent" />
                                        <FormErrorMessage>{errors.postContent}</FormErrorMessage>

                                    </FormControl>

                                    <FormControl id="postAuthor" isInvalid={!!errors.postAuthor && touched.postAuthor}>
                                        <FormLabel>Add Post Author</FormLabel>

                                        <Field as={Input} type="text" placeholder='Add author name' name="postAuthor" />
                                        <FormErrorMessage>{errors.postAuthor}</FormErrorMessage>

                                    </FormControl>
                                    <FormControl id="postAuthorImage" isInvalid={!!errors.postAuthorImage && touched.postAuthorImage}>
                                        <FormLabel>Add Post Author Image</FormLabel>

                                        <Field as={Input} type="text" placeholder='Add author name' name="postAuthorImage" />
                                        <FormErrorMessage>{errors.postAuthorImage}</FormErrorMessage>

                                    </FormControl>
                                </Box>

                                <Box mt={5}>
                                    <Button colorScheme='blue' mr={3} type="submit">
                                        Publish Post
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </Box>
                            </Form>)
                        }
                    </Formik>

                </ModalBody>

            </ModalContent>
        </Modal>
    )
}

export { CreatePost }