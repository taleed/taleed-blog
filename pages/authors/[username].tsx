import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  chakra,
  useColorModeValue,
  Link as ChakraLink,
} from "@chakra-ui/react";

import { BsFillFileTextFill } from "react-icons/bs";
import { GetStaticProps } from "next";
import Layout from "@/layouts/Default";
import { NavbarResourcesType } from "@/types/blog";
import { ReactElement } from "react";
import { supabase } from "@/utils/supabaseClient";
import NextLink from "next/link";

interface Props {
  profile: any;
  posts: any;
  topMenus: NavbarResourcesType[];
  subMenus: NavbarResourcesType[];
}

function Author({ profile, posts }: Props) {
  const title_color = useColorModeValue("brand.black", "white");
  const excerpt_color = useColorModeValue("#4F4F4F", "#F0F0F0");
  const author_color = useColorModeValue("brand.black", "#F0F0F0");
  const author_avatar_border_color = useColorModeValue("4px solid white", "4px solid #222");
  const author_posts_box_border = useColorModeValue("1px solid #EDEAF8", "1px solid #414447");

  return (
    <>
      <Box h='182px' bg='purple.300' />
      <Container
        position='relative'
        top={{ base: -14, md: -16 }}
        mb={{ base: 0, md: 20 }}
        maxW='container.xl'>
        <Flex flexDirection={{ base: "column", ms: "row" }}>
          <Box flex={1}>
            <Avatar
              border={author_avatar_border_color}
              position='relative'
              size={{ base: "xl", md: "2xl" }}
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${profile?.avatar_url}`}
              name={`${profile?.first_name} ${profile?.last_name}`}
            />
            <Heading
              as='h1'
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight={700}
              lineHeight={{ base: "47.84px", md: "92px" }}
              color={useColorModeValue("brand.black", "white")}>
              {`${profile?.first_name} ${profile?.last_name}`}
            </Heading>
            <HStack>
              <Icon as={BsFillFileTextFill} w={18} h={18} color='#9DA2A4' />
              <chakra.span
                fontSize={{ base: "sm", md: "lg" }}
                lineHeight={{ base: "47px" }}
                fontWeight={500}
                color='#9DA2A4'>
                {posts ? posts.length : 0} مقالات
              </chakra.span>
            </HStack>
            <Text
              color={useColorModeValue("#4F4F4F", "grey.300")}
              lineHeight={{ base: "33px", md: "38px" }}
              fontWeight={500}
              fontSize={{ base: "md", md: "1.375rem" }}>
              {profile?.about}
            </Text>
            <Box mt={16}>
              <Heading
                color={useColorModeValue("brand.primary", "brand.secondary")}
                as='h2'
                mb={6}
                fontSize={{ base: "2xl", md: "5xl" }}>
                المقالات
              </Heading>
              {posts &&
                posts.map((post: any, index: number) => (
                  <NextLink key={post.id} href={`/blogs/${post.id}`} passHref>
                    <ChakraLink _hover={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
                      <Flex
                        mt={4}
                        pb={8}
                        borderBottom={author_posts_box_border}
                        justify='space-between'
                        align='center'>
                        <Box me={4}>
                          <chakra.span
                            color='brand.secondary'
                            fontSize={{ base: "md", md: "1.625rem" }}
                            fontWeight='600'
                            lineHeight={{ base: "27.6px", md: "47.84px" }}>
                            {post.top_menus && post.top_menus.name}
                            {post.sub_menus && post.sub_menus.name}
                          </chakra.span>
                          <Heading
                            my={3}
                            as='h3'
                            color={title_color}
                            fontSize={{ base: "xl", md: "4xl" }}
                            fontWeight='700'
                            lineHeight={{ base: "33.12px", md: "92px" }}>
                            {post.title}
                          </Heading>
                          <Text
                            noOfLines={3}
                            fontWeight={400}
                            fontSize={"md"}
                            color={excerpt_color}>
                            {post.excerpt}
                          </Text>
                          <HStack mt={{ base: 3, md: 2.5 }}>
                            <Avatar
                              size={"md"}
                              name={`${profile?.first_name} ${profile?.last_name}`}
                              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${profile?.avatar_url}`}
                            />
                            <Box>
                              <chakra.span
                                fontWeight={600}
                                fontSize={"md"}
                                display='block'
                                color={author_color}>
                                {`${profile?.first_name} ${profile?.last_name}`}
                              </chakra.span>
                              <chakra.span
                                fontWeight={500}
                                fontSize={"sm"}
                                display='block'
                                color='grey.400'>
                                {new Date(post.created_at).toLocaleDateString("en-US")}
                              </chakra.span>
                            </Box>
                          </HStack>
                        </Box>
                        <Image
                          display={{ base: "none", md: "initial" }}
                          rounded={{ lg: "lg" }}
                          my={5}
                          w='40%'
                          fit='cover'
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${post.thumbnail}`}
                          alt={`${post.title} thumbnail`}
                        />
                      </Flex>
                    </ChakraLink>
                  </NextLink>
                ))}
            </Box>
          </Box>
          <Box
            display={{ base: "none", md: "block" }}
            ms={{ base: 0, md: 16 }}
            pos='relative'
            top={{ base: 0, md: 24 }}
            id='ads'
            className='ads'
            w={{ base: "full", md: "25%" }}
            bg={useColorModeValue("#F4F5F5", "#2F3133")}
          />
        </Flex>
        <Box
          mt={20}
          display={{ base: "block", md: "none" }}
          id='ads'
          className='ads'
          w={{ base: "full" }}
          h={36}
          bg={useColorModeValue("#F4F5F5", "#2F3133")}
        />
      </Container>
    </>
  );
}
Author.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Author;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { username } = params!;

  // Get Top menu links
  const { data: topMenus } = await supabase
    .from("top_menus")
    .select("id, name, slug, order")
    .eq("type", "top")
    .order("order", {
      ascending: true,
    });

  // Get Sub menu links
  const { data: subMenus } = await supabase
    .from("top_menus")
    .select("id, name, slug, order")
    .eq("type", "sub")
    .order("order", {
      ascending: true,
    });

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (profile) {
    const { data: posts_top_menus } = await supabase
      .from("posts")
      .select("id,title, excerpt, thumbnail, created_at, top_menus!inner(name)")
      .eq("status", "published")
      .eq("user_id", profile.id);

    return {
      props: {
        profile,
        posts: posts_top_menus,
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
    username: string;
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

  const { data: profiles, error } = await supabase.from("profiles").select("*").single();

  if (error) {
    return {
      paths: [],
      fallback: false,
    };
  }

  paths = profiles.map((profile: any) => ({
    params: { username: profile.username },
  }));

  return {
    paths,
    fallback: false,
  };
};
