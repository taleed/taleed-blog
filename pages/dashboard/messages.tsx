import Layout from '@/layouts/Dashboard';
import { getPagination, ITEMS_IN_PAGE } from '@/utils/paginationConfig';
import { Box, Button, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { ReactElement, useEffect, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai';


const Notifications = () => {
  const [messages, setMessages] = useState<any[]>([])
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState<string>("")
  const messageModal = useDisclosure();
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    new Promise( async () => {
      const {from, to} = getPagination(currentPage, ITEMS_IN_PAGE);
      await fetch(`/api/contact?from=${from}&to=${to}`)
      .then((res) => res.json())
      .then(data => {
        setMessages(data.data)
        setCount(data.count)
      })
    })
  }, [currentPage])

  const isLastPage = () => {
    return (ITEMS_IN_PAGE * (currentPage+1) + ITEMS_IN_PAGE) > count
  }

  const handleNext = () => {
    setCurrentPage(currentPage+1)
  }

  const handleBack = () => {
    setCurrentPage(currentPage-1)
  }

  const openMessageModal = (message: string) => {
    messageModal.onOpen()
    setMessage(message)
  }

  return (
    <Box px={8}>
    <Heading>الرسائل</Heading>
    <TableContainer bg="white" mt={16}>
        <Table variant="simple">
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
            {messages?.map((d, i) => (
              <Tr bg={d.color} key={d.id}>
                 <Td>{d.id}</Td>
                <Td>{d.topic}</Td>
                <Td>{d.type}</Td>
                <Td>{d.email}</Td>
                <Th>
                  <IconButton
                    onClick={() => openMessageModal(d.message)}
                    aria-label="profile details"
                    icon={<AiOutlineEye />}
                  />
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Stack direction="row">
        {!isLastPage() && <Button onClick={handleNext}>التالي</Button>}
        {currentPage !== 0 && <Button onClick={handleBack}>السابق</Button>}
      </Stack>
      <Modal
        isOpen={messageModal.isOpen}
        onClose={messageModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>نص الرسالة</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
              {message}
          </ModalBody>
      </ModalContent>
      </Modal>
    </Box>
  )
}

Notifications .getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Notifications