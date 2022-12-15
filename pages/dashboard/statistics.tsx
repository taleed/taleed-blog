import {
  Box,
  Button,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";

import Layout from "@/layouts/Dashboard";
import StatsCard from "@/components/dashboard/Stat";
import { supabase } from "../../utils/supabaseClient";
import { getPagination, ITEMS_IN_PAGE } from "@/utils/paginationConfig";

const Statistics = () => {
  const [visitorList, setVisitorsList] = useState<any[]>([]);
  const [visitors, setVisitors] = useState(0);
  const [articles, setArticles] = useState(0);
  const [approvedEditors, setApprovedEditors] = useState(0);
  const [unapprovedEditors, setUnapprovedEditors] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);

  const getVisitorsList = async () => {
    try {
      const { from, to } = getPagination(currentPage, ITEMS_IN_PAGE);
      const { error, data, count } = await supabase
        .from("visitors")
        .select("*", { count: "exact" })
        .order("id", { ascending: false })
        .range(Number(from as unknown as string), Number(to as unknown as string));
      if (error) {
        toast({
          title: "حدث خطأ",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      } else {
        setVisitorsList(data);
        setCount(count ?? 0);
      }
    } catch (error: any) {
      toast({
        title: "حدث خطأ",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const isLastPage = () => {
    return ITEMS_IN_PAGE * (currentPage + 1) + ITEMS_IN_PAGE > count;
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleBack = () => {
    setCurrentPage(currentPage - 1);
  };

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
    const { error, count } = await supabase.from("posts").select("id", { count: "exact" });

    if (!error) {
      setArticles(count as number);
    }
  };

  const getApprovedEditors = async () => {
    const { error, count } = await supabase
      .from("profiles")
      .select("id", { count: "exact" })
      .eq("approved", true);

    if (!error) {
      setApprovedEditors(count as number);
    }
  };

  const getUnapprovedEditors = async () => {
    const { error, count } = await supabase
      .from("profiles")
      .select("id", { count: "exact" })
      .eq("approved", false);

    if (!error) {
      setUnapprovedEditors(count as number);
    }
  };

  useEffect(() => {
    getVisitors();
    getArticles();
    getApprovedEditors();
    getUnapprovedEditors();
    getVisitorsList();
  }, [currentPage]);

  return (
    <Box px={8}>
      <Heading>إحصائيات</Heading>
      <SimpleGrid mt={8} columns={{ sm: 2, base: 1, md: 4 }} spacing={{ sm: 5, base: 8, lg: 8 }}>
        <StatsCard title={"عدد الزوار"} stat={visitors} />
        <StatsCard title={"عدد المقالات"} stat={articles} />
        <StatsCard title={"عدد المحررين المقبولين"} stat={approvedEditors} />
        <StatsCard title={"عدد المحررين قيد الإنتظار"} stat={unapprovedEditors} />
      </SimpleGrid>
      <Heading mt={16}>قائمة الزوار</Heading>
      <TableContainer bg='white' mt={16}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>البريد الإلكتروني</Th>
              <Th>IP</Th>
              <Th>الدولة</Th>
              <Th>وقت الزيارة</Th>
            </Tr>
          </Thead>
          <Tbody>
            {visitorList.map((d: any, i: number) => (
              <Tr key={i}>
                <Td>{d.email}</Td>
                <Td>{d.ip}</Td>
                <Td>{d.country}</Td>
                <Td>{new Date(d.created_at).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Stack direction='row'>
        {!isLastPage() && <Button onClick={handleNext}>التالي</Button>}
        {currentPage !== 0 && <Button onClick={handleBack}>السابق</Button>}
      </Stack>
    </Box>
  );
};

Statistics.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Statistics;

export async function getStaticProps() {
  return { props: { title: "HomePage" } };
}
function toast(arg0: {
  title: string;
  description: string;
  status: string;
  duration: number;
  isClosable: boolean;
}) {
  throw new Error("Function not implemented.");
}
