import { Box, Button, ButtonGroup, Container, Divider, Flex, Heading, Stack, Text, Image, Avatar, useColorModeValue } from "@chakra-ui/react";
import { CardHeader, CardBody, CardFooter, Card } from '@chakra-ui/card'

import Layout from "@/layouts/Default";
import { ReactElement, useEffect, useState } from "react";
import Head from 'next/head';

function Team() {
  const purpleTitles = useColorModeValue("brand.primary","brand.secondary")
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    new Promise(async () => {
      await fetch('/api/team')
      .then((data) => data.json())
      .then((data) => {

        setData(data)
      })
    })
  }, [setData])
  return (
    <>
    <Head>
      <title>تليد - فريقنا</title>
    </Head>
    <Container my="50px" maxW="container.xl">
      <Box>
        <Heading color={purpleTitles} fontSize="3xl">
          فريق الادارة
        </Heading>

        <Flex mt={"2em"} justify={"center"} wrap={"wrap"}>
          {
            data?.map(d => (
              <Card key={d.id} maxW='14em' m="4">
                <CardBody>
                  <Stack alignItems={"center"}>
                    <Avatar
                      size={"2xl"}
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${d.avatar_url}`}
                      borderRadius='50%'
                    />
                    <Stack mt='6' spacing='3' alignItems={"center"}>
                      <Heading fontSize={"0.8em"}>{d.first_name} {d.last_name}</Heading>
                      <Text textAlign={"center"} fontSize={"0.8em"}>
                        عضو في فريق {d.type}
                      </Text>
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
            ))
          }
        </Flex>
      </Box>
    </Container>
    </>
  );
}

Team.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default Team;
