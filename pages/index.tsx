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
  GridItem,
  Grid,
} from "@chakra-ui/react";
import { FamousAuthor, NavbarResourcesType } from "@/types/blog";
import { ReactElement, useEffect, useState } from "react";

import FamousEditor from "@/components/FamousEditors";
import LatestBlogs from "@/components/LatestBlogs";
import Layout from "@/layouts/Default";
import NextLink from "next/link";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import BlogCard from "@/components/BlogCard";
import Loading from "@/components/dashboard/Loading";

interface Props {
  authors: FamousAuthor[];
  topMenus: NavbarResourcesType[];
  subMenus: NavbarResourcesType[];
}

const Home = ({ authors }: Props) => {
  const router = useRouter();
  const bgColor = useColorModeValue("card.light", "card.dark");
  const [search, setSearch] = useState<any[]>([]);
  const purpleTitles = useColorModeValue("brand.primary", "brand.secondary");

  const [loading, setLoading] = useState(false);
  const [newBlog, setNewBlog] = useState<any>(undefined);
  const [latestBlogs, setLatestBlogs] = useState<any>(undefined);
  const [mostViewedBlogs, setMostViewedBlogs] = useState<any>(undefined);

  useEffect(() => {
    const setupData = async () => {
      setLoading(true);
      // Get The Newest Blog
      const { data: newBlogTopMenu } = await supabase
        .from("posts")
        .select(
          "id,title,thumbnail,excerpt, created_at, top_menus!inner(name), profiles!posts_user_id_fkey(first_name, last_name, avatar_url), sound_cloud_frame"
        )
        .order("created_at", {
          ascending: false,
        })
        .eq("status", "published")
        .limit(1)
        .single();

      const { data: newBlogSubMenu } = await supabase
        .from("posts")
        .select(
          "id,title,thumbnail,excerpt, created_at, sub_menus!inner(name), profiles!posts_user_id_fkey(first_name, last_name, avatar_url), sound_cloud_frame"
        )
        .order("created_at", {
          ascending: false,
        })
        .eq("status", "published")
        .limit(1)
        .single();

      // Get The Latest 3 Blogs
      const { data: latestBlogsTopMenus } = await supabase
        .from("posts")
        .select(
          "id,title,thumbnail,excerpt,created_at, top_menus!inner(name), profiles!posts_user_id_fkey(first_name, last_name, avatar_url), sound_cloud_frame"
        )
        .eq("status", "published")
        .order("created_at", {
          ascending: false,
        })
        .range(1, 3);

      const { data: latestBlogsSubMenus } = await supabase
        .from("posts")
        .select(
          "id,title,thumbnail,excerpt,created_at, sub_menus!inner(name), profiles!posts_user_id_fkey(first_name, last_name, avatar_url), sound_cloud_frame"
        )
        .eq("status", "published")
        .order("created_at", {
          ascending: false,
        })
        .range(1, 3);

      // Most Viewed Blogs
      let queryTopMenus = supabase
        .from("posts")
        .select(
          "id,title,thumbnail,excerpt,created_at, top_menus!inner(name), profiles!posts_user_id_fkey(first_name, last_name, avatar_url), sound_cloud_frame"
        )
        .eq("status", "published")
        .order("created_at", {
          ascending: true,
        })
        .range(0, 10);

      let querySubMenus = supabase
        .from("posts")
        .select(
          "id,title,thumbnail,excerpt,created_at, sub_menus!inner(name), profiles!posts_user_id_fkey(first_name, last_name, avatar_url, sound_cloud_frame"
        )
        .eq("status", "published")
        .order("created_at", {
          ascending: true,
        })
        .range(0, 10);

      if (newBlogTopMenu) {
        queryTopMenus = queryTopMenus.not("id", "eq", newBlogTopMenu?.id);
      }
      if (newBlogSubMenu) {
        querySubMenus = querySubMenus.not("id", "eq", newBlogSubMenu?.id);
      }
      if (latestBlogsTopMenus && latestBlogsTopMenus.length > 0) {
        if (newBlogTopMenu) {
          queryTopMenus = queryTopMenus.not(
            "id",
            "in",
            `(${latestBlogsTopMenus.map((blog) => blog.id)})`
          );
        }
      }
      if (latestBlogsSubMenus && latestBlogsSubMenus?.length > 0) {
        if (newBlogSubMenu) {
          querySubMenus = querySubMenus.not(
            "id",
            "in",
            `(${latestBlogsSubMenus.map((blog) => blog.id)})`
          );
        }
      }
      const { data: mostViewedBlogs } = newBlogTopMenu ? await queryTopMenus : await querySubMenus;

      setNewBlog(newBlogTopMenu);
      setLatestBlogs(latestBlogsTopMenus ?? latestBlogsSubMenus);
      setMostViewedBlogs(mostViewedBlogs);

      setLoading(false);
    };

    setupData();
  }, []);

  useEffect(() => {
    if (router.query.search) {
      findPosts(router.query.search as string);
    } else {
      setSearch([]);
    }
    fetch(`/api/views/index`, {
      method: "POST",
    });
  }, [router.query.search, setSearch]);

  const findPosts = async (q: string) => {
    await fetch("/api/manage-blogs?search=" + q)
      .then((res) => res.json())
      .then((data: any) => {
        console.log(data);
        setSearch(data.data);
      });
  };
  const seperator_color = useColorModeValue("1px solid #E7E8E8", "1px solid #7C62E5");
  const date_color = useColorModeValue("grey.500", "grey.300");
  const author_color = useColorModeValue("grey.500", "white");
  const title_color = useColorModeValue("brand.black", "white");
  const category_color = useColorModeValue("brand.secondary", "grey.300");
  const excerpt_color = useColorModeValue("#4F4F4F", "#F0F0F0");
  const ads_color = useColorModeValue("#F4F5F5", "#2F3133");

  if (loading) return <Loading />;

  return (
    <Box>
      {!search?.length ? (
        <>
          <LatestBlogs newBlog={newBlog} latestBlogs={latestBlogs} />
          <FamousEditor authors={authors} />
          {mostViewedBlogs && mostViewedBlogs.length > 0 && (
            <Container my={{ base: 10, md: 20 }} maxW='container.xl'>
              <Box my={8}>
                <chakra.h2
                  color={purpleTitles}
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight={600}
                  lineHeight={{ base: "51.52px", md: "55.2px" }}
                  mb={6}
                  textAlign={{ base: "center", md: "start" }}>
                  المواضيع الأكثر قراءة
                </chakra.h2>
                <Flex flexDir={{ base: "column", md: "row" }}>
                  <VStack flex={1} align='flex-start'>
                    {mostViewedBlogs.map((post: any, index: number) => {
                      return (
                        <NextLink key={index} href={`/blogs/${post.id}`} passHref>
                          <Flex
                            flexDirection={{
                              base: "column",
                              md: "row",
                            }}
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
                                lineHeight={{
                                  base: "46px",
                                  md: "63px",
                                }}
                                fontWeight={700}
                                my={{ base: 2, md: 4 }}
                                _groupHover={{
                                  color: "brand.primary",
                                }}
                                fontSize={{
                                  base: "2xl",
                                  md: "4xl",
                                }}>
                                {post.title}
                              </Heading>
                              <Text
                                noOfLines={3}
                                fontWeight={400}
                                fontSize={{ base: "md", md: "xl" }}
                                lineHeight={{
                                  base: "30px",
                                  md: "35px",
                                }}
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
                  <Box
                    ms={10}
                    id='ads'
                    className='ads'
                    w={{ base: "25%" }}
                    h='auto'
                    bg={ads_color}
                  />
                </Flex>
              </Box>
            </Container>
          )}
        </>
      ) : (
        <Grid
          gap={8}
          m='3em'
          templateRows='1fr auto'
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(6, 1fr)",
          }}>
          {search.map((blog: any) => (
            <GridItem key={blog.id} colSpan={{ base: 1, sm: 1, md: 2 }} bg={bgColor} rounded='lg'>
              <BlogCard type='latest' data={blog} />
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;

export const getStaticProps = async () => {
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

  // Get Famous Authors
  const { data: authors, error } = await supabase.rpc("get_famous_authors");

  return {
    props: {
      authors,
      topMenus,
      subMenus,
    },
  };
};
