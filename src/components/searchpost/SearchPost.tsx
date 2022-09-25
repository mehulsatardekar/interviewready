import { IconButton, Input, InputGroup, InputLeftElement, Box, useColorMode, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
    SearchIcon
} from "@chakra-ui/icons";

import { inputGroupStyleProps, searchbarStyleProps } from './styles/searchpost-style-props';
import { useDarkModeTheme, usePost } from "../../contexts";
import { useSearchArticle } from "../../hook";
import { getFilteredPost } from "../../utils";
const SearchPost = () => {
    const [serachQuery, setSearchQuery] = useState<string>("");
    const {
        colorProp: { bodybg, cardBg, cardText, cardLightText },
    } = useDarkModeTheme();
    const { debounceValue } = useSearchArticle(serachQuery);

    const { posts, setPosts, getPosts } = usePost();

    const getFilterPost = async (userQuery: string) => {
        const response = await getFilteredPost(posts!, userQuery);
        setPosts(response);
    }

    useEffect(() => {
        if (debounceValue === "") {
            getPosts();
        }
        if (debounceValue) {
            getFilterPost(debounceValue);
        } else {
            setPosts([])
        }
    }, [debounceValue]);

    return (
        <Flex height="30vh" bg={cardBg} mt={2} justifyContent="center" alignItems="center">
            <InputGroup {...inputGroupStyleProps}>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="black" />}
                />
                <Input
                    type="search"
                    placeholder="Search by title or author name"
                    {...searchbarStyleProps}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
                />
            </InputGroup>
        </Flex>
    )
}

export { SearchPost }