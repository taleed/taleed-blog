import { BlogWithCategoriesProfiles, FamousAuthor } from "@/types/blog";

import { Box } from "@chakra-ui/react";
import FamousEditor from "@/components/FamousEditors";
import LatestBlogs from "@/components/LatestBlogs";
import Layout from "@/layouts/Default";
import { ReactElement } from "react";
import { supabase } from "@/utils/supabaseClient";

interface Props {
  latestBlogs: BlogWithCategoriesProfiles[];
  newBlog: BlogWithCategoriesProfiles;
  authors: FamousAuthor[];
}

const Home = ({ newBlog, latestBlogs, authors }: Props) => {
  return (
    <Box>
      <LatestBlogs newBlog={newBlog} latestBlogs={latestBlogs} />
      <FamousEditor authors={authors} />
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;

export const getStaticProps = async () => {
  // Get The Newest Blog
  const { data: newBlog } = await supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt, created_at, categories!inner(name), profiles!inner(first_name, last_name, avatar_url)"
    )
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .single();

  // Get The Latest 3 Blogs
  const { data: latestBlogs } = await supabase
    .from("posts")
    .select(
      "id,title,thumbnail,excerpt,created_at, categories!inner(name), profiles!inner(first_name, last_name, avatar_url)"
    )
    .order("created_at", {
      ascending: false,
    })
    .range(1, 3);

  // Get Famous Authors
  const { data: authors } = await supabase.rpc("famous_authors");

  return {
    props: {
      newBlog,
      latestBlogs,
      authors,
    },
  };
};
