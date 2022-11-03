import { Box, Flex, Image, Link, chakra } from "@chakra-ui/react";

import NextLink from "next/link";
import React from "react";

interface BlogDataProps {
    blogData: {
        categories: {name: string};
        created_at: string;
        excerpt: string;
        id: number;
        profiles: {
            avatar_url: string;
            first_name: string;
            last_name: string;
            username: string;
            id: number;
        };
        thumbnail: string;
        title: string;
    }
}

export default function SecBlog({blogData}: BlogDataProps){
    return (
        <Box h="full">
            <Flex
                mx="auto"
                rounded="lg"
                shadow="md"
                bg="white"
                maxW="6xl"
                h="full"
                flexDir="column"
                >
                <Image
                    roundedTop="lg"
                    w="full"
                    h={64}
                    fit="cover"
                    src={`https://ythbjwovxnnbckdxlbds.supabase.co/storage/v1/object/public/blogs/${blogData.thumbnail}`}
                    alt="Article"
                />
                <Flex p={6} flexDir="column" justifyContent="space-between" flex={1}>
                    <Box>
                        <chakra.span
                            fontSize={{ base: "lg", md: "xl" }}
                            color="brand.secondary"
                            fontWeight="bold"
                            >
                            {blogData.categories.name}
                        </chakra.span>
                        <NextLink href={`/blogs/${blogData.id}*${blogData.profiles.id}`}>
                            <Link
                                display="block"
                                color="gray.800"
                                fontWeight="bold"
                                fontSize="2xl"
                                mt={2}
                                _hover={{ color: "gray.600", textDecor: "underline" }}
                                >
                                {blogData.title}
                            </Link>
                        </NextLink>
                        <chakra.p
                            mt={2}
                            fontSize="sm"
                            color="gray.600"
                            _dark={{ color: "gray.400" }}
                        >
                            {blogData.excerpt}
                        </chakra.p>
                    </Box>    
                    <Box mt={4}>
                        <Flex alignItems="center">
                            <Flex alignItems="center">
                                <Image
                                h={10}
                                fit="cover"
                                rounded="full"
                                src={`https://ythbjwovxnnbckdxlbds.supabase.co/storage/v1/object/public/avatars/${blogData.profiles.avatar_url}`}
                                alt="Avatar"
                                />
                                <NextLink href={`/authors/${blogData.profiles.username}`}>
                                    <Link
                                    mx={2}
                                    fontWeight="bold"
                                    color="gray.700"
                                    >
                                    {`${blogData.profiles.first_name} ${blogData.profiles.last_name}`}
                                    </Link>
                                </NextLink>
                            </Flex>
                            <chakra.span
                                mx={1}
                                fontSize="sm"
                                color="gray.600"
                                _dark={{ color: "gray.300" }}
                            >
                                {blogData.created_at.slice(0,10)}
                            </chakra.span>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
      </Box>
    );
};
  