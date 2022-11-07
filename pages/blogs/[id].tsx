import {
  Avatar,
  Badge,
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "@/layouts/Default";
import Link from "next/link";
import { ReactElement } from "react";
import { supabase } from "@/utils/supabaseClient";

function Blog({ post, similar_posts }: { post: any; similar_posts: any }) {
  const similar_posts_date = useColorModeValue("grey.500", "white");
  const similar_posts_author = useColorModeValue("grey.500", "white");
  const similar_posts_title = useColorModeValue("brand.black", "white");
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
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
            <Flex
              mb={10}
              justifyContent="space-between"
              w="full"
              alignItems="flex-end"
            >
              <Flex align="center">
                <Avatar
                  me={3}
                  size="lg"
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${post.profiles.avatar_url}`}
                  name={`${post.profiles.first_name} ${post.profiles.last_name}`}
                />
                <Box>
                  <Link href={`/authors/${post.profiles.username}`} passHref>
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
          <Box ms={{ base: 0, md: 10 }} w={{ base: "full", md: "35%" }}>
            {!post.tags ? null : (
              <Box mb={6}>
                <chakra.h2
                  color="brand.primary"
                  fontSize="2xl"
                  fontWeight="700"
                  lineHeight="46px"
                  mb={2}
                >
                  الكلمات المفتاحية
                </chakra.h2>
                <Flex flexWrap="wrap">
                  {post.tags.map((tag: string, index: number) => (
                    <Badge
                      key={index}
                      fontWeight={500}
                      fontSize="lg"
                      lineHeight="33.12px"
                      variant="solid"
                      color="brand.black"
                      bg="purple.100"
                      rounded="full"
                      padding="4px 22px"
                      mb={2}
                      me={1}
                    >
                      {tag}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            )}
            <Flex flexDir="column" mb={10}>
              <chakra.h2
                color="brand.primary"
                fontSize="2xl"
                fontWeight="600"
                mb="20px"
              >
                مواضيع ذات صلة
              </chakra.h2>
              {similar_posts.length === 0 && "لا توجد مواضيع ذات صلة بعد"}
              {similar_posts &&
                similar_posts.map((post, index: index) => {
                  return (
                    <Box
                      pb={2}
                      borderBottom="1px solid #E7E8E8"
                      mb={10}
                      key={index}
                    >
                      <chakra.span
                        color="brand.secondary"
                        fontSize="md"
                        fontWeight="600"
                        lineHeight="29.44px"
                      >
                        {post.categories.name}
                      </chakra.span>
                      <Heading
                        as="h3"
                        color={similar_posts_title}
                        fontSize="md"
                        fontWeight="700"
                        lineHeight="29.44px"
                      >
                        {post.title}
                      </Heading>
                      <HStack>
                        <Text
                          fontWeight="400"
                          lineHeight="30px"
                          fontSize="md"
                          color={similar_posts_author}
                        >
                          {`${post.profiles.first_name} ${post.profiles.last_name}`}
                        </Text>
                        <chakra.span
                          color={similar_posts_date}
                          fontSize="sm"
                          fontWeight="500"
                          lineHeight="25.76px"
                        >
                          {post.created_at.slice(0, 10)}
                        </chakra.span>
                      </HStack>
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
      "id,title,thumbnail,excerpt, created_at, body, tags, categories!inner(name), profiles!inner(first_name, last_name,username, avatar_url)"
    )
    .eq("id", id)
    .single();

  if (post) {
    const { data: similar_posts } = await supabase
      .from("posts")
      .select(
        "id,title, created_at, categories!inner(name), profiles!inner(first_name, last_name)"
      )
      .filter("categories.name", "eq", post!.categories!.name)
      .filter("id", "not.eq", post.id)
      .range(0, 5);

    return {
      props: {
        post,
        similar_posts,
      },
    };
  }

  return {
    props: {},
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
      "id,title,thumbnail,excerpt, created_at, body, tags, categories!inner(name), profiles!inner(first_name, last_name,username, avatar_url)"
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
