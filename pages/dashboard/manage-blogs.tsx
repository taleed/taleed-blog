import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import Layout from "@/layouts/Dashboard";
import { supabase } from "../../utils/supabaseClient";
import { getPagination, ITEMS_IN_PAGE } from "@/utils/paginationConfig";
import Loading from "@/components/dashboard/Loading";
import PaginationBar from "@/components/PaginationBar";
import BlogRow from "@/components/dashboard/BlogRow";

const ManageBlogs = () => {
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [postsNumber, setPostsNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState<string | undefined>(undefined);

  //   Colors
  const tableBg = useColorModeValue("white", "whiteAlpha.50");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const inputBg = useColorModeValue("white", "whiteAlpha.50");
  const focusBg = useColorModeValue("whiteAlpha.500", "whiteAlpha.200");

  useEffect(() => {
    new Promise(async () => {
      const getBlogs = async (page: number) => {
        const { from, to } = getPagination(page, ITEMS_IN_PAGE);
        const { data: posts, count } = await paginateData(from, to);
        return { posts, count };
      };

      setLoading(true);
      const { posts, count } = await getBlogs(currentPage);
      setData(posts ?? undefined);
      setPostsNumber(count ?? 0);

      setLoading(false);
    });
  }, [currentPage]);

  const paginateData = async (from: number, to: number) => {
    return await supabase
      .from("posts")
      .select(
        "id,user_id(id, username), title, likes, tags, body," +
          "category_id(id, name), status, excerpt, thumbnail, views",
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range(from, to);
  };

  const handleSearch = async () => {
    const { data: posts, count } = await supabase
      .from("posts")
      .select(
        "id,user_id(id, username), title, likes, tags, body," +
          "category_id(id, name), status, excerpt, thumbnail",
        { count: "exact" }
      )
      .textSearch("title", search ?? "", {
        config: "english",
      })
      .order("created_at", { ascending: false });

    setData(posts ?? undefined);
    setPostsNumber(count ?? 0);
  };

  return (
    <Box px={8}>
      <Heading>المقالات ({postsNumber})</Heading>
      <Stack mt={16} spacing={4} direction='row' width='50%'>
        <Input
          bg={inputBg}
          _focus={{ bg: focusBg }}
          placeholder='اكتب العنوان الذي تريد البحث عنه'
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>ابحث</Button>
      </Stack>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer bg={tableBg} mt={6}>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th borderColor={borderColor}>عنوان المقال</Th>
                <Th borderColor={borderColor}>المحرر</Th>
                <Th borderColor={borderColor}>عدد الإعجابات</Th>
                <Th borderColor={borderColor}>عدد الزيارات</Th>
                <Th borderColor={borderColor}>المجال</Th>
                <Th borderColor={borderColor}>عمليات (Actions)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((d: any, i: number) => (
                <BlogRow d={d} setData={setData} key={i} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <PaginationBar
        max={postsNumber}
        itemsPerPage={ITEMS_IN_PAGE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

ManageBlogs.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default ManageBlogs;

export async function getStaticProps() {
  return { props: { title: "HomePage" } };
}
