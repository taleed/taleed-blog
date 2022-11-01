import { Box, Flex, Image, Link, chakra } from "@chakra-ui/react";

import React from "react";

interface BlogDataProps {
    blogData: {
        blogID: number;
        blogImg: string;
        category: string;
        title: string;
        description: string;
        authorID: number;
        authorName: string;
        createdDate: string;
        authorImg: string;
    }
}

export default function MainBlog({blogData}: BlogDataProps){
    return (
        <Box>
            <Box
                mx="auto"
                rounded="lg"
                shadow="md"
                bg="white"
                maxW="6xl"
                >
                <Image
                    roundedTop="lg"
                    w="full"
                    h={64}
                    fit="cover"
                    src={blogData.blogImg}
                    alt="Article"
                />
                <Box p={6}>
                    <Box>
                    <chakra.span
                        fontSize={{ base: "lg", md: "xl" }}
                        color="brand.secondary"
                        fontWeight="bold"
                        >
                        {blogData.category}
                    </chakra.span>
                    <Link
                        display="block"
                        color="gray.800"
                        fontWeight="bold"
                        fontSize="2xl"
                        mt={2}
                        href={`/blogs/${blogData.blogID}`}
                        _hover={{ color: "gray.600", textDecor: "underline" }}
                        >
                        {blogData.title}
                    </Link>
                    <chakra.p
                        mt={2}
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: "gray.400" }}
                    >
                        {blogData.description}
                    </chakra.p>
                    </Box>    
                    <Box mt={4}>
                        <Flex alignItems="center">
                            <Flex alignItems="center">
                                <Image
                                h={10}
                                fit="cover"
                                rounded="full"
                                src={blogData.authorImg}
                                alt="Avatar"
                                />
                                <Link
                                mx={2}
                                fontWeight="bold"
                                color="gray.700"
                                href={`/authors/${blogData.authorID}`}
                                >
                                {blogData.authorName}
                                </Link>
                            </Flex>
                            <chakra.span
                                mx={1}
                                fontSize="sm"
                                color="gray.600"
                                _dark={{ color: "gray.300" }}
                            >
                                {blogData.createdDate}
                            </chakra.span>
                        </Flex>
                    </Box>
                </Box>
            </Box>
      </Box>
    );
};
  