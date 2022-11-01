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
          bg="white"
          mx="auto"
          display={{ lg: "flex" }}
          maxW="6xl"
          shadow={{ lg: "lg" }}
          rounded={{ lg: "lg" }}
        >
          <Box w={{ lg: "50%" }}>
            <Box
              h={{ base: 64, lg: "full" }}
              rounded={{ lg: "lg" }}
              bgSize="cover"
              bgImage={`url(${blogData.blogImg})`}
            ></Box>
          </Box>
  
          <Box pt={8} pb={12} px={6} maxW={{ base: "xl", lg: "5xl" }} w={{ lg: "50%" }}>
            <chakra.span
                fontSize={{ base: "lg", md: "xl" }}
                color="brand.secondary"
                fontWeight="bold"
                >
                {blogData.category}
            </chakra.span>
            <Link href={`/blogs/${blogData.blogID}`}>
                <chakra.h2
                fontSize={{ base: "2xl", md: "3xl" }}
                color="gray.800"
                _dark={{ color: "white" }}
                fontWeight="bold"
                >
                {blogData.title}
                </chakra.h2>
            </Link>
            <chakra.p mt={4} color="gray.600" _dark={{ color: "gray.400" }}>
              {blogData.description}
            </chakra.p>

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
  