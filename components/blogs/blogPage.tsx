import { Box, Button, Container, Flex, chakra, useColorModeValue } from "@chakra-ui/react";

import HeadBlogs from "@/components/blogs/headBlogs";
import MainBlog from "@/components/blogs/mainBlog";

interface MyBlogPageProps {
  category: string;
  blogsData: {
    blogID: number;
    blogImg: string;
    category: string;
    title: string;
    description: string;
    authorID: number;
    authorName: string;
    createdDate: string;
    authorImg: string;
    }[];
}

const BlogPage = ({category, blogsData}:MyBlogPageProps) => {
  return (
    <>
        <Box>
            <chakra.h2 color="brand.primary" display='flex' justifyContent="center" my="30px" fontSize="2xl" position="relative">
                <Box position="absolute" top="50%" left="0" w="100%" h="2px" zIndex="0" bgColor="brand.primary"></Box>
                <Box px="10px" fontWeight="600" bgColor={useColorModeValue("white", "brand.black")} position="relative" zIndex="99" w="fit-content">{category}</Box>
            </chakra.h2>
        </Box>
        <Container maxW="6xl" mb="60px">
            <HeadBlogs blogsData={blogsData}/>
            <Flex w="full" h="300px" bg="blackAlpha.400" align="center" justify="center" mt="40px"> Advertising </Flex>
            <Flex flexDir={{base:"column", lg:"row"}} mt="80px">
                <Flex flexDir="column">
                {
                    blogsData.slice(4).map((blog) => {
                        return (
                            <Box mb={10} key={blog.blogID}>
                                <MainBlog blogData={blog}/>
                            </Box>         
                        )
                    })
                }
                    <Button bg="transparent" 
                            border="2px"
                            px="20px"
                            alignSelf="center"
                            h="50px"
                            borderColor="brand.secondary" 
                            color="brand.secondary"
                            >
                            عرض المزيد
                    </Button>
                </Flex>
                <Flex minW={{base:"full" , lg:"300px"}} h={{base:"300px" , lg:"1500px"}} mr={{base:"0" , lg:"30px"}} mt={{base:"30px" , lg:"0px"}} bgColor="blackAlpha.400" align="center" justify="center">Advertising</Flex>
            </Flex>
        </Container>
    </>
    
  )
};

export default BlogPage;
