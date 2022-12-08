import Layout from '@/layouts/Dashboard';
import { getPagination, ITEMS_IN_PAGE } from '@/utils/paginationConfig';
import { Box, Button, Heading, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ReactElement, useEffect, useState } from 'react'

const Notifications = () => {
  const [notification, setNotifications] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    new Promise( async () => {
      const {from, to} = getPagination(currentPage, ITEMS_IN_PAGE);
      await fetch(`/api/notifications/get-notifications?from=${from}&to=${to}`)
      .then((res) => res.json())
      .then(data => {
        console.log(data)
        setNotifications(data.data)
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

  return (
    <Box px={8}>
    <Heading>اشعارات</Heading>
    <TableContainer bg="white" mt={16}>
        <Table variant="simple">
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
              <Tr bg={d.color} key={d.id}>
                 <Td>{d.id}</Td>
                <Td>{d.text}</Td>
                <Td>{new Date(d.created_at).toLocaleTimeString()}</Td>
                <Td>{new Date(d.created_at).toLocaleDateString()}</Td>
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
  )
}

Notifications .getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Notifications