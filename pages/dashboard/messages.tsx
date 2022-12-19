import Loading from "@/components/dashboard/Loading";
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
  useColorModeValue,
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

  //   Colors
  const tableBg = useColorModeValue("white", "whiteAlpha.50");
  const modalBg = useColorModeValue("white", "brand.black");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

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
        <TableContainer mt={16}>
          <Table bg={tableBg} variant='simple'>
            <Thead>
              <Tr>
                <Th borderColor={borderColor}>ID</Th>
                <Th borderColor={borderColor}>الموضوع</Th>
                <Th borderColor={borderColor}>النوع</Th>
                <Th borderColor={borderColor}>بريد المرسل</Th>
                <Th borderColor={borderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {messages?.map((d) => (
                <Tr bg={d.color} key={d.id}>
                  <Td borderColor={borderColor}>{d.id}</Td>
                  <Td borderColor={borderColor}>{d.topic}</Td>
                  <Td borderColor={borderColor}>{d.type}</Td>
                  <Td borderColor={borderColor}>{d.email}</Td>
                  <Th borderColor={borderColor}>
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
        <ModalContent py={4} bg={modalBg}>
          <ModalHeader>نص الرسالة</ModalHeader>
          <ModalCloseButton />
          <ModalBody lineHeight={2} textAlign='center'>
            {message}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

Notifications.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Notifications;
