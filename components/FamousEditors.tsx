import {
  Avatar,
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

import { FC } from "react";
import { FamousAuthor } from "@/types/blog";

type Props = {
  authors: FamousAuthor[];
};

const temp_data: FamousAuthor[] = [
  {
    first_name: "ouss",
    last_name: "zizou",
    speciality: "speciality",
    posts_count: 10,
    avatar_url:
      "7KTgejP4kJZwWvXf7VsEXS1z5BzBUAC5i3lLynXqk54y8Ch9EeAjPrSdRlNCyTI4xJJnVoLKUskTGZFO9hoO4sXz5lbEuotZrgJd.png",
  },
  {
    first_name: "first",
    last_name: "last",
    speciality: "speciality",
    posts_count: 9,
    avatar_url: "",
  },
  {
    first_name: "first",
    last_name: "last",
    speciality: "speciality",
    posts_count: 7,
    avatar_url:
      "7KTgejP4kJZwWvXf7VsEXS1z5BzBUAC5i3lLynXqk54y8Ch9EeAjPrSdRlNCyTI4xJJnVoLKUskTGZFO9hoO4sXz5lbEuotZrgJd.png",
  },
  {
    first_name: "first",
    last_name: "last",
    speciality: "speciality",
    posts_count: 5,
    avatar_url: "",
  },
  {
    first_name: "first",
    last_name: "last",
    speciality: "speciality",
    posts_count: 3,
    avatar_url: "",
  },
  {
    first_name: "first",
    last_name: "last",
    speciality: "speciality",
    posts_count: 2,
    avatar_url:
      "7KTgejP4kJZwWvXf7VsEXS1z5BzBUAC5i3lLynXqk54y8Ch9EeAjPrSdRlNCyTI4xJJnVoLKUskTGZFO9hoO4sXz5lbEuotZrgJd.png",
  },
];

const FamousEditor: FC<Props> = ({ authors }) => {
  return (
    <Box my={6} bg={useColorModeValue("brand.primary", "grey.900")}>
      <Flex
        py={{ base: 6, md: 0 }}
        minH="2xs"
        as={Container}
        maxW="container.xl"
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <chakra.span
          color="white"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight={600}
          lineHeight={{ base: "51.52px", md: "55.2px" }}
          me={{ base: 0, md: 16 }}
        >
          أشهر المحررين
        </chakra.span>
        <SimpleGrid
          w="full"
          mt={{ base: 6, md: 0 }}
          flex={1}
          gap={6}
          columns={{ base: 2, md: 6 }}
        >
          {authors.map((author, index) => (
            <Box key={index}>
              <VStack>
                <Avatar
                  size={{ base: "md", md: "lg" }}
                  name={`${author.first_name} ${author.last_name}`}
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${author.avatar_url}`}
                />
                <Box textAlign="center">
                  <chakra.span
                    fontWeight={600}
                    fontSize={{ base: "md", md: "xl" }}
                    display="block"
                    color="white"
                  >
                    {`${author.first_name} ${author.last_name}`}
                  </chakra.span>
                  <chakra.span
                    fontWeight={400}
                    fontSize={{ base: "sm", md: "md" }}
                    display="block"
                    color="white"
                  >
                    {author.speciality}
                  </chakra.span>
                </Box>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default FamousEditor;
