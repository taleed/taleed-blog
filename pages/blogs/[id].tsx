import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegFileAlt, FaUserCircle } from "react-icons/fa";
import { ReactElement, useEffect, useRef } from "react";

import { BlogWithCategoriesProfiles } from "@/types/blog";
import { GetStaticProps } from "next";
import Layout from "@/layouts/Default";
import Link from "next/link";
import Loading from "@/components/loading";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function Blog({ post }: { post: any }) {
  console.log("post ", post);
  return (
    <>
      <Container my={20} maxW="container.xl">
        <Flex flexDir={{ base: "column", lg: "row" }} mt="80px">
          <Flex flexDir="column" flex={1}>
            <chakra.span
              color="brand.secondary"
              fontSize="1.625rem"
              fontWeight="600"
              lineHeight="47.84px"
            >
              {post.categories.name}
            </chakra.span>
            <Heading
              as="h1"
              color={useColorModeValue("brand.black", "white")}
              fontSize="5xl"
              fontWeight="700"
              lineHeight="92px"
            >
              {post.title}
            </Heading>
            <Flex justifyContent="space-between" w="full" alignItems="flex-end">
              <Flex align="center">
                <Avatar
                  me={3}
                  size="lg"
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${post.profiles.avatar_url}`}
                  name={`${post.profiles.first_name} ${post.profiles.last_name}`}
                />
                <Box>
                  <Link href={`/authors/${post.profiles.username}`}>
                    <Text
                      fontWeight="600"
                      fontSize="xl"
                      cursor="pointer"
                      _hover={{ textDecor: "underline" }}
                      color={useColorModeValue("brand.black", "white")}
                    >
                      {`${post.profiles.first_name} ${post.profiles.last_name}`}
                    </Text>
                  </Link>
                  <Flex>
                    <chakra.span
                      color={useColorModeValue("grey.500", "#9DA2A4")}
                      fontSize="lg"
                      fontWeight="400"
                    >
                      {post.created_at.slice(0, 10)}
                    </chakra.span>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
            <Image
              rounded={{ lg: "lg" }}
              w="full"
              my={5}
              h={{ base: 64, lg: 96 }}
              fit="cover"
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${post.thumbnail}`}
              alt="Article"
            />
            <Box
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.body }}
            ></Box>

            {/* {authorsData && (
              <Flex alignItems="center" flexDir="column">
                <chakra.h2
                  color="brand.primary"
                  fontSize="2xl"
                  fontWeight="600"
                  alignSelf="flex-start"
                  mb={5}
                >
                  المزيد من مقالات{" "}
                  {`${blog.profiles.first_name} ${blog.profiles.last_name}`}
                </chakra.h2>

                <SideBlog blogsData={authorsData.slice(0, authorBlogsLenght)} />

                <Button
                  bg="transparent"
                  border="2px"
                  ref={showAuthorBlogsBtn}
                  px="20px"
                  alignSelf="center"
                  h="50px"
                  borderColor="brand.secondary"
                  color="brand.secondary"
                  mb={5}
                  onClick={() => {
                    setAuthorBlogsLenght(authorBlogsLenght + 3);
                  }}
                >
                  عرض المزيد
                </Button>
              </Flex>
            )} */}

            {/* {data && (
              <Flex alignItems="center" flexDir="column">
                <chakra.h2
                  color="brand.primary"
                  fontSize="2xl"
                  fontWeight="600"
                  alignSelf="flex-start"
                  mb={5}
                >
                  المقالات الاكثر قراءة
                </chakra.h2>
                <SideBlog blogsData={data.slice(0, popBlogsLenght)} />
                <Button
                  bg="transparent"
                  border="2px"
                  ref={showPopBlogsBtn}
                  px="20px"
                  alignSelf="center"
                  h="50px"
                  borderColor="brand.secondary"
                  color="brand.secondary"
                  mb={5}
                  onClick={() => {
                    setPopBlogsLenght(popBlogsLenght + 3);
                  }}
                >
                  عرض المزيد
                </Button>
              </Flex>
            )} */}
          </Flex>
          <Box
            minW={{ base: "full", lg: "300px" }}
            w={{ base: "full", lg: "300px" }}
            mr={{ base: "0", lg: "30px" }}
            mt={{ base: "30px", lg: "0px" }}
          >
            <Flex flexDir="column" mb={10}>
              <chakra.h2
                color="brand.primary"
                fontSize="2xl"
                fontWeight="600"
                mb="20px"
              >
                المواضيع الاكثر شعبية
              </chakra.h2>
              {new Array(5).fill(0).map((blog, index) => {
                return (
                  <Box mb={10} key={index}>
                    blog here
                  </Box>
                );
              })}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </>
  );
}

Blog.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Blog;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params!;

  const { data: post } = await supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt, created_at, body, categories!inner(name), profiles!inner(first_name, last_name, avatar_url)"
    )
    .eq("id", id)
    .single();

  return {
    props: {
      post,
    },
  };
};

interface Params {
  params: {
    id: number;
  };
}

export const getStaticPaths = async () => {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  let paths: Params[] = [];

  const { data: posts, error: posts_error } = await supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt, created_at, body, categories!inner(name), profiles!inner(first_name, last_name,username, avatar_url)"
    );

  if (posts_error) {
    return {
      paths: [],
      fallback: false,
    };
  }

  paths = posts.map((post: any) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: false,
  };
};
