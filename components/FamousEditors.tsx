import {
  Avatar,
  Box,
  Container,
  Flex,
  SimpleGrid,
  VStack,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

import { FC } from "react";
import Link from "next/link";
import { FamousAuthor } from "@/types/blog";

type Props = {
  authors: FamousAuthor[];
};

const FamousEditor: FC<Props> = ({ authors }) => {
  return (
    <Box my={6} bg={useColorModeValue("brand.primary", "grey.900")}>
      <Flex
        py={8}
        minH='2xs'
        as={Container}
        maxW='container.xl'
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
        flexDirection={{ base: "column", md: "row" }}>
        <chakra.span
          color='white'
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight={600}
          lineHeight={{ base: "51.52px", md: "55.2px" }}
          me={{ base: 0, md: 16 }}>
          أشهر المحررين
        </chakra.span>
        <SimpleGrid w='full' mt={{ base: 6, md: 0 }} flex={1} gap={6} columns={{ base: 2, md: 6 }}>
          {authors &&
            authors.map((author, index) => (
              <Box key={index}>
                <VStack>
                  <Avatar
                    size={{ base: "md", md: "lg" }}
                    name={`${author.first_name} ${author.last_name}`}
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${author.avatar_url}`}
                  />
                  <Link href={`/authors/${author.username}`} passHref>
                    <Box _hover={{ cursor: "pointer" }} textAlign='center'>
                      <chakra.span
                        fontWeight={600}
                        fontSize={{ base: "md", md: "xl" }}
                        display='block'
                        color='white'>
                        {`${author.first_name} ${author.last_name}`}
                      </chakra.span>
                      <chakra.span
                        fontWeight={400}
                        fontSize={{ base: "sm", md: "md" }}
                        display='block'
                        color='white'>
                        {author.speciality}
                      </chakra.span>
                    </Box>
                  </Link>
                </VStack>
              </Box>
            ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default FamousEditor;
