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
import { NavbarResourcesType } from "@/types/blog";

import { GetStaticProps } from "next";
import Head from "next/head";
import LatestBlogs from "@/components/LatestBlogs";
import Layout from "@/layouts/Default";
import NextLink from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import Loading from "@/components/dashboard/Loading";

interface Props {
  category: { name: string };
  topMenus: NavbarResourcesType[];
  subMenus: NavbarResourcesType[];
}

const Category = ({ category }: Props) => {
  const seperator_color = useColorModeValue("1px solid #E7E8E8", "1px solid #7C62E5");
  const date_color = useColorModeValue("grey.500", "grey.300");
  const author_color = useColorModeValue("grey.500", "white");
  const title_color = useColorModeValue("brand.black", "white");
  const category_color = useColorModeValue("brand.secondary", "grey.300");
  const excerpt_color = useColorModeValue("#4F4F4F", "#F0F0F0");

  const [newBlog, setNewBlog] = useState<any>();
  const [latestBlogs, setlatestBlogs] = useState<any>();
  const [restBlogs, setRestBlogs] = useState<any>();

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { type, slug } = router.query;

  useEffect(() => {
    const setupData = async () => {
      setLoading(true);
      // Get The Newest Blog (by category)
      const { data: newBlog } = await supabase
        .from("posts")
        .select(
          `id,title,thumbnail,excerpt, created_at, ${type}_menus!inner(name, slug), profiles!inner(first_name, last_name, avatar_url)`
        )
        .eq(`${type}_menus.slug`, slug)
        .eq("status", "published")
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .single();

      // Get The Latest 3 Blogs (by category)
      const { data: latestBlogs } = await supabase
        .from("posts")
        .select(
          `id,title,thumbnail,excerpt,created_at, ${type}_menus!inner(name, slug), profiles!inner(first_name, last_name, avatar_url)`
        )
        .eq(`${type}_menus.slug`, slug)
        .eq("status", "published")
        .order("created_at", {
          ascending: false,
        })
        .range(1, 3);

      // Rest Blogs (by category)
      let query = supabase
        .from("posts")
        .select(
          `id,title,thumbnail,excerpt,created_at, ${type}_menus!inner(name, slug), profiles!inner(first_name, last_name, avatar_url)`
        )
        .eq(`${type}_menus.slug`, slug)
        .eq("status", "published")
        .order("created_at", {
          ascending: true,
        });

      if (newBlog) {
        query = query.not("id", "eq", newBlog.id);
      }
      if (latestBlogs && latestBlogs?.length > 0) {
        query = query.not("id", "in", `(${latestBlogs.map((blog: any) => blog.id)})`);
      }
      const { data: restBlogs } = await query;

      setNewBlog(newBlog);
      setlatestBlogs(latestBlogs);
      setRestBlogs(restBlogs);

      setLoading(false);
    };

    setupData();
  }, [slug, type]);

  if (loading) return <Loading />;

  return (
    <>
      <Head>
        <title>{`تليد - مواضيع في ${category && category.name}`}</title>
      </Head>
      <Container my={{ base: 10 }} maxW='container.xl'>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "2px solid",
            borderColor: useColorModeValue!("grey.200", "whiteAlpha.300"),
            flexGrow: 1,
          }}
          _after={{
            content: '""',
            borderBottom: "2px solid",
            borderColor: useColorModeValue!("grey.200", "whiteAlpha.300"),
            flexGrow: 1,
          }}>
          <chakra.span
            mx={4}
            fontWeight={400}
            fontSize='5xl'
            color={useColorModeValue!("brand.primary", "brand.secondary")}>
            {category && category.name}
          </chakra.span>
        </Flex>
        <LatestBlogs newBlog={newBlog} latestBlogs={latestBlogs} />
        {restBlogs && restBlogs.length > 0 && (
          <Box my={8}>
            <chakra.h2
              color='brand.primary'
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight={600}
              lineHeight={{ base: "51.52px", md: "55.2px" }}
              mb={6}
              textAlign={{ base: "center", md: "start" }}>
              المواضيع الأكثر قراءة
            </chakra.h2>
            <VStack align='flex-start'>
              {restBlogs &&
                restBlogs.map((post: any, index: number) => {
                  return (
                    <NextLink key={index} href={`/blogs/${post.id}`} passHref>
                      <Flex
                        flexDirection={{ base: "column", md: "row" }}
                        w='full'
                        py={6}
                        borderBottom={seperator_color}
                        mb={10}
                        align='center'
                        _hover={{ cursor: "pointer" }}>
                        <Box flex={1}>
                          <chakra.span
                            color={category_color}
                            display='block'
                            fontWeight={600}
                            lineHeight={"37px"}
                            fontSize={{ base: "md", md: "xl" }}>
                            {post.top_menus && post.top_menus.name}
                            {post.sub_menus && post.sub_menus.name}
                          </chakra.span>
                          <Heading
                            as='h3'
                            color={title_color}
                            lineHeight={{ base: "46px", md: "63px" }}
                            fontWeight={700}
                            my={{ base: 2, md: 4 }}
                            _groupHover={{ color: "brand.primary" }}
                            fontSize={{ base: "2xl", md: "4xl" }}>
                            {post.title}
                          </Heading>
                          <Text
                            noOfLines={3}
                            fontWeight={400}
                            fontSize={{ base: "md", md: "xl" }}
                            lineHeight={{ base: "30px", md: "35px" }}
                            color={excerpt_color}>
                            {post.excerpt}
                          </Text>
                          <HStack mt={4} align='center'>
                            <Avatar
                              size={{ base: "md", md: "lg" }}
                              name={`${post.profiles.first_name} ${post.profiles.last_name}`}
                              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${post.profiles.avatar_url}`}
                            />
                            <Box>
                              <Text
                                fontWeight='400'
                                lineHeight='30px'
                                fontSize='md'
                                color={author_color}>
                                {`${post.profiles.first_name} ${post.profiles.last_name}`}
                              </Text>
                              <chakra.span color={date_color} fontSize='sm' fontWeight='500'>
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
                          fit='cover'
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
  const { slug, type } = params!;

  const { data: category } = await supabase
    .from(`${type}_menus`)
    .select("name")
    .eq("slug", slug)
    .single();

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

  return {
    props: {
      category,
      topMenus,
      subMenus,
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

  let top_menus_paths: Params[] = [];
  let sub_menus_paths: Params[] = [];

  const { data: top_menus, error: top_menus_error } = await supabase
    .from(`top_menus`)
    .select("slug");

  const { data: sub_menus, error: sub_menus_error } = await supabase
    .from(`top_menus`)
    .select("slug");

  if (top_menus_error || sub_menus_error) {
    return {
      paths: [],
      fallback: false,
    };
  }

  top_menus_paths = top_menus.map((menu: any) => ({
    params: { slug: menu.slug },
  }));

  sub_menus_paths = sub_menus.map((menu: any) => ({
    params: { slug: menu.slug },
  }));

  return {
    paths: [...top_menus_paths, ...sub_menus_paths],
    fallback: false,
  };
};
