import { Box, Button, Flex, Image, Link, chakra } from "@chakra-ui/react";

import { FiEdit } from 'react-icons/fi'
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
    },
    edited?: boolean
}

export default function MainBlog({blogData, edited = false}: BlogDataProps){
    return (
      <Box>
        <Box
          bg="white"
          mx="auto"
          display={{ lg: "flex" }}
          maxW="6xl"
          shadow={{ lg: "lg" }}
          rounded={{ lg: "lg" }}
        >
          <Box w={{ lg: "50%" }}>
            <Image
              rounded={{ lg: "lg" }}
              w="full"
              h={{ base: 64, lg: "full" }}
              fit="cover"
              src={`https://ythbjwovxnnbckdxlbds.supabase.co/storage/v1/object/public/blogs/${blogData.thumbnail}`}
              alt="Article"
            />
          </Box>
  
          <Box pt={8} pb={12} px={6} maxW={{ base: "full", lg: "5xl" }} w={{ lg: "50%" }}>
            <chakra.span
                fontSize={{ base: "lg", md: "xl" }}
                color="brand.secondary"
                fontWeight="bold"
                >
                {blogData.categories.name}
            </chakra.span>
            <NextLink href={`/blogs/${blogData.id}*${blogData.profiles.id}`}>
              <Link>
                <chakra.h2
                  fontSize={{ base: "2xl", md: "3xl" }}
                  color="gray.800"
                  _dark={{ color: "white" }}
                  fontWeight="bold"
                  >
                  {blogData.title}
                </chakra.h2>
              </Link>
            </NextLink>
            <chakra.p mt={4} color="gray.600" _dark={{ color: "gray.400" }}>
              {blogData.excerpt}
            </chakra.p>
            <Flex justifyContent="space-between" mt={4}>
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
                          <Link mx={2}
                            fontWeight="bold"
                            color="gray.700">
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
                {
                  edited && <Button colorScheme='teal' variant='ghost'>
                    <FiEdit fontSize="25px"/>
                  </Button>
                }
            </Flex>
            
          </Box>
        </Box>
      </Box>
    );
};
  