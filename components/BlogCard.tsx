import {
  Avatar,
  Box,
  Link as ChakraLink,
  Flex,
  HStack,
  Heading,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

import { BlogWithCategoriesProfiles } from "@/types/blog";
import { FC } from "react";
import Image from "next/image";
import NextLink from "next/link";
import Watermark from "public/watermark.png";

type Props = {
  data: BlogWithCategoriesProfiles;
  type: string;
};

const BlogCard: FC<Props> = ({ data, type }) => {
  return (
    <NextLink href={`/blogs/${data.id}`} passHref>
      <ChakraLink _hover={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Box role='group' h={"100%"}>
          <Flex
            h='full'
            alignItems='center'
            justifyContent='center'
            flexDirection={{
              base: "column",
              md: type === "new" ? "row" : "column",
            }}>
            <BlogCardImg type={type} thumbnail={data.thumbnail} />
            <BlogCardContent type={type} blog={data} />
          </Flex>
        </Box>
      </ChakraLink>
    </NextLink>
  );
};

const BlogCardImg = ({ thumbnail, type }: { thumbnail: string; type: string }) => {
  return (
    <Box
      borderRadius='lg'
      overflow='hidden'
      position='relative'
      w={{ base: "full", md: type === "new" ? "45%" : "full" }}>
      <Image
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${thumbnail}`}
        alt='blog thumbnail'
        layout='responsive'
        width='100%'
        height='70%'
      />
      <Box className='img-watermark img-watermark-top'>
        <Image src={Watermark} alt='watermark' width='100%' height='70%' />
      </Box>
      <Box className='img-watermark img-watermark-bottom'>
        <Image src={Watermark} alt='watermark' width='100%' height='70%' />
      </Box>
    </Box>
  );
};

const BlogCardContent = ({ blog, type }: { blog: BlogWithCategoriesProfiles; type: string }) => {
  return (
    <Box
      ms={{ base: 0, md: type === "new" ? 35 : "0" }}
      maxW={{ base: "full", md: type === "new" ? "60%" : "full" }}
      alignSelf='flex-start'
      textAlign={{ base: "start" }}
      flex='1'
      mt={type === "latest" ? 6 : { base: 4, md: 0 }}
      display={type === "new" ? "initial" : "flex"}
      flexDirection={type === "new" ? "initial" : "column"}>
      <chakra.span
        display='block'
        fontWeight={600}
        lineHeight={type === "new" ? "37px" : "30px"}
        fontSize={type === "new" ? { base: "md", md: "xl" } : "md"}
        color={useColorModeValue("brand.secondary", "grey.300")}>
        {blog.top_menus && blog.top_menus.name}
        {blog.sub_menus && blog.sub_menus.name}
      </chakra.span>
      <Heading
        color={useColorModeValue("brand.black", "brand.secondary")}
        _groupHover={{ color: "brand.primary" }}
        fontSize={type === "new" ? { base: "2xl", md: "4xl" } : "2xl"}
        my={{ base: 2, md: 4 }}
        lineHeight={type === "new" ? { base: "46px", md: "63px" } : "46px"}
        fontWeight={700}>
        {blog.title}
      </Heading>
      <Box mt={type === "new" ? 0 : "auto"}>
        <Text
          noOfLines={3}
          fontWeight={400}
          fontSize={type === "new" ? { base: "md", md: "xl" } : "md"}
          lineHeight={type === "new" ? { base: "30px", md: "35px" } : "30px"}
          color={useColorModeValue("#4F4F4F", "#F0F0F0")}>
          {blog.excerpt}
        </Text>
        <HStack mt={{ base: 3, md: 2.5 }}>
          <Avatar
            size={type === "new" ? { base: "md", md: "lg" } : "md"}
            name={`${blog.profiles.first_name} ${blog.profiles.last_name}`}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${blog.profiles.avatar_url}`}
          />
          <Box>
            <chakra.span
              fontWeight={600}
              fontSize={type === "new" ? { base: "md", md: "xl" } : "md"}
              display='block'
              color={useColorModeValue("brand.black", "#F0F0F0")}>
              {`${blog.profiles.first_name} ${blog.profiles.last_name}`}
            </chakra.span>
            <chakra.span
              fontWeight={500}
              fontSize={type === "new" ? { base: "sm", md: "lg" } : "sm"}
              display='block'
              color='grey.400'>
              {new Date(blog.created_at).toLocaleDateString("en-US")}
            </chakra.span>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default BlogCard;
