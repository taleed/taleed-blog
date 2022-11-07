import {
  Avatar,
  Box,
  Container,
  HStack,
  Heading,
  Icon,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

import { BsFillFileTextFill } from "react-icons/bs";
import { GetStaticProps } from "next";
import Layout from "@/layouts/Default";
import { ReactElement } from "react";
import { supabase } from "@/utils/supabaseClient";

function Author({ profile, posts }: { profile: any; posts: any }) {
  console.log("profile ", profile);
  console.log("posts ", posts);

  const title_color = useColorModeValue("brand.black", "white");
  const excerpt_color = useColorModeValue("#4F4F4F", "#F0F0F0");
  const author_color = useColorModeValue("brand.black", "#F0F0F0");
  return (
    <>
      <Box h="182px" bg="purple.300" />
      <Container position="relative" top={-16} mb={20} maxW="container.xl">
        <Avatar
          border="4px solid white"
          position="relative"
          size="2xl"
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${profile.avatar_url}`}
          name={`${profile.first_name} ${profile.last_name}`}
        />
        <Heading
          as="h1"
          fontSize="5xl"
          fontWeight={700}
          lineHeight="92px"
          color={useColorModeValue("brand.black", "white")}
        >
          {`${profile.first_name} ${profile.last_name}`}
        </Heading>
        <HStack>
          <Icon as={BsFillFileTextFill} w={18} h={18} color="#9DA2A4" />
          <chakra.span
            fontSize="lg"
            lineHeight="47px"
            fontWeight={500}
            color="#9DA2A4"
          >
            {posts ? posts.length : 0} مقالات
          </chakra.span>
        </HStack>
        <Text
          color="#4F4F4F"
          lineHeight="38px"
          fontWeight={500}
          fontSize="1.375rem"
        >
          {profile.about}
        </Text>
        <Box mt={16}>
          <Heading
            color={useColorModeValue("brand.primary", "brand.secondary")}
            as="h2"
            mb={6}
          >
            المقالات
          </Heading>
          {posts &&
            posts.map((post, index: number) => (
              <Box mt={4} pb={8} borderBottom="1px solid #EDEAF8" key={index}>
                <chakra.span
                  color="brand.secondary"
                  fontSize="1.625rem"
                  fontWeight="600"
                  lineHeight="47.84px"
                >
                  {post.categories.name}
                </chakra.span>
                <Heading
                  as="h3"
                  color={title_color}
                  fontSize="5xl"
                  fontWeight="700"
                  lineHeight="92px"
                >
                  {post.title}
                </Heading>
                <Text
                  noOfLines={3}
                  fontWeight={400}
                  fontSize={"md"}
                  color={excerpt_color}
                >
                  {post.excerpt}
                </Text>
                <HStack mt={{ base: 3, md: 2.5 }}>
                  <Avatar
                    size={"md"}
                    name={`${profile.first_name} ${profile.last_name}`}
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${profile.avatar_url}`}
                  />
                  <Box>
                    <chakra.span
                      fontWeight={600}
                      fontSize={"md"}
                      display="block"
                      color={author_color}
                    >
                      {`${profile.first_name} ${profile.last_name}`}
                    </chakra.span>
                    <chakra.span
                      fontWeight={500}
                      fontSize={"sm"}
                      display="block"
                      color="grey.400"
                    >
                      {new Date(post.created_at).toLocaleDateString("en-US")}
                    </chakra.span>
                  </Box>
                </HStack>
              </Box>
            ))}
        </Box>
      </Container>
    </>
  );
}
Author.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Author;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { username } = params!;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (profile) {
    const { data: posts } = await supabase
      .from("posts")
      .select(
        "id,title, excerpt, thumbnail, created_at, categories!inner(name)"
      )
      .eq("user_id", profile.id);

    return {
      props: {
        profile,
        posts,
      },
    };
  }

  return {
    props: {},
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

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .single();

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
