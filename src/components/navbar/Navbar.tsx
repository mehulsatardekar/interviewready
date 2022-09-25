import React from 'react'
import {
    inputGroupStyleProps,
    headerStyleProps,
    logoTextProps,
    searchbarStyleProps
} from "./styles/navbar-style-props";
import { Link } from "react-router-dom";
import {
    Flex,
    Heading,
    Input,
    Menu,
    Portal,
    MenuItem,
    MenuList,
    MenuButton,
    Image,
    Tooltip,
    Box,
    InputGroup,
    InputLeftElement,
    IconButton,
    useColorMode,
    forwardRef,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import { useDarkModeTheme } from "../../contexts";
import { LogoText } from "../index";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { BiShare } from "react-icons/bi";
import { CreatePost } from '../index';
const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    const {
        colorProp: { bodybg, cardBg, cardText, cardLightText },
    } = useDarkModeTheme();
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Flex as="header" bg={cardBg}  {...headerStyleProps}>
            <Link to="/">
                <LogoText {...logoTextProps} size={"1.7rem"} />
            </Link>
            <Box display="flex" gap="15px">
                <Button leftIcon={<BiShare />} bg={bodybg} variant='solid' onClick={onOpen}>
                    Create Post
                </Button>
                <IconButton aria-label='theme switch' icon={(colorMode === 'light') ? <MoonIcon /> : <SunIcon />} bg={bodybg} onClick={toggleColorMode} />
            </Box>
            <CreatePost isOpen={isOpen} onClose={onClose} />

        </Flex>
    )
}

export { Navbar }