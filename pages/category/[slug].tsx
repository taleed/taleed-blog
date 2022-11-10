import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

import { BlogWithCategoriesProfiles } from "@/types/blog";
import { GetStaticProps } from "next";
import Head from "next/head";
import LatestBlogs from "@/components/LatestBlogs";
import Layout from "@/layouts/Default";
import NextLink from "next/link";
import { ReactElement } from "react";
import { supabase } from "@/utils/supabaseClient";

interface Props {
  latestBlogs: BlogWithCategoriesProfiles[];
  newBlog: BlogWithCategoriesProfiles;
  restBlogs: BlogWithCategoriesProfiles[];
}

const Category = ({ newBlog, latestBlogs, restBlogs }: Props) => {
  const seperator_color = useColorModeValue(
    "1px solid #E7E8E8",
    "1px solid #7C62E5"
  );
  const date_color = useColorModeValue("grey.500", "grey.300");
  const author_color = useColorModeValue("grey.500", "white");
  const title_color = useColorModeValue("brand.black", "white");
  const category_color = useColorModeValue("brand.secondary", "grey.300");
  const excerpt_color = useColorModeValue("#4F4F4F", "#F0F0F0");
  return (
    <>
      <Head>
        <title>{`تليد - مواضيع في ${newBlog.categories.name}`}</title>
      </Head>
      <Container my={{ base: 10 }} maxW="container.xl">
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "2px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
          }}
          _after={{
            content: '""',
            borderBottom: "2px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
          }}
        >
          <chakra.span
            mx={4}
            fontWeight={400}
            fontSize="5xl"
            color="brand.primary"
          >
            {newBlog.categories.name}
          </chakra.span>
        </Flex>
        <LatestBlogs newBlog={newBlog} latestBlogs={latestBlogs} />
        {restBlogs.length > 0 && (
          <Box my={8}>
            <chakra.h2
              color="brand.primary"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight={600}
              lineHeight={{ base: "51.52px", md: "55.2px" }}
              mb={6}
              textAlign={{ base: "center", md: "start" }}
            >
              المواضيع الأكثر قراءة
            </chakra.h2>
            <VStack align="flex-start">
              {restBlogs.map((post, index) => {
                return (
                  <NextLink key={index} href={`/blogs/${post.id}`} passHref>
                    <Flex
                      flexDirection={{ base: "column", md: "row" }}
                      w="full"
                      py={6}
                      borderBottom={seperator_color}
                      mb={10}
                      align="center"
                      _hover={{ cursor: "pointer" }}
                    >
                      <Box flex={1}>
                        <chakra.span
                          color={category_color}
                          display="block"
                          fontWeight={600}
                          lineHeight={"37px"}
                          fontSize={{ base: "md", md: "xl" }}
                        >
                          {post.categories.name}
                        </chakra.span>
                        <Heading
                          as="h3"
                          color={title_color}
                          lineHeight={{ base: "46px", md: "63px" }}
                          fontWeight={700}
                          my={{ base: 2, md: 4 }}
                          _groupHover={{ color: "brand.primary" }}
                          fontSize={{ base: "2xl", md: "4xl" }}
                        >
                          {post.title}
                        </Heading>
                        <Text
                          noOfLines={3}
                          fontWeight={400}
                          fontSize={{ base: "md", md: "xl" }}
                          lineHeight={{ base: "30px", md: "35px" }}
                          color={excerpt_color}
                        >
                          {post.excerpt}
                        </Text>
                        <HStack mt={4} align="center">
                          <Avatar
                            size={{ base: "md", md: "lg" }}
                            name={`${post.profiles.first_name} ${post.profiles.last_name}`}
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${post.profiles.avatar_url}`}
                          />
                          <Box>
                            <Text
                              fontWeight="400"
                              lineHeight="30px"
                              fontSize="md"
                              color={author_color}
                            >
                              {`${post.profiles.first_name} ${post.profiles.last_name}`}
                            </Text>
                            <chakra.span
                              color={date_color}
                              fontSize="sm"
                              fontWeight="500"
                            >
                              {post.created_at.slice(0, 10)}
                            </chakra.span>
                          </Box>
                        </HStack>
                      </Box>
                      <Image
                        ms={{ base: 0, md: 6 }}
                        rounded={{ base: "lg" }}
                        my={5}
                        w={{
                          base: "full",
                          md: "45%",
                        }}
                        h={72}
                        fit="cover"
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${post.thumbnail}`}
                        alt={`${post.title} thumbnail`}
                      />
                    </Flex>
                  </NextLink>
                );
              })}
            </VStack>
          </Box>
        )}
      </Container>
    </>
  );
};

Category.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Category;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params!;

  // Get The Newest Blog (by category)
  const { data: newBlog } = await supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt, created_at, categories!inner(name, slug), profiles!inner(first_name, last_name, avatar_url)"
    )
    .eq("categories.slug", slug)
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .single();

  // Get The Latest 3 Blogs (by category)
  const { data: latestBlogs } = await supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt,created_at, categories!inner(name, slug), profiles!inner(first_name, last_name, avatar_url)"
    )
    .eq("categories.slug", slug)
    .order("created_at", {
      ascending: false,
    })
    .range(1, 3);

  // Rest Blogs (by category)
  let query = supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt,created_at, categories!inner(name, slug), profiles!inner(first_name, last_name, avatar_url)"
    )
    .eq("categories.slug", slug)
    .order("created_at", {
      ascending: true,
    });

  if (newBlog) {
    query = query.not("id", "eq", newBlog?.id);
  }
  if (latestBlogs && latestBlogs?.length > 0) {
    query = query.not("id", "in", `(${latestBlogs.map((blog) => blog.id)})`);
  }
  const { data: restBlogs } = await query;

  return {
    props: {
      newBlog,
      latestBlogs,
      restBlogs,
    },
  };
};

interface Params {
  params: {
    slug: string;
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

  const { data: categories, error: error } = await supabase
    .from("categories")
    .select("slug");

  if (error) {
    return {
      paths: [],
      fallback: false,
    };
  }

  paths = categories.map((category: any) => ({
    params: { slug: category.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
