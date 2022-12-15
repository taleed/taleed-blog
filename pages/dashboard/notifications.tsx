import Loading from "@/components/dashboard/Loading";
import PaginationBar from "@/components/PaginationBar";
import Layout from "@/layouts/Dashboard";
import { getPagination, ITEMS_IN_PAGE } from "@/utils/paginationConfig";
import { Box, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";

const Notifications = () => {
  const [notification, setNotifications] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    new Promise(async () => {
      setLoading(true);

      const { from, to } = getPagination(currentPage, ITEMS_IN_PAGE);
      await fetch(`/api/notifications/get-notifications?from=${from}&to=${to}`)
        .then((res) => res.json())
        .then((data) => {
          setNotifications(data.data);
          setCount(data.count);
        });

      setLoading(false);
    });
  }, [currentPage]);

  return (
    <Box px={8}>
      <Heading>اشعارات ({count})</Heading>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer bg='white' mt={16}>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>الاشعار</Th>
                <Th>التوقيت</Th>
                <Th>التاريخ</Th>
              </Tr>
            </Thead>
            <Tbody>
              {notification?.map((d, i) => (
                <Tr key={d.id}>
                  <Td>{d.id}</Td>
                  <Td position='relative' textColor={d.color !== "white" && d.color}>
                    <span
                      style={{ backgroundColor: d.color !== "white" ? d.color : "black" }}
                      className='notification__types-badge'
                    />
                    {d.text}
                  </Td>
                  <Td>{new Date(d.created_at).toLocaleTimeString()}</Td>
                  <Td>{new Date(d.created_at).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <PaginationBar
        max={count}
        itemsPerPage={ITEMS_IN_PAGE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

Notifications.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Notifications;
