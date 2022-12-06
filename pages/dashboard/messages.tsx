import Layout from '@/layouts/Dashboard';
import { Box, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { ReactElement, useEffect, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai';

const Notifications = () => {
  const [messages, setMessages] = useState<any[]>([])
  const [message, setMessage] = useState<string>("")
  const messageModal = useDisclosure();

  useEffect(() => {

    new Promise( async () => {
      await fetch('/api/contact')
      .then((res) => res.json())
      .then(data => {
        if (data.messages) {
          setMessages(data.messages)
        }
      })
    })
  }, [setMessages])

  const openMessageModal = (message: string) => {
    messageModal.onOpen()
    setMessage(message)
  }

  return (
    <Box px={8}>
    <Heading>اشعارات</Heading>
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