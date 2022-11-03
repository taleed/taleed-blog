import { Box, Button, Flex, chakra } from "@chakra-ui/react";

import MainBlog from "@/components/blogs/mainBlog";

interface SideBlogProps {
    title?: string;
    edited?: boolean;
    blogsData: {
      categories: {name: string};
      created_at: string;
      excerpt: string;
      id: number;
      profiles: {
        avatar_url: string;
        first_name: string;
        last_name: string;
        username: string
      };
      thumbnail: string;
      title: string;
    }[];
}

const SideBlog = ({title, blogsData, edited = false}:SideBlogProps) => {
  return (
    <>
        <Flex flexDir="column">
            {
              title && <chakra.h2 color="brand.primary" fontSize="2xl" fontWeight="600" mb="20px">{title}</chakra.h2>
            }
            {
              blogsData.map((blog) => {
                return (
                    <Box mb={10} key={blog.id}>
                        <MainBlog edited={edited} blogData={blog}/>
                    </Box>         
                )
              })
            }
        </Flex>
    </>
    
  )
};

export default SideBlog;
