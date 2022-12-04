import { Box, Button, Heading, IconButton, Input, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { FaTrash, FaEdit, FaShare } from "react-icons/fa";
import Layout from "@/layouts/Dashboard";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";


const ITEMS_IN_PAGE = 10

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size : size;

  return { from, to };
};

const ManageBlogs =  () => {
  const [data, setData] = useState<any[] | undefined>(undefined)
  const [postsNumber, setPostsNumber] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState<string|undefined>(undefined)
  const router = useRouter()
  const toast = useToast();

  useEffect(() => {
    new Promise(async ()=> {
      const getBlogs =  async (page: number) => {
        const {from, to} = getPagination(page, ITEMS_IN_PAGE);
        const {data: posts, count} = await paginateData(from, to)
        return {posts, count}
      }
      const {posts, count} = await getBlogs(currentPage)
      setData(posts ?? undefined)
      setPostsNumber(count ?? 0)
    })

  }, [currentPage])

  const paginateData = async (from:number, to:number) => {
    return await supabase.from('posts')
          .select("id,user_id(id, username), title, likes, tags, body,"+
                  "category_id(id, name), status, excerpt, thumbnail",
                  { count: "exact" })
          .order("created_at", { ascending: true })
          .range(from, to);
  }

  const handleAfterUpdate = async () => {
    const {data: posts, count} = await supabase.from('posts')
    .select("id,user_id(id, username), title, likes, tags, body,"+
    "category_id(id, name), status, excerpt, thumbnail",
    { count: "exact" })
    .order("created_at", { ascending: true })
    .range(0, 10);

    setData(posts ?? undefined)
    setPostsNumber(count ?? 0)
  }

  const isLastPage = () => {
    return (ITEMS_IN_PAGE * (currentPage+1) + ITEMS_IN_PAGE) > postsNumber
  }

  const handleNext = () => {
    setCurrentPage(currentPage+1)
  }

  const handleBack = () => {
    setCurrentPage(currentPage-1)
  }

  const handlePublish = async (id: number) => {
    const { error, status } = await supabase.from('posts')
                                    .update({ status: "published"})
                                    .eq("id", id)
    if (!error) {
      toast({
        title: "تم نشر المقالة",
        description: "تم نشر المقالة بنجاح, يُمكن للجميع رؤيتها الآن.",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top-right",
        onCloseComplete() {
          new Promise(async () => {
            await handleAfterUpdate()
          })
        },
      });
    } else {
      console.log("[error - share post]: ", error.message);
    }
  }

  const handleDelete = async (id: number) => {
    const { error, status } = await supabase.from('posts').delete().eq("id", id)

    if (!error) {
      toast({
        title: "تم حذف المقالة",
        description: "تم حذف المقالة بنجاح.",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top-right",
        onCloseComplete() {
          new Promise(async () => {
            await handleAfterUpdate()
          })
        },
      });
    } else {
      console.log("[error - delete post]: ", error.message);
    }
  }

  const handleSearch = async () => {
    const {data: posts, count} = await supabase.from('posts')
                                               .select("id,user_id(id, username), title, likes, tags, body,"+
                                               "category_id(id, name), status, excerpt, thumbnail",
                                               { count: "exact" })
                                               .textSearch('title', search ?? "", {
                                                  config: 'english'
                                               })
                                               .order("created_at", { ascending: true })

    setData(posts ?? undefined)
    setPostsNumber(count ?? 0)
  }

  return (
    <Box px={8}>
      <Heading>المقالات</Heading>
      <Stack  mt={16} spacing={4} direction="row" width="50%">
        <Input
          placeholder='اكتب العنوان الذي تريد البحث عنه'
          background="white"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>ابحث</Button>
      </Stack>
      <TableContainer mt={6} bg="white" >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>عنوان المقال</Th>
              <Th>المحرر</Th>
              <Th>عدد الاعجابات</Th>
              <Th>المجال</Th>
              <Th>عمليات (Actions)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((d:any, i:number) => (
              <Tr key={i}>
                <Td>{d.title}</Td>
                <Td>{d.user_id.username}</Td>
                <Td>{d.likes}</Td>
                <Td>{d.category_id.name}</Td>
                <Td>
                <Stack direction="row">
                  {d.status !== "published" && <IconButton
                    onClick={async () => await handlePublish(d.id)}
                    aria-label="accept and share blog post"
                    icon={<FaShare />}
                  />}
                  <IconButton
                    onClick={() => router.push({
                        pathname: "/dashboard/edit-blog",
                        query: {...d, category_id: d.category_id.id, user_id: d.user_id.id }}, "/dashboard/edit-blog")
                    }
                    aria-label="edit blog post"
                    icon={<FaEdit />}
                  />
                   <IconButton
                    onClick={async () => await handleDelete(d.id)}
                    aria-label="delete blog post"
                    icon={<FaTrash />}
                  />
                </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Stack direction="row">
        {!isLastPage() && <Button onClick={handleNext}>التالي</Button>}
        {currentPage !== 0 && <Button onClick={handleBack}>السابق</Button>}
      </Stack>
    </Box>
  );
};

ManageBlogs.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default ManageBlogs;

export async function getStaticProps() {
  return { props: { title: "HomePage" } };
}
function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; }) {
  throw new Error("Function not implemented.");
}

