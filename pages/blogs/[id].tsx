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
  Stack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useRef, useState } from "react";

import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "@/layouts/Default";
import Link from "next/link";
import Logo from "@/components/Logo";
import { NavbarResourcesType } from "@/types/blog";
import NextLink from "next/link";
import { supabase } from "@/utils/supabaseClient";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import FacebookCommment from "@/components/facebookComment";
import { useUser } from "@supabase/auth-helpers-react";

interface Props {
  post: any;
  similar_posts: any;
  topMenus: NavbarResourcesType[];
  subMenus: NavbarResourcesType[];
}

const FbComment = dynamic(() => Promise.resolve(FacebookCommment), { ssr: false });

function Blog({ post, similar_posts }: Props) {
  const similar_posts_date = useColorModeValue("grey.500", "grey.300");
  const similar_posts_author = useColorModeValue("grey.500", "white");
  const similar_posts_title = useColorModeValue("brand.black", "white");
  const tags_bg_color = useColorModeValue("purple.100", "grey.800");
  const tags_color = useColorModeValue("brand.black", "white");
  const purpleTitles = useColorModeValue("brand.primary", "brand.secondary");
  const seperator_color = useColorModeValue("1px solid #E7E8E8", "1px solid #7C62E5");

  const [likes, setLikes] = useState<number | null>(null);
  const [location, setLocation] = useState<any>({});
  const [likeLoad, setLikeLoad] = useState(false);
  const [liked, setLiked] = useState(false);
  const [owner, setOwner] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const user = useUser();
  const mounted = useRef<any>(true);

  const isOwner = async () => setOwner(user?.id === post.profiles.id);

  const getLikes = async () => {
    setLikeLoad(true);
    await fetch("/api/likes?q=" + post.id)
      .then((res) => res.json())
      .then((data) => {
        setLikes(data.count);
        setLiked(data.liked);
        setLikeLoad(false);
      });
  };

  const fireAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2000);
  };

  const incrementLikes = async () => {
    setLikeLoad(true);
    await fetch("/api/likes", {
      method: "POST",
      body: JSON.stringify({ post: post.id, ip: location.ip }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "تم اضافة الاعجاب بنجاح") {
          setLikeLoad(false);
          setLikes((likes ?? 0) + 1);
          setLiked(true);
          // animation
          fireAnimation();
        } else if (data.message === "تم حذف الاعجاب بنجاح") {
          setLikeLoad(false);
          setLikes((likes ?? 1) - 1);
          setLiked(false);
          // animation
          fireAnimation();
        } else {
          toast({
            title: "لقد حدث خطؤ, حاول من جديد",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
          setLikeLoad(false);
        }
      });
  };

  const addViewer = async () => {
    const location = JSON.parse(localStorage.getItem("location") ?? "{}");

    if (!location) {
      return;
    }

    setLocation(location);

    try {
      await supabase.rpc("add_post_viewer", {
        new_id: post.id,
        ip: location.ip,
        email: user?.email ?? "Anonymous",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/manage-blogs/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast({
          title: "تم حذف المقالة",
          description: "تم حذف المقالة بنجاح.",
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top-right",
          onCloseComplete: () => {
            router.push(`/authors/${post.profiles.username}`);
          },
        });
      })
      .catch((error: any) => {
        console.log("[error - delete post]: ", error);
      });
  };

  useEffect(() => {
    new Promise(async () => {
      await isOwner();
      await getLikes();
    });
  }, [user]);

  // execute only one time when the component mounts
  useEffect(() => {
    if (mounted.current) {
      mounted.current = false;
      new Promise(async () => {
        await addViewer();
      });
    }
  }, []);

  const ads_color = useColorModeValue("#F4F5F5", "#2F3133");

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Container my={{ base: 10, md: 20 }} maxW='container.xl'>
        <Flex flexDir={{ base: "column", lg: "row" }}>
          <Flex flexDir='column' flex={1}>
            <Stack align={"center"} justify={"space-between"} flexDirection={"row"}>
              <chakra.span
                color='brand.secondary'
                fontSize={{ base: "xl", md: "1.625rem" }}
                fontWeight='600'
                lineHeight={{ base: "36.8px", md: "47.84px" }}>
                {post.top_menus && post.top_menus.name}
                {post.sub_menus && post.sub_menus.name}
              </chakra.span>
              {owner && (
                <Box>
                  <IconButton
                    onClick={() =>
                      router.push(
                        {
                          pathname: "/dashboard/edit-blog",
                          query: { ...post },
                        },
                        "/dashboard/edit-blog"
                      )
                    }
                    aria-label='edit blog post'
                    icon={<FaEdit />}
                    marginInline={2}
                  />
                  <IconButton
                    onClick={async () => await handleDelete(post.id)}
                    aria-label='delete blog post'
                    icon={<FaTrash />}
                    marginInline={2}
                  />
                </Box>
              )}
            </Stack>
            <Heading
              as='h1'
              color={useColorModeValue("brand.black", "white")}
              fontSize={{ base: "2xl", md: "5xl" }}
              fontWeight='700'
              lineHeight={{ base: "47.84px", md: "92px" }}>
              {post.title}
            </Heading>
            <Flex mb={10} justifyContent='space-between' w='full' alignItems='flex-end'>
              <Flex align='center'>
                <Avatar
                  me={3}
                  size={{ base: "md", md: "lg" }}
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${post.profiles.avatar_url}`}
                  name={`${post.profiles.first_name} ${post.profiles.last_name}`}
                />
                <Box>
                  <Link href={`/authors/${post.profiles.username}`} passHref>
                    <Text
                      fontWeight='600'
                      fontSize={{ base: "md", md: "xl" }}
                      cursor='pointer'
                      _hover={{ textDecor: "underline" }}
                      color={useColorModeValue("brand.black", "white")}>
                      {`${post.profiles.first_name} ${post.profiles.last_name}`}
                    </Text>
                  </Link>
                  <Flex>
                    <chakra.span
                      color={useColorModeValue("grey.500", "#9DA2A4")}
                      fontSize={{ base: "sm", md: "lg" }}
                      fontWeight='400'>
                      {post.created_at.slice(0, 10)}
                    </chakra.span>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
            <Image
              overflow='hidden'
              rounded={{ lg: "lg" }}
              w='full'
              my={5}
              h={{ base: 64, lg: 96 }}
              fit='cover'
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${post.thumbnail}`}
              alt='Article'
            />

            <div
              className='post-sound-cloud'
              dangerouslySetInnerHTML={{ __html: post.sound_cloud_frame }}
            />

            <div className='post-content' dangerouslySetInnerHTML={{ __html: post.body }} />

            <Box w='fit-content' mt={16} position='relative'>
              {showAnimation && (
                <Box className='like-icon'>
                  <Logo animated fill={useColorModeValue!("brand.primary", "white")} />
                </Box>
              )}
              <Button
                onClick={incrementLikes}
                display='flex'
                disabled={likeLoad}
                p={6}
                rounded='full'
                border='1px solid'
                _hover={{
                  bg: useColorModeValue(
                    liked ? "purple.500" : "",
                    liked ? "brand.secondary" : "grey"
                  ),
                }}
                bg={useColorModeValue(
                  liked ? "brand.primary" : "",
                  liked ? "brand.secondary" : "grey"
                )}
                borderColor={useColorModeValue("grey.200", liked ? "brand.secondary" : "grey.200")}
                variant={liked ? "solid" : "outline"}
                leftIcon={
                  <Logo
                    fill={useColorModeValue(
                      liked ? "white" : "#A5A6A6",
                      liked ? "white" : "grey.200"
                    )}
                  />
                }
                color={useColorModeValue(
                  liked ? "white" : "grey.900",
                  liked ? "white" : "grey.200"
                )}>
                {likes} إعجاب
              </Button>
            </Box>
          </Flex>
          <Box
            display={{ base: "none", md: "initial" }}
            ms={{ base: 0, md: 10 }}
            w={{ base: "full", md: "35%" }}>
            {!post.tags ? null : (
              <Box mb={6}>
                <chakra.h2
                  color={purpleTitles}
                  fontSize='2xl'
                  fontWeight='600'
                  lineHeight='44.16px'
                  mb={3}>
                  الكلمات المفتاحية
                </chakra.h2>
                <Flex flexWrap='wrap'>
                  {post.tags.map((tag: string, index: number) => (
                    <Badge
                      key={index}
                      fontWeight={500}
                      fontSize='lg'
                      lineHeight='33.12px'
                      variant='solid'
                      color={tags_color}
                      bg={tags_bg_color}
                      rounded='full'
                      padding='4px 22px'
                      mb={2}
                      me={2}>
                      {tag}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            )}
            <Flex flexDir='column' mb={10}>
              <chakra.h2
                color={purpleTitles}
                fontSize='2xl'
                fontWeight='600'
                lineHeight='44.16px'
                mb={3}>
                مواضيع ذات صلة
              </chakra.h2>
              {similar_posts.length === 0 && "لا توجد مواضيع ذات صلة بعد"}
              {similar_posts &&
                similar_posts.map((post: any, index: number) => {
                  return (
                    <NextLink key={index} href={`/blogs/${post.id}`} passHref>
                      <Flex
                        pb={2}
                        mb={10}
                        align='center'
                        borderBottom={seperator_color}
                        _hover={{ cursor: "pointer" }}>
                        <Box className={`initial-fade-in-${index + 1}`} flex={1}>
                          <chakra.span
                            color='brand.secondary'
                            fontSize='md'
                            fontWeight='600'
                            lineHeight='29.44px'>
                            {post.top_menus && post.top_menus.name}
                            {post.sub_menus && post.sub_menus.name}
                          </chakra.span>
                          <Heading
                            as='h3'
                            color={similar_posts_title}
                            fontSize='md'
                            fontWeight='700'
                            lineHeight='29.44px'
                            my={2}>
                            {post.title}
                          </Heading>
                          <HStack align='center'>
                            <Text
                              fontWeight='400'
                              lineHeight='30px'
                              fontSize='md'
                              color={similar_posts_author}>
                              {`${post.profiles.first_name} ${post.profiles.last_name}`}
                            </Text>
                            <chakra.span color={similar_posts_date} fontSize='sm' fontWeight='500'>
                              {post.created_at.slice(0, 10)}
                            </chakra.span>
                          </HStack>
                        </Box>
                        <Image
                          rounded={{ lg: "lg" }}
                          my={5}
                          h={{ base: 20, lg: 20 }}
                          fit='cover'
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${post.thumbnail}`}
                          alt={`${post.title} thumbnail`}
                        />
                      </Flex>
                    </NextLink>
                  );
                })}
            </Flex>
            <Box id='ads' className='ads' h='100vh' bg={ads_color} />
          </Box>
        </Flex>
        <Box mt={12}>
          <FbComment />
        </Box>
      </Container>
    </>
  );
}

Blog.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Blog;

export const getStaticProps: GetStaticProps = async ({ params,  }) => {
  const { id } = params!;

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

  const { data: post_top_menu } = await supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt, created_at, body, tags, top_menus!inner(name), profiles!inner(id, first_name, last_name,username, avatar_url), sound_cloud_frame"
    )
    .eq("id", id)
    .single();

  if (post_top_menu) {
    const category: any = post_top_menu!.top_menus;
    const { data: similar_posts_top_menus } = await supabase
      .from("posts")
      .select(
        "id,title, created_at, thumbnail, top_menus!inner(name), profiles!inner(first_name, last_name), sound_cloud_frame"
      )
      .filter("top_menus.name", "eq", category.name)
      .filter("id", "not.eq", post_top_menu.id)
      .eq("status", "published")
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

  const { data: posts_top_menus, error: posts_top_menus_error } = await supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt, created_at, body, tags, top_menus!inner(name), profiles!inner(first_name, last_name,username, avatar_url), sound_cloud_frame"
    );

  if (posts_top_menus_error) {
    return {
      paths: [],
      fallback: false,
    };
  }

  paths_top_menus = posts_top_menus.map((post: any) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths: [...paths_top_menus],
    fallback: false,
  };
};
