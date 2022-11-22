import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";

import Layout from "@/layouts/Dashboard";
import StatsCard from "@/components/dashboard/Stat";
import { supabase } from "../../utils/supabaseClient";

const Statistics = () => {
  const [visitors, setVisitors] = useState(0);
  const [articles, setArticles] = useState(0);
  const [editors, setEditors] = useState(0);

  const getVisitors = async () => {
    const { data, error: err_view_count } = await supabase
      .from("pages")
      .select("view_count")
      .eq("slug", "index")
      .single();

    if (!err_view_count) {
      setVisitors(data.view_count);
    }
  };

  const getArticles = async () => {
    const { error, count } = await supabase
      .from("posts")
      .select("id", { count: "exact" });

    if (!error) {
      setArticles(count as number);
    }
  };

  const getEditors = async () => {
    const { error, count } = await supabase
      .from("profiles")
      .select("id", { count: "exact" })
      .eq("approved", true);

    if (!error) {
      setEditors(count as number);
    }
  };

  useEffect(() => {
    getVisitors();
    getArticles();
    getEditors();
  }, []);

  return (
    <Box px={8}>
      <Heading>إحصائيات</Heading>
      <SimpleGrid
        mt={8}
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 5, lg: 8 }}
      >
        <StatsCard title={"عدد الزوار"} stat={visitors} />
        <StatsCard title={"عدد المقالات"} stat={articles} />
        <StatsCard title={"عدد المحررين"} stat={editors} />
      </SimpleGrid>
    </Box>
  );
};

Statistics.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Statistics;

export async function getStaticProps() {
  return { props: { title: "HomePage" } };
}
