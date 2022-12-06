import Layout from '@/layouts/Dashboard';
import { Box, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ReactElement, useEffect, useState } from 'react'

const Notifications = () => {
  const [notification, setNotifications] = useState<any[]>([])

  useEffect(() => {

    new Promise( async () => {
      await fetch('/api/notifications/get-notifications')
      .then((res) => res.json())
      .then(data => {
        if (data.notifications.length) {
          setNotifications(data.notifications)
        }
      })
    })
  }, [setNotifications])

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
              <Tr bg={d.color} key={i}>
                 <Td>{i}</Td>
                <Td>{d.text}</Td>
                <Td>{new Date(d.created_at).toLocaleTimeString()}</Td>
                <Td>{new Date(d.created_at).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

Notifications .getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Notifications