import {
  Box,
  Container,
  Grid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";

import BlogCard from "@/components/BlogCard";
import { BlogWithCategoriesProfiles } from "types/blog";

interface Props {
  latestBlogs: BlogWithCategoriesProfiles[];
  newBlog: BlogWithCategoriesProfiles;
}

const LatestBlogs = ({ newBlog, latestBlogs }: Props) => {
  const bgColor = useColorModeValue("card.light", "card.dark");

  return (
    <Container py={16} maxW="container.xl">
      <Grid
        gap={8}
        templateRows="1fr auto"
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(6, 1fr)",
        }}
      >
        {newBlog && (
          <GridItem
            colSpan={{ base: 1, sm: 1, md: 6 }}
            bg={bgColor}
            rounded={"lg"}
          >
            <BlogCard type="new" data={newBlog} />
          </GridItem>
        )}
        {latestBlogs.length === 0 ? null : (
          <>
            {latestBlogs.map((blog: BlogWithCategoriesProfiles) => (
              <GridItem
                key={blog.id}
                colSpan={{ base: 1, sm: 1, md: 2 }}
                bg={bgColor}
                rounded={"lg"}
              >
                <BlogCard type="latest" data={blog} />
              </GridItem>
            ))}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default LatestBlogs;
