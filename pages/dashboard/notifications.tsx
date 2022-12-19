import Loading from "@/components/dashboard/Loading";
import PaginationBar from "@/components/PaginationBar";
import Layout from "@/layouts/Dashboard";
import { getPagination, ITEMS_IN_PAGE } from "@/utils/paginationConfig";
import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";

const Notifications = () => {
  const [notification, setNotifications] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  //   Colors
  const tableBg = useColorModeValue("white", "whiteAlpha.50");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

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
        <TableContainer mt={16}>
          <Table bg={tableBg} variant='simple'>
            <Thead>
              <Tr>
                <Th borderColor={borderColor}>ID</Th>
                <Th borderColor={borderColor}>الاشعار</Th>
                <Th borderColor={borderColor}>التوقيت</Th>
                <Th borderColor={borderColor}>التاريخ</Th>
              </Tr>
            </Thead>
            <Tbody>
              {notification?.map((d, i) => (
                <Tr key={d.id}>
                  <Td borderColor={borderColor}>{d.id}</Td>
                  <Td
                    borderColor={borderColor}
                    position='relative'
                    textColor={d.color !== "white" && d.color}>
                    <span
                      style={{ backgroundColor: d.color !== "white" ? d.color : "black" }}
                      className='notification__types-badge'
                    />
                    {d.text}
                  </Td>
                  <Td borderColor={borderColor}>{new Date(d.created_at).toLocaleTimeString()}</Td>
                  <Td borderColor={borderColor}>{new Date(d.created_at).toLocaleDateString()}</Td>
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
