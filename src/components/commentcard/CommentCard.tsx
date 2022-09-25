import { Box, Image, Text, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDarkModeTheme } from '../../contexts';
import { AiOutlineLike } from "react-icons/ai";
import { CommentCardType } from './CommentCardType';


const CommentCard = ({ comments, incrementlike }: CommentCardType) => {

    const [commentLikeCount, setCommentLikeCount] = useState<number | null | undefined>(comments.likes);

    const likeComment = async () => {
        setCommentLikeCount(prevCommentLikeCount => prevCommentLikeCount! + 1);
        incrementlike(comments.post_replies_id, commentLikeCount);
    }

    const {
        colorProp: { bodybg, cardBg, cardText, cardLightText },
    } = useDarkModeTheme();


    return (
        <Box display="flex" bg={cardBg} flexDirection="row" alignItems="center" gap="5px" p="15px 10px">
            <Box>
                <Image
                    borderRadius='full'
                    boxSize='40px'
                    src='https://bit.ly/dan-abramov'
                    alt='Dan Abramov'
                />
            </Box>
            <Box display="flex" flexDirection="column" w="full">
                <Text>
                    {comments.post_comment}
                </Text>
                <Box mt="3" display="flex" flexDirection="row" gap="5px">
                    <Button leftIcon={<AiOutlineLike />} size='xs' onClick={likeComment}>
                        Liked
                    </Button>
                    <Text>
                        {commentLikeCount} Like
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}

export { CommentCard }