import { Box,  Container, Flex, Heading, Stack, Text, Avatar } from "@chakra-ui/react";
import { CardBody, Card } from '@chakra-ui/card'

import Layout from "@/layouts/Default";
import { ReactElement, useEffect, useState } from "react";

function Team() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    new Promise(async () => {
      await fetch('/api/partners')
      .then((data) => data.json())
      .then((data) => {
        setData(data)
      })
    })
  }, [setData])
  return (
    <Container my="50px" maxW="container.xl">
      <Box>
        <Heading color="brand.primary" fontSize="3xl">
          شركاؤنا
        </Heading>

        <Flex mt={"2em"} justify={"center"} wrap={"wrap"}>
          {
            data?.map(d => (
              <Card key={d.id} maxW='14em' m="4">
                <CardBody>
                  <Stack alignItems={"center"}>
                    <Avatar
                      size={"2xl"}
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${d.image}`}
                      borderRadius='50%'
                    />
                    <Stack mt='6' spacing='3' alignItems={"center"}>
                      <Heading fontSize={"0.8em"}>{d.name}</Heading>
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
            ))
          }
        </Flex>
      </Box>
    </Container>
  );
}

Team.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default Team;
