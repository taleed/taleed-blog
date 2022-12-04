import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";

import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "@/layouts/Default";
import Link from "next/link";
import Logo from "@/components/Logo";
import { NavbarResourcesType } from "@/types/blog";
import NextLink from "next/link";
import { supabase } from "@/utils/supabaseClient";

interface Props {
  post: any;
  similar_posts: any;
  topMenus: NavbarResourcesType[];
  subMenus: NavbarResourcesType[];
}

function Blog({ post, similar_posts }: Props) {
  const similar_posts_date = useColorModeValue("grey.500", "grey.300");
  const similar_posts_author = useColorModeValue("grey.500", "white");
  const similar_posts_title = useColorModeValue("brand.black", "white");
  const tags_bg_color = useColorModeValue("purple.100", "grey.800");
  const tags_color = useColorModeValue("brand.black", "white");
  const seperator_color = useColorModeValue(
    "1px solid #E7E8E8",
    "1px solid #7C62E5"
  );

  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(false);

  const getLikes = async () => {
    const { data } = await supabase
      .from("posts")
      .select("likes")
      .eq("id", post.id)
      .single();
    setLikes(data?.likes);
  };

  const incrementLikes = async () => {
    const { data } = await supabase.rpc("increment_likes", {
      post_id: post.id,
    });
    setLikes(data);
    setLiked(true);
  };

  const addViewer = async () => {
    const location = JSON.parse(localStorage.getItem('location') ?? "{}")

    if (!location) {
      return
    }

    try {
      let {data} = await supabase.auth.getUser()
      await supabase.rpc('add_post_viewer', {
        new_id: post.id,
        ip: location.ip,
        email: data.user?.email ?? "Anonymous"
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getLikes();
    addViewer();
  }, []);

  const ads_color = useColorModeValue("#F4F5F5", "#2F3133");

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Container my={{ base: 10, md: 20 }} maxW="container.xl">
        <Flex flexDir={{ base: "column", lg: "row" }}>
          <Flex flexDir="column" flex={1}>
            <chakra.span
              color="brand.secondary"
              fontSize={{ base: "xl", md: "1.625rem" }}
              fontWeight="600"
              lineHeight={{ base: "36.8px", md: "47.84px" }}
            >
              {post.top_menus && post.top_menus.name}
              {post.sub_menus && post.sub_menus.name}
            </chakra.span>
            <Heading
              as="h1"
              color={useColorModeValue("brand.black", "white")}
              fontSize={{ base: "2xl", md: "5xl" }}
              fontWeight="700"
              lineHeight={{ base: "47.84px", md: "92px" }}
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
                  size={{ base: "md", md: "lg" }}
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${post.profiles.avatar_url}`}
                  name={`${post.profiles.first_name} ${post.profiles.last_name}`}
                />
                <Box>
                  <Link href={`/authors/${post.profiles.username}`} passHref>
                    <Text
                      fontWeight="600"
                      fontSize={{ base: "md", md: "xl" }}
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
                      fontSize={{ base: "sm", md: "lg" }}
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
            />

            <Box mt={16}>
              <Button
                onClick={incrementLikes}
                isDisabled={liked}
                display="flex"
                p={6}
                rounded="full"
                border="1px solid"
                borderColor={useColorModeValue("grey.200", "grey.400")}
                variant="unstyled"
                leftIcon={
                  <Logo fill={useColorModeValue("#A5A6A6", "#7C62E5")} />
                }
                color={useColorModeValue("grey.900", "#7C62E5")}
              >
                {likes} إعجاب
              </Button>
            </Box>
          </Flex>
          <Box
            display={{ base: "none", md: "initial" }}
            ms={{ base: 0, md: 10 }}
            w={{ base: "full", md: "35%" }}
          >
            {!post.tags ? null : (
              <Box mb={6}>
                <chakra.h2
                  color="brand.primary"
                  fontSize="2xl"
                  fontWeight="600"
                  lineHeight="44.16px"
                  mb={3}
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
                      color={tags_color}
                      bg={tags_bg_color}
                      rounded="full"
                      padding="4px 22px"
                      mb={2}
                      me={2}
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
                lineHeight="44.16px"
                mb={3}
              >
                مواضيع ذات صلة
              </chakra.h2>
              {similar_posts.length === 0 && "لا توجد مواضيع ذات صلة بعد"}
              {similar_posts &&
                similar_posts.map((post, index: index) => {
                  return (
                    <NextLink key={index} href={`/blogs/${post.id}`} passHref>
                      <Flex
                        pb={2}
                        borderBottom={seperator_color}
                        mb={10}
                        align="center"
                        _hover={{ cursor: "pointer" }}
                      >
                        <Box flex={1}>
                          <chakra.span
                            color="brand.secondary"
                            fontSize="md"
                            fontWeight="600"
                            lineHeight="29.44px"
                          >
                            {post.top_menus && post.top_menus.name}
                            {post.sub_menus && post.sub_menus.name}
                          </chakra.span>
                          <Heading
                            as="h3"
                            color={similar_posts_title}
                            fontSize="md"
                            fontWeight="700"
                            lineHeight="29.44px"
                            my={2}
                          >
                            {post.title}
                          </Heading>
                          <HStack align="center">
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
                            >
                              {post.created_at.slice(0, 10)}
                            </chakra.span>
                          </HStack>
                        </Box>
                        <Image
                          rounded={{ lg: "lg" }}
                          my={5}
                          h={{ base: 20, lg: 20 }}
                          fit="cover"
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${post.thumbnail}`}
                          alt={`${post.title} thumbnail`}
                        />
                      </Flex>
                    </NextLink>
                  );
                })}
            </Flex>
            <Box id="ads" className="ads" h="100vh" bg={ads_color} />
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

  // Get Top menu links
  const { data: topMenus } = await supabase
    .from("top_menus")
    .select("id, name, slug, order")
    .order("order", {
      ascending: true,
    });

  // Get Sub menu links
  const { data: subMenus } = await supabase
    .from("sub_menus")
    .select("id, name, slug, order")
    .order("order", {
      ascending: true,
    });

  const { data: post_top_menu } = await supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt, created_at, body, tags, top_menus!inner(name), profiles!inner(first_name, last_name,username, avatar_url)"
    )
    .eq("id", id)
    .single();

  const { data: post_sub_menu } = await supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt, created_at, body, tags, sub_menus!inner(name), profiles!inner(first_name, last_name,username, avatar_url)"
    )
    .eq("id", id)
    .single();

  if (post_top_menu) {
    const { data: similar_posts_top_menus } = await supabase
      .from("posts")
      .select(
        "id,title, created_at, thumbnail, top_menus!inner(name), profiles!inner(first_name, last_name)"
      )
      .filter("top_menus.name", "eq", post_top_menu!.top_menus!.name)
      .filter("id", "not.eq", post_top_menu.id)
      .range(0, 5);

    return {
      props: {
        post: post_top_menu,
        similar_posts: similar_posts_top_menus,
        topMenus,
        subMenus,
      },
    };
  }

  if (post_sub_menu) {
    const { data: similar_posts_sub_menus } = await supabase
      .from("posts")
      .select(
        "id,title, created_at, thumbnail, sub_menus!inner(name), profiles!inner(first_name, last_name)"
      )
      .filter("sub_menus.name", "eq", post_sub_menu!.sub_menus!.name)
      .filter("id", "not.eq", post_sub_menu.id)
      .range(0, 5);

    return {
      props: {
        post: post_sub_menu,
        similar_posts: similar_posts_sub_menus,
        topMenus,
        subMenus,
      },
    };
  }

  return {
    props: {
      topMenus,
      subMenus,
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

  let paths_top_menus: Params[] = [];
  let paths_sub_menus: Params[] = [];

  const { data: posts_top_menus, error: posts_top_menus_error } = await supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt, created_at, body, tags, top_menus!inner(name), profiles!inner(first_name, last_name,username, avatar_url)"
    );

  const { data: posts_sub_menus, error: posts_sub_menus_error } = await supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt, created_at, body, tags, sub_menus!inner(name), profiles!inner(first_name, last_name,username, avatar_url)"
    );

  if (posts_top_menus_error || posts_sub_menus_error) {
    return {
      paths: [],
      fallback: false,
    };
  }

  paths_top_menus = posts_top_menus.map((post: any) => ({
    params: { id: post.id },
  }));

  paths_sub_menus = posts_sub_menus.map((post: any) => ({
    params: { id: post.id },
  }));

  return {
    paths: [...paths_top_menus, ...paths_sub_menus],
    fallback: false,
  };
};
