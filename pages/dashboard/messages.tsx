import Loading from "@/components/loading";
import PaginationBar from "@/components/PaginationBar";
import Layout from "@/layouts/Dashboard";
import { getPagination, ITEMS_IN_PAGE } from "@/utils/paginationConfig";
import {
  Box,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";

const Notifications = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const messageModal = useDisclosure();

  useEffect(() => {
    new Promise(async () => {
      setLoading(true);
      const { from, to } = getPagination(currentPage, ITEMS_IN_PAGE);

      await fetch(`/api/contact?from=${from}&to=${to}`)
        .then((res) => res.json())
        .then((data) => {
          setMessages(data.data);
          setCount(data.count);
        });
      setLoading(false);
    });
  }, [currentPage]);

  const openMessageModal = (message: string) => {
    setMessage(message);
    messageModal.onOpen();
  };

  return (
    <Box px={8}>
      <Heading>الرسائل ({count})</Heading>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer bg='white' mt={16}>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>الموضوع</Th>
                <Th>النوع</Th>
                <Th>بريد المرسل</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {messages?.map((d) => (
                <Tr bg={d.color} key={d.id}>
                  <Td>{d.id}</Td>
                  <Td>{d.topic}</Td>
                  <Td>{d.type}</Td>
                  <Td>{d.email}</Td>
                  <Th>
                    <IconButton
                      onClick={() => openMessageModal(d.message)}
                      aria-label='profile details'
                      icon={<AiOutlineEye />}
                    />
                  </Th>
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
      <Modal isOpen={messageModal.isOpen} onClose={messageModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>نص الرسالة</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>{message}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

Notifications.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Notifications;
