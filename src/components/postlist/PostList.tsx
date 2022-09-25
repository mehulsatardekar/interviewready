import React from 'react'
import { Flex, Box, Wrap, WrapItem, Link, Heading, Image, Text, useColorMode, Button } from '@chakra-ui/react';
import { useDarkModeTheme } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { postListType } from './PostListType';

const PostList = ({ post }: postListType) => {

    const navigate = useNavigate();
    const date = new Date('2021-04-06T19:01:27Z');

    const { colorMode, toggleColorMode } = useColorMode();
    const {
        colorProp: { bodybg, cardBg, cardText, cardLightText },
    } = useDarkModeTheme();

    const redirect = (id: number) => {
        navigate(`/${id}`);
    }
    return (
        <Box width="370px" bg={cardBg} borderRadius={6}>
            <Box overflow="hidden" borderRadius={6}>
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    <Image
                        transform="scale(1.0)"
                        src={post.post_imageurl}
                        alt={post.post_title}
                        objectFit="contain"
                        width="100%"
                        minHeight="230px"
                        transition="0.3s ease-in-out"
                        _hover={{
                            transform: 'scale(1.05)',
                        }}
                    />
                </Link>
            </Box>
            <Heading fontSize="xl" marginTop="2">
                <Text textDecoration="none" _hover={{ textDecoration: 'none' }} p="7px">
                    {post.post_title}
                </Text>
            </Heading>
            <Text as="p" fontSize="md" p="7px" color={cardLightText}>
                {post.post_subtitle}
            </Text>


            <Box display="flex" flexDirection="row" p="7px" justifyContent="center" alignItems="center">
                <Box flex="1">
                    <Image
                        borderRadius='full'
                        boxSize='40px'
                        src={post.post_author_image}
                        alt={post.post_author}
                    />
                </Box>
                <Box display="flex" flexDirection="column" flex="4">
                    <Text as="span" fontSize="md" fontWeight="semibold">
                        {post.post_author}
                    </Text>
                    <Text as="span" fontSize="md" fontWeight="regular">
                        {date.toLocaleDateString()}
                    </Text>
                </Box>
            </Box>
            <Box p="10px">
                <Button width="full" colorScheme='messenger' onClick={() => redirect(post.id)}>Read More</Button>
            </Box>


        </Box>
    )
}

export { PostList }